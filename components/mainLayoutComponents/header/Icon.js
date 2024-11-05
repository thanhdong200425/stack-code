import Image from "next/image";

export default function HeaderIcon({src, alt}) {
    return <button className="px-[1.5rem] py-[0.5rem] hover:bg-gray-200 hover:rounded-xl">
        <Image src={src} alt={alt} width={30} height={30} className="" />
    </button>
}