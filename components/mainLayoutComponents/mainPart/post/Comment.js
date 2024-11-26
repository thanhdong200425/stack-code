"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import { UserContext } from "../../context/LayoutContext";

export default function Comment({ comments }) {
    const [newComment, setNewComment] = useState("");
    const currentUserImage = useContext(UserContext);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        setNewComment("");
    };

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
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
                            <span>3 hours ago</span>
                            <button className="ml-4">
                                <Image src={"/icons/reply-icon.svg"} alt="Reply icon" width={22} height={22} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <div className="flex items-center space-x-4 p-4 mb-4 border-gray-200">
                <Image src={currentUserImage} alt="User Avatar" width={30} height={30} className="rounded-full" />
                <input type="text" value={newComment} onChange={handleCommentChange} placeholder="Add a comment..." className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button onClick={handleCommentSubmit} className="text-blue-500 hover:underline">
                    Post
                </button>
            </div>
        </div>
    );
}
