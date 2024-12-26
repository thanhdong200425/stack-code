"use client";

import HeaderLogo from "@/components/mainLayoutComponents/header/Logo";
import HeaderIcon from "@/components/mainLayoutComponents/header/Icon";
import IconContainer from "@/components/mainLayoutComponents/header/IconContainer";
import SearchBar from "@/components/mainLayoutComponents/header/SearchBar";
import { useContext, useState } from "react";
import Avatar from "@/components/mainLayoutComponents/header/Avatar";
import AddQuestionButton from "@/components/mainLayoutComponents/header/AddQuestionButton";
import { UserContext } from "@/components/mainLayoutComponents/context/LayoutContext";
import { useRouter } from "next/navigation";

export default function Header() {
    const [isFocused, setIsFocused] = useState(false);
    const avatar = useContext(UserContext);
    const router = useRouter();

    return (
        <header className="bg-white border-b shadow-md fixed w-full z-50 mb-5">
            <div className={`overlay ${isFocused ? "visible" : "invisible"}`} />
            <div className="container mx-auto flex items-center justify-center" style={{ height: "var(--header-height)" }}>
                <div className="flex items-center">
                    {/*Header logo part*/}
                    <HeaderLogo content={"Stackcode"} />

                    {/*Header icon part*/}
                    <IconContainer>
                        <HeaderIcon src={"/icons/home.svg"} alt={"Home icon"} onClick={() => router.push("/home")} />
                        <HeaderIcon src={"/icons/coding-icon.svg"} alt={"Coding icon"} onClick={() => router.push("/coding")} />
                        <HeaderIcon src={"/icons/profile-icon.svg"} alt={"Profile icon"} onClick={() => router.push("/profile")} />
                    </IconContainer>

                    {/*Header search bar part*/}
                    <SearchBar name="search-bar" placeholder="Find people or coding problems..." isFocused={isFocused} setIsFocused={setIsFocused} />

                    {/*Avatar part*/}
                    <Avatar src={avatar} />

                    {/*Add question button*/}
                    <AddQuestionButton />
                </div>
            </div>
        </header>
    );
}
