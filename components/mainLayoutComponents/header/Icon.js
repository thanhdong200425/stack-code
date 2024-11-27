import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import Link from "next/link";

export default function HeaderIcon({ src, alt, href = "#" }) {
    return (
        <Link href={"/" + href} className="px-[1.5rem] py-[0.5rem] hover:bg-gray-200 hover:rounded-xl">
            <Image src={src} alt={alt} width={30} height={30} className="" />
        </Link>
    );
}
