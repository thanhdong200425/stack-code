import FormContainer from "./sub-components/Form";
import VideoBackground from "./sub-components/VideoBackground";
import { SignUpButton } from "./sub-components/Form";
import { signUp } from "@/app/lib/userActions";

export default function SignUp() {
    const inputFields = [
        {
            type: "input",
            label: "Email",
            name: "email",
        },
        {
            type: "input",
            label: "Username",
            name: "username",
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
                    <h1 className="font-mono text-center font-bold text-3xl uppercase text-blue-500">Welcome to Stackcode</h1>
                    <FormContainer inputFields={inputFields} formAction={signUp}>
                        <SignUpButton text={"Sign up with Facebook"} iconPath={"/icons/facebook.svg"} altIconPath={"Facebook icon"} widthIcon={32} heightIcon={32} />
                        <SignUpButton text={"Sign up with Google"} iconPath={"/icons/google.svg"} altIconPath={"Google icon"} widthIcon={30} heightIcon={30} />
                        <SignUpButton text={"Sign up with Github"} iconPath={"/icons/github.svg"} altIconPath={"Github icon"} widthIcon={30} heightIcon={30} />
                    </FormContainer>
                </div>
            </div>

            {/* Right section */}
            <VideoBackground src={"/videos/video.mp4"} />
        </div>
    );
}
