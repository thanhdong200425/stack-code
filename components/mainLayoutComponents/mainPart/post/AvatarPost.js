import Image from "next/image";

export default function AvatarPost({ src, alt, width, height, onClick = null }) {
    return (
        <div className="rounded-lg overflow-hidden" onClick={onClick ? onClick : null}>
            <Image src={src} alt={alt} width={width} height={height} />
        </div>
    );
}
