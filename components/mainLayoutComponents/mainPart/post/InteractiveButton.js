"use client";

import supabase from "@/utils/supabase";
import Image from "next/image";
import { useState } from "react";

export default function InteractiveButton({ src, alt, quantity, active, altSrc, postId, userId }) {
    const [isCurrentlyLike, setIsCurrentlyLike] = useState(active);
    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    const changeLikeState = async () => {
        setIsCurrentlyLike(!isCurrentlyLike);

        if (!isCurrentlyLike) {
            const { error } = await supabase.from("Likes").insert({
                post_id: postId,
                user_id: userId,
            });

            if (error) console.log("Error when insert a like: " + error);
            else setCurrentQuantity((prevQuantity) => prevQuantity + 1);
        } else {
            await supabase.from("Likes").delete().match({
                post_id: postId,
                user_id: userId,
            });

            setCurrentQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    return (
        <div
            onClick={changeLikeState}
            className={`flex justify-center items-center gap-2 border rounded-2xl p-2 transition-colors cursor-pointer
            ${isCurrentlyLike ? "bg-[#0066ff] text-white hover:bg-[#0052cc]" : "bg-[#f0f2f5] hover:bg-[#e4e6e9]"}`}
        >
            <Image src={!active ? src : altSrc} alt={alt} width={25} height={25} className={isCurrentlyLike ? "brightness-0 invert" : ""} />
            {currentQuantity && <span>{currentQuantity}</span>}
        </div>
    );
}
