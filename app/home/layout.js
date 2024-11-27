import Header from "@/components/mainLayoutComponents/header/Header";
import Sidebar from "@/components/mainLayoutComponents/sidebar/Sidebar";
import LayoutContext, {UserContext} from "@/components/mainLayoutComponents/context/LayoutContext";
import {fetchImage} from "@/app/lib/userActions";

export default async function HomeLayout({children}) {
    const userImage = await fetchImage();

    return (
        <LayoutContext userImage={userImage}>
            <Header/>
            <div className="container mx-auto w-full flex justify-center min-h-screen"
                 style={{marginTop: "calc(var(--header-height) + 1rem)"}}>
                <Sidebar/>
                {children}
            </div>
        </LayoutContext>
    );
}
