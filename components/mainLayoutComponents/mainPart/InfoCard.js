import Image from "next/image";

export default function InfoCard({ username, avatarSrc, followers, following, description }) {
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-8 border border-gray-100 w-full">
            <div className="flex flex-col items-center">
                <Image src={avatarSrc} alt={username} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" width={128} height={128} />
                <h2 className="mt-4 text-2xl font-bold text-gray-800">{username}</h2>
                <p className="mt-2 text-gray-600">{description}</p>
                <div className="flex gap-8 mt-6">
                    <div className="text-center">
                        <div className="font-bold text-gray-800">{followers}</div>
                        <div className="text-gray-600">Followers</div>
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-gray-800">{following}</div>
                        <div className="text-gray-600">Following</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
