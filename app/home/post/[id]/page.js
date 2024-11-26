import Post from "@/components/mainLayoutComponents/mainPart/post/Post";
import supabase from "@/utils/supabase";
import { formatDistanceToNow } from "date-fns";
import Comment from "@/components/mainLayoutComponents/mainPart/post/Comment";

export default async function Page({ params }) {
    const id = (await params).id;
    const { data: post, error } = await supabase.from("Posts").select("*, Users:author_id ( username, Info_Users (avatar_link) )").eq("id", id).limit(1).single();
    if (error) throw new Error(error);

    const timePost = formatDistanceToNow(post.created_at, { addSuffix: true });
    const { data: comments, error: commentError } = await supabase.from("Comments").select("*, Users:user_id (username, Info_Users (avatar_link) )").eq("post_id", id);

    if (commentError) throw new Error(commentError);

    return (
        <div className="flex flex-col">
            <Post key={id} postId={post.id} title={post.title} content={post.content} authorName={post.Users.username} avatarSrc={post.Users.Info_Users.avatar_link} postImageSrc={post.image} timePost={timePost} authorId={post.author_id} />
            <Comment comments={comments} />
        </div>
    );
}
