import supabase from "@/utils/supabase";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function fetchData({ tableName, columns = [], data = {}, isObject = false }) {
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
    const cookieStorage = await cookies();
    const sessionId = cookieStorage.get("sessionId").value.trim();

    if (!sessionId) throw new Error("No sessionId");

    const { data: result, error } = await supabase.from("Sessions").select("userId").match({
        token: sessionId,
    });

    if (error) throw new Error(error);

    return result[0].userId;
}

export async function addResourceToStorage({ file }) {
    let userId;

    try {
        userId = await getUserId();
    } catch (error) {
        throw error;
    }

    const { data, error } = await supabase.storage.from("post-image-bucket").upload(userId + "/" + uuidv4(), file);

    if (error) {
        console.log(error);
        throw error;
    }

    return data.fullPath;
}
