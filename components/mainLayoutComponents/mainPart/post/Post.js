import AvatarInfo from "./AvatarInfo";
import AvatarPost from "./AvatarPost";
import Content from "./Content";
import InteractiveButton from "./InteractiveButton";
import supabase from "@/utils/supabase";

export default async function Post({ title, content, authorName, avatarSrc, postImageSrc }) {
    const { data } = supabase.storage.from("post-image-bucket").getPublicUrl(postImageSrc);
    return (
        // Container
        <div className="border rounded-2xl p-2 my-5">
            {/* Avatar and name container */}
            <div className="flex items-center justify-start gap-2">
                <AvatarPost src={avatarSrc} alt={authorName + "avatar"} width={30} height={30} />
                <AvatarInfo name={authorName} datePost={"2 days ago"} />
            </div>

            {/* Main content part */}
            <Content heading={title} content={content} imageSrc={data.publicUrl} imageAlt={"Lorem piscum"} imageWidth={1000} imageHeight={100} />

            {/* Interactive buttons part */}
            <div className="flex gap-4">
                <InteractiveButton src={"/icons/upvote-arrow.svg"} alt={"Upvote arrow"} quantity={"20K"} />
                <InteractiveButton src={"/icons/downvote-arrow.svg"} alt={"Downvote arrow"} quantity={"2K"} />
                <InteractiveButton src={"/icons/comment.svg"} alt={"Comment"} quantity={"500"} />
                <InteractiveButton src={"/icons/share.svg"} alt={"Share"} />
            </div>
        </div>
    );
}
