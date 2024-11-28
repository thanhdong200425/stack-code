import React from "react";

export default function Problem({ title, description, difficulty }) {
    return (
        <div className="flex flex-row justify-between items-center w-[95%] border border-gray-300 rounded-lg p-4 mb-4 shadow-md bg-white hover:cursor-pointer hover:bg-gray-100">
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-xs font-normal">
                    <span className={`capitalize ${difficulty === "easy" ? "text-green-500" : difficulty === "medium" ? "text-orange-500" : "text-red-600"}`}>{difficulty}</span>
                    <span className="ml-1 text-gray-400">Max Score: 100</span>
                </p>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
            <div className="flex justify-center">
                <button className="border-gray-300 border px-4 py-1 rounded-lg hover:bg-blue-600 hover:text-white text-sm">Solve Problem</button>
            </div>
        </div>
    );
}
