"use client";
import Image from "next/image";
import AvatarPost from "./post/AvatarPost";
import {useContext, useEffect, useState} from "react";
import ModalInput from "./ModalInput";
import {UserContext} from "@/components/mainLayoutComponents/context/LayoutContext";

export default function ThoughtInput() {
    const [isShowModal, setIsShowModal] = useState(false);
    const avatar = useContext(UserContext);

    const showModal = () => {
        setIsShowModal(true);
    };

    const hideModal = () => {
        setIsShowModal(false);
    };

    const buttons = [
        {
            title: "Ask",
            path: "/icons/ask-icon.svg",
            alt: "Ask icon",
            width: 25,
            height: 30,
        },
        {
            title: "Answer",
            path: "/icons/answer-icon.svg",
            alt: "Answer icon",
            width: 30,
            height: 30,
        },
    ];

    return (
        <div className="border rounded-2xl">
            {isShowModal && <ModalInput onClose={hideModal} avatar={avatar} />}

            {/* Input field */}
            <div className="bg-white p-2 max-w-[45rem] flex items-center rounded-2xl">
                <AvatarPost src={avatar} alt={"Avatar man"} width={30} height={30} />
                <input className="w-full mx-5 rounded-2xl bg-gray-50 px-4 py-2 focus:border-none focus:outline-none" placeholder="What do you want to ask or answer?" onClick={showModal} />
            </div>
            {/* Input buttons */}
            <div className="max-w-[45rem] flex justify-center items-center">
                {buttons.map((button, index) => {
                    return (
                        <div key={index} className="p-[0.6rem] w-1/2 flex justify-center gap-1 hover:bg-slate-300 rounded-md hover:cursor-pointer" onClick={showModal}>
                            <Image src={button.path} alt={button.alt} width={button.width} height={button.height} />
                            <button>{button.title}</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
