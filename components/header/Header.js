import Logo from "./Logo";
import icon2 from "../../app/assets/icon-2-removebg-preview.png";
import classes from "./header.module.css";

export default function Header() {
    return (
        <div className={classes.headerBlock}>
            {/*Left header*/}
            <div className={classes.headerBlockLeft}>
                <Logo url={icon2}/>
                <div className={classes.navigation}>
                    <ul>
                        <a href="#">
                            <li>About</li>
                        </a>
                        <a href="#">
                            <li>Practice</li>
                        </a>
                        <a href="#">
                            <li>Ask</li>
                        </a>
                    </ul>
                </div>
            </div>

            {/*Right header*/}
            <div className={classes.headerBlockRight}>
                <ul>
                    <a href="#">
                        <li>Follow us</li>
                    </a>
                    <li>
                        <button className={classes.signInButton}>
                            Sign in
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
