import classes from "./slogan.module.css";
import Image from "next/image";
import image from "@/app/assets/icon-2-removebg-preview.png"

export default function Slogan() {
    return <div className={classes.container}>
    {/*Image part*/}
        <div>
            {/*<Image src={image} style={{objectFit: 'cover'}} fill={true} alt={"Introduction image"} />*/}
        </div>
        <div className={classes.text}>
            <h1 className={classes.title}>Empowering the word to develop technology <span>through collective knowledge</span></h1>
            <p className={classes.description}>Our products and tools enable people to ask, share and learn at work or at home</p>
        </div>
    </div>
}