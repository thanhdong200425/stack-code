import { createClient } from "@/utils/supabase/server";
import UserProfile from "@/components/mainLayoutComponents/mainPart/UserProfile";
import Post from "@/components/mainLayoutComponents/mainPart/post/Post";
import { formatDistanceToNow } from "date-fns";
import SocialLinks from "@/components/mainLayoutComponents/mainPart/SocialLinks";
import InfoCard from "@/components/mainLayoutComponents/mainPart/InfoCard";
import SocialCard from "@/components/mainLayoutComponents/mainPart/SocialCard";

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: currentUser, error: currentUserError } = await supabase.auth.getUser();

    if (currentUserError) throw new Error("An error occurred while fetching the current user: " + currentUserError.message);

    const { data: userInfo, error: userInfoError } = await supabase
        .from("Users")
        .select(
            `
            username, 
            created_at,
            Info_Users (
                avatar_link,
                github_link,
                facebook_link,
                google_link
            )
        `
        )
        .eq("id", currentUser.user.id)
        .limit(1)
        .single();

    if (userInfoError) throw new Error("An error occurred while fetching the user info: " + userInfoError.message);

    const { data: posts, error: postsError } = await supabase.from("Posts").select("*").eq("author_id", currentUser.user.id);

    if (postsError) throw new Error("An error occurred while fetching the posts: " + postsError.message);

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
                    {/* Left part - Profile Info */}
                    <div className="md:col-span-2">
                        <InfoCard username={userInfo.username} avatarSrc={userInfo.Info_Users.avatar_link} followers={0} following={0} description={""} />
                    </div>

                    {/* Right part - Social Links */}
                    <div className="md:col-span-3">
                        <SocialCard
                            githubLink={userInfo.Info_Users.github_link}
                            facebookLink={userInfo.Info_Users.facebook_link}
                            googleLink={userInfo.Info_Users.google_link}
                            email={currentUser.user.email}
                            timeJoined={formatDistanceToNow(userInfo.created_at, { addSuffix: true })}
                        />
                    </div>
                </div>

                {/* Posts section */}
                <div className="space-y-6">
                    {posts?.map((post) => {
                        const timePost = formatDistanceToNow(post.created_at, { addSuffix: true });
                        return (
                            <Post
                                key={post.id}
                                postId={post.id}
                                title={post.title}
                                content={post.content}
                                authorName={userInfo.username}
                                avatarSrc={userInfo.Info_Users.avatar_link}
                                postImageSrc={post.image}
                                timePost={timePost}
                                authorId={currentUser.user.id}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
