"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/LayoutContext";
import { addComment } from "@/app/lib/commentAction";
import { createClient } from "@/utils/supabase/client";
import { formatDistanceToNow } from "date-fns";

export default function Comment({ comments, postId, userId }) {
    const [newComment, setNewComment] = useState("");
    const [currentComments, setCurrentComments] = useState(comments);
    const [isAddingComment, setIsAddingComment] = useState(false);
    const currentUserImage = useContext(UserContext);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (postId, userId, content) => {
        setIsAddingComment(true);
        await addComment({ postId, userId, content });
        setNewComment("");
        setIsAddingComment(false);
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const supabase = createClient();
                const { data: comments, error: commentError } = await supabase.from("Comments").select("*, Users:user_id (username, Info_Users (avatar_link) )").eq("post_id", postId);
                if (commentError) console.log(commentError);
                else setCurrentComments(comments);
            } catch (error) {
                throw new Error("Error in fetchComments: " + error);
            }
        };

        fetchComments();
    }, [newComment, postId]);

    return (
        <div className="space-y-4">
            {currentComments.map((comment) => {
                const time = formatDistanceToNow(comment.created_at, { addSuffix: true });
                return (
                    <div key={comment.id} className="flex items-start space-x-4 p-4 border-b border-gray-200">
                        <Image src={comment.Users.Info_Users.avatar_link} alt="User Avatar" width={30} height={30} className="rounded-full" />
                        <div className="flex flex-col">
                            <p className="font-semibold">{comment.Users.username}</p>
                            <p className="text-gray-700">{comment.content}</p>
                            {comment.image && (
                                <div className="mt-2">
                                    <Image src={comment.image} alt="Comment Image" width={200} height={200} className="rounded-lg" />
                                </div>
                            )}
                            <div className="flex items-center text-gray-500 text-base mt-4">
                                <span>{time}</span>
                                <button className="ml-4">
                                    <Image src={"/icons/reply-icon.svg"} alt="Reply icon" width={22} height={22} />
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className="flex items-center space-x-4 pb-4 mb-4 border-gray-200">
                <Image src={currentUserImage} alt="User Avatar" width={30} height={30} className="rounded-full" />
                <input
                    type="text"
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={handleCommentSubmit.bind(this, postId, userId, newComment)} className="text-blue-500 hover:underline">
                    {isAddingComment ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                            <circle cx="4" cy="12" r="3" fill="currentColor">
                                <animate id="svgSpinners3DotsScale0" attributeName="r" begin="0;svgSpinners3DotsScale1.end-0.25s" dur="0.75s" values="3;.2;3" />
                            </circle>
                            <circle cx="12" cy="12" r="3" fill="currentColor">
                                <animate attributeName="r" begin="svgSpinners3DotsScale0.end-0.6s" dur="0.75s" values="3;.2;3" />
                            </circle>
                            <circle cx="20" cy="12" r="3" fill="currentColor">
                                <animate id="svgSpinners3DotsScale1" attributeName="r" begin="svgSpinners3DotsScale0.end-0.45s" dur="0.75s" values="3;.2;3" />
                            </circle>
                        </svg>
                    ) : (
                        "Post"
                    )}
                </button>
            </div>
        </div>
    );
}
