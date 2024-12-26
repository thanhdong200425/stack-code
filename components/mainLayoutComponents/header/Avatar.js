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
        <div className="px-3 relative flex" ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="rounded-full hover:ring-2 hover:ring-gray-200 transition-all duration-200">
                <Image className="rounded-full object-cover w-10 h-10" src={src} alt={"Avatar image"} width={40} height={40} style={{ width: "40px", height: "40px" }} />
            </button>

            {/* Floating Menu */}
            {isOpen && (
                <div className="absolute top-8 left-2 mt-2 w-32 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                    <Link href="/edit-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Edit Profile
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
