import { fetchData } from "@/app/lib/utilsDatabase";
import Post from "./Post";

export default async function ListPost() {
    const allPosts = await fetchData({
        tableName: "Posts",
        isObject: false,
        columns: ["*", "Users:author_id ( username, Info_Users (avatar_link) )"],
    });

    return (
        <div>
            {allPosts.map((post, index) => {
                return <Post key={index} title={post.title} content={post.content} authorName={post.Users.username} avatarSrc={post.Users.Info_Users.avatar_link} postImageSrc={post.image} />;
            })}
        </div>
    );
}
