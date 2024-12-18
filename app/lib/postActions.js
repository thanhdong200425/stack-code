"use server";

import { addResourceToStorage, getUserId } from "./generalActions";
import { getLocalTime } from "./dateTimeActions";
import { createClient } from "@/utils/supabase/server";

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
        const supabase = await createClient();
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
        const supabase = await createClient();
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

export async function updatePost(prevState, formData) {
    const id = formData.get("postId");
    const newTitle = formData.get("title");
    const newBody = formData.get("body");
    const newImage = formData.get("image");

    // Handle when a new image was updated
    let imagePath = null;
    if (newImage.size > 0) {
        imagePath = await updateImageOfPost(newImage, id);
    }

    // Get currentTime
    const localTimeUpdate = getLocalTime();

    let dataToUpdate = {
        id,
        ...(newTitle ? { title: newTitle } : {}),
        ...(newBody ? { content: newBody } : {}),
        ...(newImage.size > 0 && newImage.name !== "undefined" ? { image: imagePath } : {}),
        updated_at: localTimeUpdate,
    };

    // Update new data
    try {
        const supabase = await createClient();
        const { error } = await supabase.from("Posts").update(dataToUpdate).eq("id", id);

        if (error) {
            errors: {
                error;
            }
        }

        return {
            status: true,
            text: "OK",
        };
    } catch (e) {
        console.log("Error in updatePost: " + e);
    }
}

export async function updateImageOfPost(newImage, postId) {
    try {
        // Remove the old image in the storage
        const supabase = await createClient();
        const { data: oldImagePath, error: oldImagePathError } = await supabase.from("Posts").select("image").eq("id", postId).single();

        if (oldImagePath.image) {
            const { data: oldImage, error: oldImageError } = await supabase.storage.from("post-image-bucket").remove(oldImagePath.image);
            if (oldImageError) throw new Error("Error in updateImage2: " + oldImageError);
        }

        // Upload the new image into the storage
        let newImagePath = await addResourceToStorage({ file: newImage });

        return newImagePath.split("/").slice(1).join("/");
    } catch (error) {
        console.log(`Error in updateImage: ${error}`);
        throw error;
    }
}
