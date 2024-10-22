"use client";

import { useEffect, useState } from "react";
import classes from "./introduction.module.css";

export default function Introduction() {
    const [squares, setSquares] = useState([]);

    useEffect(() => {
        const squareArrayCreate = [];
        for (let i = 0; i < 15; i++) {
            const size = Math.random() * 40 + 20;
            const top = Math.random() * window.innerHeight;
            const left = Math.random() * window.innerWidth;
            const duration = Math.random * 10 + 5;

            squareArrayCreate.push({ size, top, left, duration });
        }

        setSquares(squareArrayCreate);
    }, []);

    return (
        <div className={classes.container}>
            {squares.map((square, index))}
            <h2></h2>
        </div>
    );
}
