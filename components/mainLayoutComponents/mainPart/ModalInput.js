"use client";
import { useActionState } from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import AvatarPost from "./post/AvatarPost";
import { addPost } from "@/app/lib/actions";

export default function ModalInput({ onClose, avatar }) {
    const [formState, dispatchFunction] = useActionState(addPost, {});

    const [showPrivacy, setShowPrivacy] = useState(false); // Track the visibility of privacy dropdown
    const [titleInputValue, setTitleInputValue] = useState("");
    const [bodyInputValue, setBodyInputValue] = useState("");
    const [selectedPrivacy, setSelectedPrivacy] = useState({
        title: "Public",
        icon: "/icons/public-icon.svg",
    });
    const [uploadedImage, setUploadedImage] = useState(null); // State to store the uploaded image
    const dropdownRef = useRef(null); // Reference to dropdown privacy part to track the operation of it like click, ...
    const fileInputRef = useRef(null); // Reference to file input tag

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (formState?.status === true) onClose();
    }, [formState.status, onClose]);

    const privacyOptions = [
        { title: "Public", icon: "/icons/public-icon.svg" },
        { title: "Limited", icon: "/icons/limited-icon.svg" },
        { title: "Private", icon: "/icons/private-icon.svg" },
    ];

    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowPrivacy(false);
        }
    };

    const changeTitleInputValue = (event) => {
        setTitleInputValue(event.target.value);
    };

    const changeBodyInputValue = (event) => {
        setBodyInputValue(event.target.value);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        // Modal container
        <div className="fixed inset-0 bg-black bg-opacity-50 flex p-10 justify-center items-center z-50">
            <form action={dispatchFunction} className="relative bg-white w-[600px] rounded-lg shadow-lg">
                {/* Modal header */}
                <div className="py-3 px-4 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Create a question</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
                        ×
                    </button>
                </div>

                {/* Modal body */}
                <div className="p-4">
                    {/* Privacy part */}
                    <div className="relative mb-4" ref={dropdownRef}>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                            <AvatarPost src={avatar} alt={"Avatar man"} width={30} height={30} />
                            <Image src={"/icons/next-icon.svg"} alt="Next icon" width={20} height={20} />
                            <button onClick={() => setShowPrivacy(!showPrivacy)} className="flex relative items-center gap-1 hover:bg-gray-100 rounded-lg p-2">
                                <Image src={selectedPrivacy.icon} alt={selectedPrivacy.title} width={20} height={20} />
                                <span>{selectedPrivacy.title}</span>
                                <Image src="/icons/down-arrow.svg" alt="arrow" width={20} height={20} className={`transition-transform duration-300 ${showPrivacy ? "rotate-180" : ""}`} />
                            </button>
                        </div>

                        {/* Dropdown menu */}
                        {showPrivacy && (
                            <div className="absolute top-full left-[5rem] mt-1 w-48 bg-white rounded-lg shadow-lg border animatefadeIn">
                                {privacyOptions.map((option, index) => (
                                    <button
                                        key={index}
                                        className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 transition-colors"
                                        onClick={() => {
                                            setSelectedPrivacy(option);
                                            setShowPrivacy(false);
                                        }}
                                    >
                                        <Image src={option.icon} alt={option.title} width={20} height={20} />
                                        <span>{option.title}</span>

                                        {option.title === selectedPrivacy.title && <Image className="ml-auto" src={"/icons/done-icon.svg"} alt="Done icon" width={20} height={20} />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Display error part */}
                    {formState && formState.errors && (
                        <div className="text-red-600 text-sm mb-5">
                            {Object.keys(formState.errors).map((error, index) => {
                                return <p key={index}>{formState.errors[error]}</p>;
                            })}
                        </div>
                    )}

                    {/* Input part */}
                    <div className="flex flex-col gap-2 mb-2">
                        <label htmlFor="title">
                            Title <span className="text-red-600 font-normal">*</span>
                        </label>
                        <input type="text" id="title" name="title" className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. What is the most popular language?" required onChange={changeTitleInputValue} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="body">
                            Body <span className="text-red-600 font-normal">*</span>
                        </label>
                        <textarea className="w-full h-32 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" name="body" placeholder="What do you want to ask or answer?" value={bodyInputValue} onChange={changeBodyInputValue} id="body" required />

                        <input type="file" accept="image/*" className="opacity-0  cursor-pointer hidden" onChange={handleImageUpload} ref={fileInputRef} name="image" />
                        <Image src="/icons/upload-icon.svg" alt="Upload" width={20} height={20} className="cursor-pointer ml-2" onClick={() => fileInputRef.current.click()} />

                        {uploadedImage && (
                            <div className="mt-2 relative">
                                <Image src={uploadedImage} alt="Uploaded" width={120} height={120} className="rounded-lg" />
                                <span
                                    className="absolute top-[-1rem] left-[7.5rem] cursor-pointer text-gray-300 hover:text-black"
                                    onClick={() => {
                                        setUploadedImage(null);
                                    }}
                                >
                                    x
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal footer */}
                <div className="p-4 border-t flex justify-end">
                    <button onClick={onClose} className="mr-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                        Cancel
                    </button>
                    <button disabled={bodyInputValue.length < 8 && titleInputValue.length < 4} className={`px-4 py-2 relative inline-block text-white rounded group ${bodyInputValue.length < 8 ? "bg-blue-300 hover:cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
                        Post
                        {bodyInputValue.length < 8 && titleInputValue.length < 4 && <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Please enter some characters in title and body to create a post</div>}
                    </button>
                </div>
            </form>
        </div>
    );
}
