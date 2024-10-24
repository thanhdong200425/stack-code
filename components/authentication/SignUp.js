import classes from "./signup.module.css";
import FormContainer from "./sub-components/Form";

export default function SignUp() {
    return (
        <div className="flex h-screen bg-white">
            {/* Left section */}
            <div className="flex flex-1">
                <div className="flex flex-1 justify-center items-center flex-col">
                    <h1 className="font-mono text-center font-bold text-3xl uppercase text-blue-500">Welcome to Stackcode</h1>
                    <FormContainer />
                </div>
            </div>

            {/* Right section */}
            <div className={classes.rightSection}>
                <video src="/videos/video.mp4" autoPlay loop muted playsInline className={classes.videoBackground} />
            </div>
        </div>
    );
}
