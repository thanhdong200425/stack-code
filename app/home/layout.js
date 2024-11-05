import Header from "@/components/mainLayoutComponents/header/Header";
import Sidebar from "@/components/mainLayoutComponents/sidebar/Sidebar";

export default function HomeLayout({ children }) {
    return (
        <>
            <Header />
            <div className="container mx-auto w-full flex justify-center min-h-screen" style={{ marginTop: "calc(var(--header-height) + 1rem)" }}>
                <Sidebar />
                {children}
            </div>
        </>
    );
}
