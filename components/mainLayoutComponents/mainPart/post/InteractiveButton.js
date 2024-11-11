import Image from "next/image";

export default function InteractiveButton({ src, alt, quantity }) {
    return (
        <div className="flex justify-center items-center gap-2 border rounded-2xl p-2 bg-[#dbe4e9] hover:cursor-pointer hover:bg-[#c2cdd3]">
            <Image src={src} alt={alt} width={20} height={20} />
            {quantity && <span>{quantity}</span>}
        </div>
    );
}
