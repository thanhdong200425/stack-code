import Post from "./post/Post";
import ThoughtInput from "./ThoughtInput";

export default function Main() {
    return (
        <div className="w-[70%]">
            <ThoughtInput />
            <Post />
        </div>
    );
}
