"use client";

import HeaderLogo from "@/components/mainLayoutComponents/header/Logo";
import HeaderIcon from "@/components/mainLayoutComponents/header/Icon";
import IconContainer from "@/components/mainLayoutComponents/header/IconContainer";
import SearchBar from "@/components/mainLayoutComponents/header/SearchBar";
import { useEffect, useState } from "react";
import Avatar from "@/components/mainLayoutComponents/header/Avatar";
import AddQuestionButton from "@/components/mainLayoutComponents/header/AddQuestionButton";
import { fetchImage } from "@/app/lib/actions";

export default function Header() {
    const [isFocused, setIsFocused] = useState(false);
    const [avatar, setAvatar] = useState("/icons/avatar-mockup.jpg");

    useEffect(() => {
        const getImage = async () => {
            const result = await fetchImage();
            setAvatar(result);
        };

        getImage();
    }, []);

    return (
        <header className="bg-white border-b shadow-md fixed w-full z-50 mb-5">
            <div className={`overlay ${isFocused ? "visible" : "invisible"}`} />
            <div className="container mx-auto flex items-center justify-center" style={{ height: "var(--header-height)" }}>
                <div className="flex items-center">
                    {/*Header logo part*/}
                    <HeaderLogo content={"Stackcode"} />

                    {/*Header icon part*/}
                    <IconContainer>
                        <HeaderIcon src={"/icons/home.svg"} alt={"Home icon"} />
                        <HeaderIcon src={"/icons/coding-icon.svg"} alt={"Coding icon"} />
                        <HeaderIcon src={"/icons/notify-icon.svg"} alt={"Notify icon"} />
                    </IconContainer>

                    {/*Header search bar part*/}
                    <SearchBar name="search-bar" placeholder="Search Stackcode" setIsFocused={setIsFocused} />

                    {/*Avatar part*/}
                    <Avatar src={avatar} />

                    {/*Add question button*/}
                    <AddQuestionButton />
                </div>
            </div>
        </header>
    );
}
