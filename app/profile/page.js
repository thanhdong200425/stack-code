"use client";
import Avatar from "@/components/mainLayoutComponents/header/Avatar";
import AvatarPost from "@/components/mainLayoutComponents/mainPart/post/AvatarPost";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { getCurrentUserInformation, updateUserInfo } from "../lib/userActions";

export default function ProfilePage() {
    const [state, formAction, isPending] = useActionState(updateUserInfo, {});
    const [avatar, setAvatar] = useState("/icons/avatar-man.svg");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [facebookUrl, setFacebookUrl] = useState("");
    const [googleLink, setGoogleLink] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await getCurrentUserInformation();
            if (response) {
                setUsername(response.Users.username);
                setAvatar(response.avatar_link);
                setPhoneNumber(response.phone_number || "");
                setGithubUrl(response.github_link || "");
                setFacebookUrl(response.facebook_link || "");
                setGoogleLink(response.google_link || "");
                setEmail(response.email);
            }
        };

        fetchUserData();
    }, []);

    const handleOpenFile = () => {
        fileInputRef.current.click();
    };

    const handleChangeFile = async (e) => {
        // 1. Get the file
        const file = e.target.files[0];

        if (!file) {
            console.error("No file selected");
            return;
        }

        // 2. Create a FileReader
        const reader = new FileReader();

        // 4. When the file is read, set it to the state
        reader.onloadend = async () => {
            setAvatar(reader.result);
        };

        // 3. Read the file as base64
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex flex-col items-center flex-1">
            <h1 className="text-2xl font-bold mb-4">Account settings</h1>
            <form action={formAction} className="flex flex-col w-full max-w-md space-y-4">
                {state.errors && (
                    <div className="text-red-600 text-sm mb-5">
                        {Object.keys(formState.errors).map((error, index) => {
                            return <p key={index}>{formState.errors[error]}</p>;
                        })}
                    </div>
                )}

                {/* Avatar part */}
                <div className="flex justify-center">
                    <div className=" hover:cursor-pointer">
                        <AvatarPost src={avatar} alt={"Your avatar"} width={50} height={50} onClick={handleOpenFile} />
                    </div>
                    <input type="file" className="hidden" accept="image/*" ref={fileInputRef} onChange={handleChangeFile} name="avatar_image" />
                </div>

                {/* Username part */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:to-blue-600 focus:border-blue-600 focus:outline-none focus:border-2 sm:text-sm px-2 py-1"
                        name="username"
                    />
                </div>
                {/* Phone-number part */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:to-blue-600 focus:border-blue-600 focus:outline-none focus:border-2 sm:text-sm px-2 py-1"
                        name="phone_number"
                    />
                </div>
                {/* Github links */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
                    <input
                        type="text"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:to-blue-600 focus:border-blue-600 focus:outline-none focus:border-2 sm:text-sm px-2 py-1"
                        name="github_link"
                    />
                </div>

                {/* Facebook links */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 ">Facebook URL</label>
                    <input
                        type="text"
                        value={facebookUrl}
                        onChange={(e) => setFacebookUrl(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:to-blue-600 focus:border-blue-600 focus:outline-none focus:border-2 sm:text-sm px-2 py-1"
                        name="facebook_link"
                    />
                </div>

                {/* Google links */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Google URL</label>
                    <input
                        type="text"
                        value={googleLink}
                        onChange={(e) => setGoogleLink(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:to-blue-600 focus:border-blue-600 focus:outline-none focus:border-2 sm:text-sm px-2 py-1"
                        name="google_link"
                    />
                </div>

                {/* Current email part */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Your Email</label>
                    <input
                        type="text"
                        value={email}
                        disabled
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:to-blue-600 focus:border-blue-600 focus:outline-none focus:border-2 sm:text-sm px-2 py-1"
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white flex justify-center items-center w-32 text-center  py-2 rounded-md hover:bg-blue-600">
                    {isPending ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <circle cx="4" cy="12" r="3" fill="currentColor">
                                <animate id="svgSpinners3DotsScale0" attributeName="r" begin="0;svgSpinners3DotsScale1.end-0.25s" dur="0.75s" values="3;.2;3" />
                            </circle>
                            <circle cx="12" cy="12" r="3" fill="currentColor">
                                <animate attributeName="r" begin="svgSpinners3DotsScale0.end-0.6s" dur="0.75s" values="3;.2;3" />
                            </circle>
                            <circle cx="20" cy="12" r="3" fill="currentColor">
                                <animate id="svgSpinners3DotsScale1" attributeName="r" begin="svgSpinners3DotsScale0.end-0.45s" dur="0.75s" values="3;.2;3" />
                            </circle>
                        </svg>
                    ) : (
                        "Update Profile"
                    )}
                </button>
            </form>
        </div>
    );
}
