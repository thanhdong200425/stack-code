import ListPost from "./post/ListPost";
import ThoughtInput from "./ThoughtInput";

export default function Main() {
    return (
        <div className="w-[70%]">
            <ThoughtInput />
            <ListPost />
        </div>
    );
}
