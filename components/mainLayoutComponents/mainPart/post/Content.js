import Image from "next/image";

export default function Content({ heading, content, imageSrc, imageAlt, imageWidth, imageHeight }) {
    return (
        <div className="relative">
            <h3 className="my-2">{heading}</h3>
            <p className="font-normal">{content}</p>
            {imageSrc && imageAlt && <Image src={imageSrc} alt={imageAlt} width={imageWidth} height={imageHeight} className="rounded my-5" />}
        </div>
    );
}
