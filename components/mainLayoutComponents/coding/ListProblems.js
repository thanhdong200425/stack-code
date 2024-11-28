import supabase from "@/utils/supabase";
import Problem from "./Problem";

export default async function ListProblems() {
    const { data: problems, error: problemsError } = await supabase.from("Problems").select("id, title, description, difficulty");

    if (problemsError) throw new Error("Error in ListProblems component: " + problemsError);

    return (
        <div className="">
            <h1 className="text-xl font-bold mb-6">Problem Solving</h1>
            {problems.map((problem) => (
                <Problem key={problem.id} title={problem.title} description={problem.description} difficulty={problem.difficulty} />
            ))}
        </div>
    );
}