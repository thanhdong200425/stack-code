"use server";

import supabase from "@/utils/supabase";
import { addResourceToStorage, getUserId } from "./utilsDatabase";

export async function addPost(prevState, formData) {
    const titlePost = formData.get("title");
    const bodyPost = formData.get("body");
    const imagePost = formData.get("image");

    try {
        // Firstly, upload image to storage if a new post has it
        let uploadPath = null;
        if (imagePost.size > 0) {
            uploadPath = await addResourceToStorage({
                file: imagePost,
            });

            uploadPath = uploadPath.split("/").slice(1).join("/");
        }

        let authorId = await getUserId();

        // Handle time
        let timeUpload = new Date();
        let options = {
            timeZone: "Asia/Ho_Chi_Minh",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        };
        let localTimeUpload = new Intl.DateTimeFormat("en-US", options).format(timeUpload);

        let dataToUpload = uploadPath
            ? {
                  title: titlePost,
                  content: bodyPost,
                  image: uploadPath,
                  author_id: authorId,
                  created_at: localTimeUpload,
              }
            : {
                  title: titlePost,
                  content: bodyPost,
                  author_id: authorId,
                  created_at: localTimeUpload,
              };

        // Secondly, get the image link and insert a new record with title and body to database
        // Get the author id
        const { data: newPost, error } = await supabase.from("Posts").insert(dataToUpload);

        if (error) throw new Error(error.message);

        // Finally, return it
        return {
            status: true,
        };
    } catch (error) {
        console.log("Error in addPost:" + error);
        return {
            errors: {
                error,
            },
        };
    }
}

export async function removePost(postId) {
    try {
        if (!postId) {
            return {
                error: "Post id cannot be null",
            };
        }

        const postImagePath = (await supabase.from("Posts").select("image").match({ id: postId }).single()).data.image;

        // Try to remove image in the bucket first
        const { data: responseBucket, error } = await supabase.storage.from("post-image-bucket").remove(postImagePath);

        if (error) {
            throw error;
        }

        // Then remove post record
        const responsePost = await supabase.from("Posts").delete().eq("id", postId);

        return responsePost;
    } catch (error) {
        console.log(`Error in removePost: ${error}`);
        throw error;
    }
}
