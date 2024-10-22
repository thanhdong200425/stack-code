import Image from "next/image";
import classes from "./logo.module.css";

export default function Logo({ url }) {
    return (
        <div className={classes.container}>
            <Image alt="Logo" src={url} fill className={classes.image} />
        </div>
    );
}
