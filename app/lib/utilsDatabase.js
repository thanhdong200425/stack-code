import supabase from "@/utils/supabase";

export async function fetchData({tableName, columns = [], data = [], limit = 1, isObject = false}) {
    const {data: result, error} = isObject
        ? await supabase
            .from(tableName)
            .select(columns.length ? columns.join(",") : "*")
            .limit(limit)
            .single()
        : await supabase
            .from(tableName)
            .select(columns.length ? columns.join() : "*")
            .limit(limit)
            .match(data);

    if (error) {
        console.error(`Error fetching data from table ${tableName} with columns ${columns.join(", ")} and data ${JSON.stringify(data)}:`, error);
        throw new Error(`Error fetching data: ${error.message}`);
    }

    return result;
}

export async function insertAndReturnData({tableName, data = []}) {
    if (data.length === 0) return null;
    let result, error;
    if (data.length === 1) {
        ({data: result, error} = await supabase.from(tableName).insert(data[0]).select());
    } else {
        ({data: result, error} = await supabase.from(tableName).insert(data).select());
    }

    if (error) {
        console.error(`Error inserting data into table ${tableName}:`, error);
        throw new Error(`Error inserting data: ${error.message}`);
    }

    return result;
}
