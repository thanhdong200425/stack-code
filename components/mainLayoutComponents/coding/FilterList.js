export default function FilterList() {
    const statusArray = [
        { type: "status", values: ["solved", "unsolved"] },
        { type: "difficulty", values: ["easy", "medium", "hard"] },
        { type: "skills", values: ["dynamic programming", "recursion", "graph theory", "greedy algorithms", "divide and conquer", "backtracking", "hashing", "sorting", "searching", "bit manipulation"] },
    ];

    return (
        <div className="flex flex-col mt-12 gap-2">
            {statusArray.map((status, index) => (
                <div key={index} className={`flex flex-col gap-2 ${index < statusArray.length - 1 && "border-b-2"}  p-4`}>
                    <p className="uppercase text-blue-700">{status.type}</p>
                    {status.values.map((value, index) => (
                        <div key={index} className="flex flex-row gap-2">
                            <input type="checkbox" className="scale-125 checked:bg-green-500" />
                            <span className="capitalize text-base text-gray-600">{value}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
