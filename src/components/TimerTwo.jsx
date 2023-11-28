import { useEffect, useRef, useState } from "react";

export const TimerTwo = ({ duration }) => {
    const [time, setTime] = useState(duration);

    useEffect(() => {
        if (time < 0) {
            setTime(0);
        } else {
            setTimeout(() => {
                setTime(time - 10);
            }, 10);
        }
    }, [time]);

    let timeMilliseconds = time % 1000;

    const getMilliseconds = (milliSeconds) => {
        if (milliSeconds < 9) {
            return `00${milliSeconds}`;
        } else if (milliSeconds > 10 && milliSeconds < 100) {
            return `0${milliSeconds}`;
        } else {
            return milliSeconds;
        }
    };

    const getFormattedTime = (timeMillis) => {
        let total_seconds = parseInt(Math.floor(timeMillis / 1000));
        let total_minutes = parseInt(Math.floor(total_seconds / 60));
        let total_hours = parseInt(Math.floor(total_minutes / 60));
        let days = parseInt(Math.floor(total_hours / 24));

        let seconds = parseInt(total_seconds % 60);
        let minutes = parseInt(total_minutes % 60);
        let hours = parseInt(total_hours % 24);

        const getTime = (time) => {
            if (time < 10) {
                return `0${time}`;
            } else {
                return time;
            }
        };

        if (days > 0) {
            return `${days} : ${getTime(hours)} : ${getTime(
                minutes
            )} : ${getTime(seconds)} `;
        }
        if (hours > 0) {
            return `${getTime(hours)} : ${getTime(minutes)} : ${getTime(
                seconds
            )} `;
        }
        if (minutes > 0) {
            return `${getTime(minutes)} : ${getTime(seconds)}`;
        } else {
            return `${getTime(seconds)}`;
        }
    };

    return (
        <div>
            <h1 className="text-3xl">{getFormattedTime(time)}</h1>
            <h2>{getMilliseconds(timeMilliseconds)}</h2>
        </div>
    );
};
