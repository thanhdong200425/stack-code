import supabase from "@/utils/supabase";
import ProblemContentMarkdown from "./ProblemContentMarkdown";

export default async function DetailsProblem({ id }) {
    const { data: problem, error } = await supabase.from("Problem_Descriptions").select("content").eq("id", id).single();

    if (error) throw new Error("Error fetching problem: " + error.message);

    return (
        <div className="flex flex-col h-full gap-4">
            <ProblemContentMarkdown mdxContent={problem.content} />
        </div>
    );
}
