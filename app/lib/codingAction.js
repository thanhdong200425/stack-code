"use server";

import supabase from "@/utils/supabase";

export async function addSubmission(language, code, id) {
    // Step 1: Get the language ID
    const languageId = LANGUAGES.find((l) => l.name === language).id;

    if (!languageId) {
        throw new Error("Invalid language");
    }

    // Step 2: Add the submission
    const url = "https://judge0-ce.p.rapidapi.com/submissions?fields=*&base64_encoded=true";
    const options = {
        method: "POST",
        headers: {
            "x-rapidapi-key": process.env.JUDGE0_API_KEY,
            "x-rapidapi-host": process.env.JUDGE0_API_HOST,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            language_id: languageId,
            source_code: Buffer.from(code).toString("base64"),
        }),
    };

    // Step 3: Get test cases of the specific problem
    const testCases = await getTestCases(id);

    // Step 4: Add each test case's input to the submission
    testCases.map(async (testCase) => {
        const input = Buffer.from(testCase.input).toString("base64");
        const expectedOutput = Buffer.from(testCase.output).toString("base64");
        const code = Buffer.from(code).toString("base64");

        const options = {
            method: "POST",
            headers: {
                "x-rapidapi-key": process.env.JUDGE0_API_KEY,
                "x-rapidapi-host": process.env.JUDGE0_API_HOST,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                language_id: languageId,
                source_code: code,
                stdin: input,
                expected_output: expectedOutput,
            }),
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            return `Error in addSubmission: ${error}`;
        }
    });
}

export async function getTestCases(id) {
    const { data, error } = await supabase.from("Test_Cases").select().eq("problem_id", id);
    if (error) throw new Error(error.message);

    return data;
}

const LANGUAGES = [
    {
        name: "python",
        id: 92,
        version: "3.11.2",
    },
    {
        name: "javascript",
        id: 97,
        version: "Node.js 20.17.0",
    },
];
