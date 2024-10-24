export default function DividerWithText({ text }) {
    return (
        <div className="flex items-center justify-center my-5">
            <div className="w-1/4 border-t border-gray-300"></div>
            <span className="mx-3 text-gray-500">{text}</span>
            <div className="w-1/4 border-t border-gray-300"></div>
        </div>
    );
}
