"use client";

import Image from "next/image";
import AvatarPost from "./post/AvatarPost";
import { privacyOptions } from "./ModalInput";

import { useState, useRef, useEffect, useActionState, useContext } from "react";
import { updatePost } from "@/app/lib/postActions";
import { UserContext } from "@/components/mainLayoutComponents/context/LayoutContext";
import supabase from "@/utils/supabase";

export default function ModalUpdate({ onClose, postId }) {
    const [formState, dispatchFunction, isPending] = useActionState(updatePost, {});
    const avatar = useContext(UserContext);

    const [showPrivacy, setShowPrivacy] = useState(false);
    const [titleInputValue, setTitleInputValue] = useState("");
    const [bodyInputValue, setBodyInputValue] = useState("");
    const [uploadedImage, setUploadedImage] = useState(null);
    const [selectedPrivacy, setSelectedPrivacy] = useState({
        title: "Public",
        icon: "/icons/public-icon.svg",
    });
    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data: post, error } = await supabase.from("Posts").select("*").match({ id: postId }).single();
                const imageSrc = supabase.storage.from("post-image-bucket").getPublicUrl(post.image);
                setTitleInputValue(post.title);
                setBodyInputValue(post.content);
                setUploadedImage(imageSrc.data.publicUrl);
            } catch (error) {
                console.log("Error in ModalUpdate component: " + error);
            }
        };

        fetchPost();
    }, [postId]);

    useEffect(() => {
        setIsModified(true);
    }, [titleInputValue, bodyInputValue, uploadedImage]);

    useEffect(() => {
        if (formState?.status === true) onClose();
    }, [formState.status, onClose]);

    const dropdownRef = useRef(null);
    const fileInputRef = useRef(null);

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

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowPrivacy(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex p-10 justify-center items-center z-50">
            <form action={dispatchFunction} className="relative bg-white w-[600px] rounded-lg shadow-lg">
                {/* Modal header */}
                <div className="py-3 px-4 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Update post</h3>
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
                            <button
                                onClick={(event) => {
                                    event.preventDefault();
                                    setShowPrivacy(!showPrivacy);
                                }}
                                className="flex relative items-center gap-1 hover:bg-gray-100 rounded-lg p-2"
                            >
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
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. What is the most popular language?" required value={titleInputValue} onChange={changeTitleInputValue} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="body">Body</label>
                        <textarea className="w-full h-32 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" name="body" placeholder="What do you want to ask or answer?" value={bodyInputValue} onChange={changeBodyInputValue} id="body" required />

                        <input type="file" accept="image/*" className="opacity-0  cursor-pointer hidden" onChange={handleImageUpload} ref={fileInputRef} name="image" />
                        <input type="hidden" name="postId" value={postId} />
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
                    <button disabled={!isModified} className={`px-4 py-2 relative inline-block text-white rounded group ${!isModified ? "bg-blue-300 hover:cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
                        {isPending ? (
                            <div className="flex items-center gap-1">
                                <span>Posting</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <circle cx="4" cy="12" r="0" fill="currentColor">
                                        <animate fill="freeze" attributeName="r" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3" />
                                        <animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12" />
                                        <animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20" />
                                        <animate id="svgSpinners3DotsMove0" fill="freeze" attributeName="r" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0" />
                                        <animate id="svgSpinners3DotsMove1" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove0.end" dur="0.001s" values="20;4" />
                                    </circle>
                                    <circle cx="4" cy="12" r="3" fill="currentColor">
                                        <animate fill="freeze" attributeName="cx" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12" />
                                        <animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20" />
                                        <animate id="svgSpinners3DotsMove2" fill="freeze" attributeName="r" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0" />
                                        <animate id="svgSpinners3DotsMove3" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove2.end" dur="0.001s" values="20;4" />
                                        <animate fill="freeze" attributeName="r" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3" />
                                    </circle>
                                    <circle cx="12" cy="12" r="3" fill="currentColor">
                                        <animate fill="freeze" attributeName="cx" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20" />
                                        <animate id="svgSpinners3DotsMove4" fill="freeze" attributeName="r" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0" />
                                        <animate id="svgSpinners3DotsMove5" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove4.end" dur="0.001s" values="20;4" />
                                        <animate fill="freeze" attributeName="r" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3" />
                                        <animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12" />
                                    </circle>
                                    <circle cx="20" cy="12" r="3" fill="currentColor">
                                        <animate id="svgSpinners3DotsMove6" fill="freeze" attributeName="r" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0" />
                                        <animate id="svgSpinners3DotsMove7" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove6.end" dur="0.001s" values="20;4" />
                                        <animate fill="freeze" attributeName="r" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3" />
                                        <animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12" />
                                        <animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20" />
                                    </circle>
                                </svg>
                            </div>
                        ) : (
                            "Update"
                        )}
                        {~isModified && <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Please enter some characters in title and body to create a post</div>}
                    </button>
                </div>
            </form>
        </div>
    );
}
