import Link from "next/link";

export default function HeaderLogo({content}) {
    return <Link href="/home">
        <h2 className="uppercase font-mono text-xl tracking-wider text-blue-600 hover:text-blue-300">{content}</h2>
    </Link>
}