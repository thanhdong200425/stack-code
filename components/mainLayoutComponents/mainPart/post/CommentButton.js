import Image from "next/image";
import Link from "next/link";

export default function CommentButton({ src, alt, currentQuantity, isHaveRedirect, postId }) {
    return (
        <div
            className={`flex justify-center items-center gap-2 border rounded-2xl p-2 transition-colors cursor-pointer
            bg-[#f0f2f5] hover:bg-[#e4e6e9]`}
        >
            {isHaveRedirect ? (
                <Link className="flex justify-center items-center gap-2" href={`/home/post/${postId}`}>
                    <Image src={src} alt={alt} width={25} height={25} />
                    {currentQuantity && <span>{currentQuantity}</span>}
                </Link>
            ) : (
                <>
                    <Image src={src} alt={alt} width={25} height={25} />
                    {currentQuantity && <span>{currentQuantity}</span>}
                </>
            )}
        </div>
    );
}
