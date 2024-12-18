"use server";

import { createClient } from "@/utils/supabase/server";

export async function addComment({ postId, userId, parentCommentId = null, content }) {
    try {
        const supabase = await createClient();
        const { error } = await supabase.from("Comments").insert({
            post_id: postId,
            user_id: userId,
            parent_comment_id: parentCommentId,
            content: content,
        });

        if (error) console.log(error);
    } catch (error) {
        throw new Error("Error in addComment: " + error);
    }
}
