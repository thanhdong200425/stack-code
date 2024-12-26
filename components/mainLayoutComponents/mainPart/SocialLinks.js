import Image from "next/image";
import Link from "next/link";

export default function SocialLinks({ githubLink, facebookLink, googleLink }) {
    return (
        <div className="flex gap-4 items-center mt-4">
            {githubLink && (
                <Link href={githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors duration-200">
                    <Image width={30} height={30} src="/icons/github.svg" alt="GitHub" className="w-6 h-6" />
                </Link>
            )}
            {facebookLink && (
                <Link href={facebookLink} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    <Image width={30} height={30} src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6" />
                </Link>
            )}
            {googleLink && (
                <Link href={googleLink} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors duration-200">
                    <Image width={30} height={30} src="/icons/google.svg" alt="Google" className="w-6 h-6" />
                </Link>
            )}
        </div>
    );
}
