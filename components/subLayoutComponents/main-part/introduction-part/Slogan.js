import classes from "./slogan.module.css";
import Image from "next/image";
import image from "@/app/assets/icon-2-removebg-preview.png";

export default function Slogan() {
    const features = [
        {
            title: "Ask & Learn",
            description: "Post your programming questions and get answers from experienced developers in the community.",
        },
        {
            title: "Share Knowledge",
            description: "Share your expertise, code snippets, and best practices to help others grow in their programming journey.",
        },
        {
            title: "Build Portfolio",
            description: "Showcase your contributions, earn reputation, and build a strong presence in the developer community.",
        },
    ];

    const whatYouCanDo = [
        {
            title: "Ask Questions",
            description: "Get help with specific programming problems, debugging issues, or understanding concepts.",
        },
        {
            title: "Answer & Earn",
            description: "Help others by sharing your knowledge and earn reputation points and badges.",
        },
        {
            title: "Create Content",
            description: "Write articles, share tutorials, and contribute to the community knowledge base.",
        },
    ];

    const howItWorks = [
        {
            step: "1",
            title: "Join the Community",
            description: "Create your account and set up your developer profile",
        },
        {
            step: "2",
            title: "Engage & Contribute",
            description: "Ask questions, provide answers, or share your knowledge",
        },
        {
            step: "3",
            title: "Grow Together",
            description: "Build reputation, earn badges, and connect with other developers",
        },
    ];

    return (
        <div className={classes.container}>
            <div>{/*<Image src={image} style={{objectFit: 'cover'}} fill={true} alt={"Introduction image"} />*/}</div>
            <div className={classes.text}>
                <h1 className={classes.title}>
                    Empowering the word to develop technology <span>through collective knowledge</span>
                </h1>
                <p className={classes.description}>Our products and tools enable people to ask, share and learn at work or at home</p>
                <div className={classes.features}>
                    {features.map((feature, index) => (
                        <div key={index} className={classes.feature}>
                            <h3 className={classes.featureTitle}>{feature.title}</h3>
                            <p className={classes.featureDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>

                <section className={classes.section}>
                    <h2 className={classes.sectionTitle}>What You Can Do</h2>
                    <div className={classes.cardGrid}>
                        {whatYouCanDo.map((item, index) => (
                            <div key={index} className={classes.card}>
                                <h3 className={classes.cardWTitle}>{item.title}</h3>
                                <p className={classes.cardDescription}>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={classes.section}>
                    <h2 className={classes.sectionTitle}>How It Works</h2>
                    <div className={classes.steps}>
                        {howItWorks.map((step, index) => (
                            <div key={index} className={classes.step}>
                                <div className={classes.stepNumber}>{step.step}</div>
                                <h3 className={classes.stepTitle}>{step.title}</h3>
                                <p className={classes.stepDescription}>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
