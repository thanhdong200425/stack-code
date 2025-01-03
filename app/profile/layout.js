import Header from "@/components/mainLayoutComponents/header/Header";
import Sidebar from "@/components/mainLayoutComponents/sidebar/Sidebar";
import LayoutContext from "@/components/mainLayoutComponents/context/LayoutContext";
import { fetchImage } from "@/app/lib/userActions";

export default async function ProfileLayout({ children }) {
    const userImage = await fetchImage();

    return (
        <LayoutContext userImage={userImage}>
            <Header />
            <div className="container mx-auto flex justify-center w-full p-5" style={{ marginTop: "calc(var(--header-height) + 1rem)" }}>
                {children}
            </div>
        </LayoutContext>
    );
}
