import LayoutContext from "@/components/mainLayoutComponents/context/LayoutContext";
import { fetchImage } from "../lib/userActions";
import Header from "@/components/mainLayoutComponents/header/Header";

export default async function LayoutCoding({ children }) {
    const userImage = await fetchImage();

    return (
        <LayoutContext userImage={userImage}>
            <Header />
            <div className="container mx-auto w-full flex justify-start min-h-screen" style={{ marginTop: "calc(var(--header-height) + 1rem)" }}>
                {children}
            </div>
        </LayoutContext>
    );
}
