import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: "Stackcode",
    description: "Get ready to level up your coding skills with Stackcode! This intuitive app is designed to help you practice coding, ask technology-related questions, and gain insights from fellow tech enthusiasts. Whether you're a newbie trying to grasp the basics or an experienced coder looking to refine your skills, Stackcode has got you covered with challenges, discussion forums, and expert tips. Welcome to your new tech playground!",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
        </html>
    );
}
