import Header from "@/components/subLayoutComponents/header/Header";
import Introduction from "@/components/subLayoutComponents/main-part/introduction-part/Introduction";
import Slogan from "@/components/subLayoutComponents/main-part/introduction-part/Slogan";
import Footer from "@/components/subLayoutComponents/footer/Footer";

export default function HomePage() {
    return (
        <>
            <Header />
            <Introduction />
            <Slogan />
            <Footer />
        </>
    );
}
