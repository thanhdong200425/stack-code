"use client";

import ModalInput from "../mainPart/modal/ModalInput";
import {useState, useContext} from "react";
import {UserContext} from "@/components/mainLayoutComponents/context/LayoutContext";

export default function AddQuestionButton() {
    const [isShowModal, setIsShowModal] = useState(false);
    const avatar = useContext(UserContext);

    const showModal = () => {
        setIsShowModal(true);
    };

    const hideModal = () => {
        setIsShowModal(false);
    };

    return (
        <>
            {isShowModal && <ModalInput onClose={hideModal} avatar={avatar}/>}
            <button
                className="px-4 py-2 rounded-xl text-white bg-blue-400 hover:bg-blue-600 sm:text-sm sm:px-4 sm:py-1"
                onClick={showModal}
            >
                Add question
            </button>
        </>
    );
}
