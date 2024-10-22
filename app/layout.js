import { Open_Sans } from "next/font/google";
import "./globals.css";

const roboto = Open_Sans({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    title: "Stackcode",
    description: "Get ready to level up your coding skills with Stackcode! This intuitive app is designed to help you practice coding, ask technology-related questions, and gain insights from fellow tech enthusiasts. Whether you're a newbie trying to grasp the basics or an experienced coder looking to refine your skills, Stackcode has got you covered with challenges, discussion forums, and expert tips. Welcome to your new tech playground!",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={roboto.className}>{children}</body>
        </html>
    );
}
