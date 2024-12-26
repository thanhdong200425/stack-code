"use client";

import { useEffect, useState } from "react";
import classes from "./introduction.module.css";

export default function Introduction() {
    const [squares, setSquares] = useState([]);

    useEffect(() => {
        const squareArrayCreate = [];
        for (let i = 0; i < 10; i++) {
            const size = Math.random() * 60 + 40;
            const top = Math.random() * window.innerHeight;
            const left = Math.random() * window.innerWidth;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;

            squareArrayCreate.push({ size, top, left, duration, delay });
        }

        setSquares(squareArrayCreate);
    }, []);

    return (
        <div className={classes.container}>
            {squares.map((square, index) => (
                <div
                    key={index}
                    className={classes.square}
                    style={{
                        width: `${square.size}px`,
                        height: `${square.size}px`,
                        top: `${square.top}px`,
                        left: `${square.left}px`,
                        animationDuration: `${square.duration}s`,
                        animationDelay: `${square.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}
