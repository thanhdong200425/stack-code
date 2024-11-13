import AvatarInfo from "./AvatarInfo";
import AvatarPost from "./AvatarPost";
import Content from "./Content";
import InteractiveButton from "./InteractiveButton";

export default function Post({ title, content, authorName, avatarSrc }) {
    return (
        // Container
        <div className="border rounded-2xl p-2 my-5">
            {/* Avatar and name container */}
            <div className="flex items-center justify-start gap-2">
                <AvatarPost src={avatarSrc} alt={authorName + "avatar"} width={30} height={30} />
                <AvatarInfo name={authorName} datePost={"2 days ago"} />
            </div>

            {/* Main content part */}
            <Content heading={title} content={content} imageSrc={"https://picsum.photos/seed/picsum/200"} imageAlt={"Lorem piscum"} imageWidth={1000} imageHeight={100} />

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
