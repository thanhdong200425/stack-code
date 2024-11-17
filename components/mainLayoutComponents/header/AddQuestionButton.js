"use client";

import ModalInput from "../mainPart/ModalInput";
import { fetchImage } from "@/app/lib/actions";
import { useState, useEffect } from "react";

export default function AddQuestionButton() {
    const [isShowModal, setIsShowModal] = useState(false);
    const [avatar, setAvatar] = useState("/icons/avatar-man.svg");

    useEffect(() => {
        const getImage = async () => {
            try {
                const result = await fetchImage();
                setAvatar(result);
            } catch (error) {
                console.error("Failed to fetch image:", error);
            }
        };

        getImage();
    }, []);

    const showModal = () => {
        setIsShowModal(true);
    };

    const hideModal = () => {
        setIsShowModal(false);
    };

    return (
        <>
            {isShowModal && <ModalInput onClose={hideModal} avatar={avatar} />}
            <button className="px-4 py-2 rounded-xl text-white bg-blue-400 hover:bg-blue-600" onClick={showModal}>
                Add question
            </button>
        </>
    );
}
