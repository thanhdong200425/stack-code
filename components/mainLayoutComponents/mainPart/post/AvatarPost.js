import Image from "next/image";

export default function AvatarPost({ src, alt, width, height }) {
    return (
        <div>
            <Image src={src} alt={alt} width={width} height={height} />
        </div>
    );
}