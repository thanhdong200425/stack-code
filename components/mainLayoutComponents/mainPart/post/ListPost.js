import { fetchData } from "@/app/lib/generalActions";
import Post from "./Post";
import { formatDistanceToNow } from "date-fns";

export default async function ListPost() {
    const allPosts = await fetchData({
        tableName: "Posts",
        isObject: false,
        columns: ["*", "Users:author_id ( username, Info_Users (avatar_link) )"],
    });

    return (
        <div>
            {allPosts.map((post, index) => {
                const timePost = formatDistanceToNow(post.created_at, { addSuffix: true });

                return <Post key={index} postId={post.id} title={post.title} content={post.content} authorName={post.Users.username} avatarSrc={post.Users.Info_Users.avatar_link} postImageSrc={post.image} timePost={timePost} authorId={post.author_id} isHaveRedirect={true} />;
            })}
        </div>
    );
}
