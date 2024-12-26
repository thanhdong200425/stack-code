import Image from "next/image";

export default function UserProfile({ username, avatarSrc, description, followers, following }) {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center">
                    <Image src={avatarSrc} alt={`${username}'s avatar`} width={96} height={96} className="rounded-full border-2 border-gray-200" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{username}</h1>
                    <p className="text-gray-500">Knows Vietnamese</p>
                </div>
            </div>

            {/* Description */}
            <p className="mb-6 text-gray-600">{description}</p>

            {/* Followers and Following */}
            <div className="flex items-center justify-between">
                <div className="text-center">
                    <h2 className="text-lg font-bold">{followers}</h2>
                    <p className="text-gray-500">Followers</p>
                </div>
                <div className="text-center">
                    <h2 className="text-lg font-bold">{following}</h2>
                    <p className="text-gray-500">Following</p>
                </div>
            </div>
        </div>
    );
}
