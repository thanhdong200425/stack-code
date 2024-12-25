"use server";

import { createClient as supabaseServer } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function fetchData({ tableName, columns = [], data = {}, isObject = false }) {
    const supabase = await supabaseServer();
    const { data: result, error } = isObject
        ? await supabase
              .from(tableName)
              .select(columns.length ? columns.join(",") : "*")
              .match(data)
              .single()
        : await supabase
              .from(tableName)
              .select(columns.length ? columns.join() : "*")
              .match(data);

    if (error) {
        console.error(`Error fetching data from table ${tableName} with columns ${columns.join(", ")} and data ${JSON.stringify(data)}:`, error);
        throw new Error(`Error fetching data: ${error.message}`);
    }

    return result;
}

export async function insertAndReturnData({ tableName, data = [] }) {
    if (data.length === 0) return null;
    let result, error;
    const supabase = await supabaseServer();

    if (data.length === 1) {
        ({ data: result, error } = await supabase.from(tableName).insert(data[0]).select());
    } else {
        ({ data: result, error } = await supabase.from(tableName).insert(data).select());
    }

    if (error) {
        console.error(`Error inserting data into table ${tableName}:`, error);
        throw new Error(`Error inserting data: ${error.message}`);
    }

    return result;
}

export async function getUserId() {
    const supabase = await supabaseServer();
    const { data } = await supabase.auth.getUser();

    return data.user.id ? data.user.id : null;
}

export async function addResourceToStorage({ file, storageName = "post-image-bucket" }) {
    let userId;

    try {
        userId = await getUserId();
    } catch (error) {
        throw error;
    }
    const supabase = await supabaseServer();
    const { data, error } = await supabase.storage.from(storageName).upload(userId + "/" + uuidv4(), file);

    if (error) {
        console.log("Error in addResourceToStorage:", error);
        throw error.message;
    }

    return data.fullPath;
}
