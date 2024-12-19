"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "@/app/lib/userActions";

export default function Avatar({ src }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="px-3 relative" ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="rounded-xl hover:ring-2 hover:ring-gray-200 transition-all duration-200">
                <Image className="rounded-xl object-cover w-[100%] h-[100%]" src={src} alt={"Avatar image"} width={30} height={30} />
            </button>

            {/* Floating Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Edit Profile
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Settings
                    </Link>
                    <div className="border-t border-gray-200"></div>
                    <button onClick={() => signOut()} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}
