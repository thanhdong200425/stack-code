import Divider from "@/components/subLayoutComponents/divider/Divider";
import AvatarPost from "../mainPart/post/AvatarPost";
import Link from "next/link";

export default function SearchValueContainer({ data }) {
    const { users, problems } = data;

    return (
        <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg top-11 right-0 w-full z-50">
            <div className="p-4">
                <ul className="flex flex-row flex-wrap gap-4">
                    {users &&
                        users.map((user, index) => (
                            <li
                                key={index}
                                className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-indigo-100 transition-colors duration-200 ease-in-out cursor-pointer"
                            >
                                <AvatarPost src={user.Info_Users.avatar_link ? user.Info_Users.avatar_link : "/icons/avatar-man.svg"} alt={"Avatar demo"} width={50} height={50} />
                                <p className="text-sm font-medium text-gray-700 hover:text-indigo-500">{user.username}</p>
                            </li>
                        ))}
                </ul>
            </div>
            <Divider />
            <div className="p-4">
                <ul className="flex flex-col gap-4">
                    {problems &&
                        problems.map((problem, index) => (
                            <Link href={`/coding/problem/${problem.id}`} key={problem.id}>
                                <li className="flex flex-row items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-200 ease-in-out cursor-pointer">
                                    {/* Container to contain score of a problem */}
                                    <div
                                        className={`flex items-center justify-center p-2 w-10 h-10 ${problem.score < 30 && "bg-green-500"} ${
                                            problem.score >= 30 && problem.score <= 70 && "bg-orange-500"
                                        } ${problem.score > 70 && "bg-red-500"} text-white rounded-full`}
                                    >
                                        <span>{problem.score}</span>
                                    </div>
                                    {/* Container to contain title and description of a problem */}
                                    <div className="flex flex-col ml-4">
                                        <p className="font-semibold text-gray-800 hover:text-indigo-500">{problem.title}</p>
                                        <p className="text-sm text-gray-600">{problem.description}</p>
                                    </div>
                                </li>
                            </Link>
                        ))}
                </ul>
            </div>

            {!users.length && !problems.length && (
                <div className="flex justify-center items-center p-4 text-gray-500">
                    <p className="text-center">No results found for your search.</p>
                </div>
            )}
        </div>
    );
}
