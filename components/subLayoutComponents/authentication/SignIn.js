import { signIn, signInWithGithub, signInWithGoogle, signInWithNotion } from "@/app/lib/userActions";
import FormContainer, { SignUpButton } from "./sub-components/Form";
import VideoBackground from "./sub-components/VideoBackground";

export default function SignIn() {
    const inputFields = [
        {
            type: "email",
            label: "Email",
            name: "email",
        },
        {
            type: "password",
            name: "password",
        },
    ];
    return (
        <div className="flex h-screen bg-white">
            {/* Left section */}
            <div className="flex flex-1">
                <div className="flex flex-1 justify-center items-center flex-col">
                    <h1 className="font-mono text-center font-bold text-3xl uppercase text-blue-500">Welcome back</h1>
                    <FormContainer inputFields={inputFields} formAction={signIn} isHaveLicense={true} isSignIn={true}>
                        <SignUpButton text={"Sign in with Notion"} iconPath={"/icons/notion.svg"} altIconPath={"Notion icon"} widthIcon={30} heightIcon={30} onClickWithOAuth={true} onClickFunction={signInWithNotion} />
                        <SignUpButton text={"Sign in with Google"} iconPath={"/icons/google.svg"} altIconPath={"Google icon"} widthIcon={30} heightIcon={30} onClickWithOAuth={true} onClickFunction={signInWithGoogle} />
                        <SignUpButton text={"Sign in with Github"} iconPath={"/icons/github.svg"} altIconPath={"Github icon"} widthIcon={30} heightIcon={30} onClickWithOAuth={true} onClickFunction={signInWithGithub} />
                    </FormContainer>
                </div>
            </div>

            {/* Right section */}
            <VideoBackground src={"/videos/video.mp4"} />
        </div>
    );
}
