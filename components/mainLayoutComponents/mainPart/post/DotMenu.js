"use client";
import { removePost } from "@/app/lib/postActions";
import Image from "next/image";
import { useContext, useState } from "react";
import ModalUpdate from "../modal/ModalUpdate";
import { UserContext } from "@/components/mainLayoutComponents/context/LayoutContext";

export default function DotMenu({ postId, authorId, userId }) {
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const image = useContext(UserContext);
    const handleShowModalUpdate = () => {
        setShowModalUpdate(true);
        setShowModal(false);
    };

    const handleCloseModalUpdate = () => {
        setShowModalUpdate(false);
        if (showModal) setShowModal(false);
    };

    const deleteEvent = async (postId) => {
        await removePost(postId);
        window.location.reload();
    };

    return (
        <div className="flex items-center justify-end relative">
            <button onClick={() => setShowModal(!showModal)}>
                <Image src={"/icons/dot-menu.svg"} alt="Dot menu" width={25} height={25} />
            </button>
            {showModal && (
                <div className="absolute flex flex-col items-center justify-center w-32 top-6 left-0 bg-white shadow-xl rounded-lg p-2 gap-2 border border-gray-200">
                    {userId === authorId && (
                        <button className="flex text-sm items-center text-left w-full p-2 hover:bg-gray-300 rounded-md" onClick={handleShowModalUpdate}>
                            <Image src={"/icons/edit-square-icon.svg"} alt="Edit icon" width={20} height={20} className="mr-2" />
                            Update
                        </button>
                    )}

                    {userId === authorId && (
                        <button className="flex text-sm items-center text-left w-full p-2 hover:bg-gray-300 rounded-md" onClick={deleteEvent.bind(null, postId)}>
                            <Image src={"/icons/delete-icon.svg"} alt="Delete icon" width={20} height={20} className="mr-2" />
                            Delete
                        </button>
                    )}

                    {userId !== authorId && (
                        <button className="flex text-sm items-center text-left w-full p-2 hover:bg-gray-300 rounded-md">
                            <Image src={"/icons/report-icon.svg"} alt="Report icon" width={20} height={20} className="mr-2" />
                            Report
                        </button>
                    )}
                </div>
            )}

            {showModalUpdate && <ModalUpdate onClose={handleCloseModalUpdate} postId={postId} />}
        </div>
    );
}
