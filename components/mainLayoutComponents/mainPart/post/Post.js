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
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 my-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between w-full mb-4">
                <div className="flex items-center justify-start gap-3 hover:transform hover:translate-x-1 transition-transform duration-200">
                    <AvatarPost src={avatarSrc} alt={authorName + " avatar"} width={40} height={40} />
                    <AvatarInfo name={authorName} datePost={timePost ? timePost : "..."} />
                </div>
                <DotMenu postId={postId} authorId={authorId} userId={currentUserId} />
            </div>

            <div className="px-2">
                <Content heading={title} content={content} imageSrc={data ? data.publicUrl : null} imageAlt={"Post image"} imageWidth={1000} imageHeight={100} />
            </div>

            <div className="mt-6 flex gap-6 border-t border-gray-100 pt-4">
                <InteractiveButton
                    src={"/icons/upvote-arrow-v1.svg"}
                    alt={"Upvote arrow"}
                    quantity={likeQuantity}
                    active={isLiked}
                    altSrc={"/icons/upvote-arrow.svg"}
                    postId={postId}
                    userId={currentUserId}
                    className="hover:scale-110 transition-transform duration-200"
                />
                <CommentButton
                    src={"/icons/comment.svg"}
                    alt={"Comment"}
                    currentQuantity={commentQuantity}
                    isHaveRedirect={isHaveRedirect}
                    postId={postId}
                    className="hover:scale-110 transition-transform duration-200"
                />
                <InteractiveButton src={"/icons/share.svg"} alt={"Share"} className="hover:scale-110 transition-transform duration-200" />
            </div>
        </div>
    );
}
