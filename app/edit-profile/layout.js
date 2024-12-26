import Header from "@/components/mainLayoutComponents/header/Header";
import LayoutContext from "@/components/mainLayoutComponents/context/LayoutContext";
import { fetchImage } from "@/app/lib/userActions";

export default async function ProfileLayout({ children }) {
    const userImage = await fetchImage();
    return (
        <LayoutContext userImage={userImage}>
            <Header />
            <div className="container mx-auto w-full flex justify-center min-h-screen" style={{ marginTop: "calc(var(--header-height) + 1rem)" }}>
                {children}
            </div>
        </LayoutContext>
    );
}
