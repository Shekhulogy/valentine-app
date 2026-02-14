import { useEffect, useState } from "react";

export default function TypeWriter({ text, speed = 80 }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setIndex(0); // reset when text changes

        const interval = setInterval(() => {
            setIndex((prev) => {
                if (prev >= text.length) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return <span>{text.slice(0, index)}
        <span className="animate-pulse">|</span>
    </span>;
}
