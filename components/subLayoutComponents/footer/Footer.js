import classes from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={classes.footer}>
            <div className={classes.footerContent}>
                <div className={classes.footerSection}>
                    <h3>StackCode</h3>
                    <p>Empowering developers to learn, share, and grow together.</p>
                    <div className={classes.socialLinks}>
                        <a href="#" aria-label="Github">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="#" aria-label="Twitter">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" aria-label="LinkedIn">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>

                <div className={classes.footerSection}>
                    <h4>Resources</h4>
                    <ul>
                        <li>
                            <Link href="/">About Us</Link>
                        </li>
                        <li>
                            <Link href="/coding">Practice</Link>
                        </li>
                        <li>
                            <Link href="/home">Blog</Link>
                        </li>
                    </ul>
                </div>

                <div className={classes.footerSection}>
                    <h4>Community</h4>
                    <ul>
                        <li>
                            <Link href="/guidelines">Guidelines</Link>
                        </li>
                        <li>
                            <Link href="/discussions">Discussions</Link>
                        </li>
                        <li>
                            <Link href="/leaderboard">Leaderboard</Link>
                        </li>
                    </ul>
                </div>

                <div className={classes.footerSection}>
                    <h4>Support</h4>
                    <ul>
                        <li>
                            <Link href="/help">Help Center</Link>
                        </li>
                        <li>
                            <Link href="/contact">Contact Us</Link>
                        </li>
                        <li>
                            <Link href="/privacy">Privacy Policy</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={classes.footerBottom}>
                <p>&copy; {currentYear} StackCode. All rights reserved.</p>
            </div>
        </footer>
    );
}
