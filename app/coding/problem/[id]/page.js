import DetailsProblem from "../../../../components/mainLayoutComponents/coding/DetailsProblem";
import Editor from "../../../../components/mainLayoutComponents/coding/Editor";

export default async function Page({ params }) {
    const id = (await params).id;
    return (
        <div className="flex flex-row w-full border rounded-lg shadow-lg bg-white p-6 space-x-4">
            <div className="basis-1/2">
                <DetailsProblem id={id} />
            </div>
            <div className="basis-1/2">
                <Editor />
            </div>
        </div>
    );
}
