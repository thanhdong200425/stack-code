import SocialLinks from "./SocialLinks";

export default function SocialCard({ githubLink, facebookLink, googleLink, email, timeJoined }) {
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-gray-100 w-full">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Social Links</h3>
                    <SocialLinks githubLink={githubLink} facebookLink={facebookLink} googleLink={googleLink} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="text-sm font-medium text-gray-600">Skills</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">JavaScript</span>
                            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm">React</span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">NextJS</span>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="text-sm font-medium text-gray-600">Location</h4>
                        <p className="mt-2 text-gray-800">Da Nang, Vietnam</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="text-sm font-medium text-gray-600">Email</h4>
                        <p className="mt-2 text-gray-800 truncate">{email}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="text-sm font-medium text-gray-600">Joined</h4>
                        <p className="mt-2 text-gray-800">{timeJoined}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
