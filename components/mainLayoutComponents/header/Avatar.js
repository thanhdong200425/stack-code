import Image from "next/image";

export default function Avatar({ src }) {
    return (
        <div className="px-3">
            <Image className="rounded-xl object-cover w-[100%] h-[100%]" src={src} alt={"Avatar image"} width={30} height={30} />
        </div>
    );
}
