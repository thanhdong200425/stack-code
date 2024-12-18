import AvatarInfo from "./AvatarInfo";
import AvatarPost from "./AvatarPost";
import Content from "./Content";
import DotMenu from "./DotMenu";
import InteractiveButton from "./InteractiveButton";
import { getUserId } from "@/app/lib/generalActions";
import CommentButton from "./CommentButton";
import { createClient } from "@/utils/supabase/server";

export default async function Post({ postId, title, content, authorName, avatarSrc, postImageSrc, timePost, authorId, isHaveRedirect = false }) {
    const supabase = await createClient();
    const data = postImageSrc ? supabase.storage.from("post-image-bucket").getPublicUrl(postImageSrc).data : null;
    const { count: likeQuantity, error: likeError } = await supabase.from("Likes").select("*", { count: "exact", head: true }).eq("post_id", postId);
    const { count: commentQuantity, error: commentError } = await supabase.from("Comments").select("*", { count: "exact", head: true }).eq("post_id", postId);

    if (likeError) throw new Error(likeError);

    const currentUserId = await getUserId();

    const { data: userLikeData, error: userLikeError } = await supabase.from("Likes").select("*").eq("post_id", postId).eq("user_id", currentUserId);
    if (userLikeError) throw new Error(userLikeError);
    const isLiked = userLikeData.length > 0;

    return (
        // Container
        <div className="border rounded-2xl p-2 my-5">
            {/* Avatar and name container */}
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-start gap-2">
                    <AvatarPost src={avatarSrc} alt={authorName + " avatar"} width={30} height={30} />
                    <AvatarInfo name={authorName} datePost={timePost ? timePost : "..."} />
                </div>
                <DotMenu postId={postId} authorId={authorId} userId={currentUserId} />
            </div>

            {/* Main content part */}
            <Content heading={title} content={content} imageSrc={data ? data.publicUrl : null} imageAlt={"Lorem piscum"} imageWidth={1000} imageHeight={100} />

            {/* Interactive buttons part */}
            <div className="mt-4 flex gap-4">
                <InteractiveButton src={"/icons/upvote-arrow-v1.svg"} alt={"Upvote arrow"} quantity={likeQuantity} active={isLiked} altSrc={"/icons/upvote-arrow.svg"} postId={postId} userId={currentUserId} />
                <CommentButton src={"/icons/comment.svg"} alt={"Comment"} currentQuantity={commentQuantity} isHaveRedirect={isHaveRedirect} postId={postId} />
                <InteractiveButton src={"/icons/share.svg"} alt={"Share"} />
            </div>
        </div>
    );
}
