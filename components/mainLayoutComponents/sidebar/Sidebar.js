import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
    const publicPath = "/mockup-images/";
    const links = [
        {
            title: "Vietnamese",
            icon: `${publicPath}/vietnam-flag.svg`,
        },
        {
            title: "Mobile phone",
            icon: `${publicPath}/mobile-phone.svg`,
        },
        {
            title: "Computer",
            icon: `${publicPath}/computer.svg`,
        },
        {
            title: "Science",
            icon: `${publicPath}/science.svg`,
        },
    ];

    return (
        <div className="h-[calc(100vh-var(--header-height)-1rem)] sticky top-[calc(var(--header-height)+1rem)] w-40 mr-4">
            {links.map((val, index) => {
                return (
                    <Link className="text-sm flex items-center gap-4 font-normal hover:bg-slate-200 p-2 hover:rounded" href="#" key={index}>
                        <Image className="rounded-lg border p-1" src={val.icon} alt={val.title} width={30} height={30} />
                        {val.title}
                    </Link>
                );
            })}
        </div>
    );
}
