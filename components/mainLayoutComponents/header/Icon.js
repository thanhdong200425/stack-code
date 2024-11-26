import Image from "next/image";
import Link from "next/link";

export default function HeaderIcon({ src, alt, href = "#" }) {
    return (
        <button className="px-[1.5rem] py-[0.5rem] hover:bg-gray-200 hover:rounded-xl">
            <Link href={href}>
                <Image src={src} alt={alt} width={30} height={30} className="" />
            </Link>
        </button>
    );
}
