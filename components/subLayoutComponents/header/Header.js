import Logo from "./Logo";
import icon2 from "@/app/assets/icon-2-removebg-preview.png";
import classes from "./header.module.css";
import Link from "next/link";

export default function Header() {
    return (
        <header className={classes.headerBlock}>
            <div className={classes.headerBlockLeft}>
                <Logo url={icon2} />
                <nav className={classes.navigation}>
                    <ul>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/coding">Practice</Link>
                        </li>
                        <li>
                            <Link href="/home">Ask</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className={classes.headerBlockRight}>
                <ul>
                    <li>
                        <Link href="/follow">Follow us</Link>
                    </li>
                    <li>
                        <Link href="/sign-in" className={classes.signInButton}>
                            Sign in
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
