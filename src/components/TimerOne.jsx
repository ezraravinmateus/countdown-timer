import { useEffect, useRef, useState } from "react";

export const TimerOne = ({ duration = 0 }) => {
    const [timer, setTimer] = useState(duration); // 25 minutes
    const [start, setStart] = useState(false);
    const tick = useRef();

    useEffect(() => {
        console.log(start);
        if (start) {
            tick.current = setInterval(() => {
                setTimer((timer) => timer - 10);
            }, 10);
        }
        return () => clearInterval(tick.current);
    }, [start]);

    const dispSecondsAsMins = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const seconds_ = seconds % 60;
        return (
            mins.toString() + ":" + (seconds_ == 0 ? "00" : seconds_.toString())
        );
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

    let timeMilliseconds = timer % 1000;

    const getMilliseconds = (milliSeconds) => {
        if (milliSeconds < 9) {
            return `00${milliSeconds}`;
        } else if (milliSeconds > 10 && milliSeconds < 100) {
            return `0${milliSeconds}`;
        } else {
            return milliSeconds;
        }
    };

    return (
        <div>
            <h1 className="text-3xl">{getFormattedTime(timer)}</h1>
            <h1>{getMilliseconds(timeMilliseconds)}</h1>
            <div className="mt-4">
                {/* event handler onClick is function not function call */}
                <button
                    className={`${
                        !start ? "bg-blue-500" : "bg-red-500"
                    } text-white rounded-full px-4 py-1`}
                    onClick={() => setStart(!start)}
                >
                    {!start ? "START" : "STOP"}
                </button>
            </div>
        </div>
    );
};
