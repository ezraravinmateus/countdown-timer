import { useTimer } from "react-use-precision-timer";
import { useCallback, useState } from "react";

export const TimerThree = ({ duration = 2 * 24 * 60 * 60 * 1000 }) => {
    const [inputTime, setInputTime] = useState(duration);
    const [time, setTime] = useState(duration);
    const timer = useTimer({ delay: 1000 }, () => {
        if (time > 0) {
            setTime(time - 1000);
        } else {
            console.log("Time is UP!");
            setBoolStart(false);
            timer.stop();
        }
    });

    const [boolStart, setBoolStart] = useState(false);

    const toggleStart = () => {
        if (!boolStart) {
            setBoolStart(true);
            timer.start();
        } else {
            setBoolStart(false);
            timer.pause();
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

    const setTimer = (inputTime) => {
        setBoolStart(false);
        timer.stop();
        console.log(inputTime);
        setTime(inputTime);
    };

    const triggerLapOne = () => {
        console.log("Lap One");
    };

    return (
        <>
            <h1 className="text-9xl">{getFormattedTime(time)}</h1>
            <input
                placeholder="Input Time"
                onChange={
                    !boolStart
                        ? (event) => setInputTime(event.target.value * 1000)
                        : () => {
                              return undefined;
                          }
                }
                className="border-blue-500 border rounded-full pl-2 mt-2"
            ></input>
            <div className="flex flex-row justify-center items-center mt-4">
                <button
                    className={`${
                        !boolStart ? "bg-green-700" : "bg-red-500"
                    } rounded-full px-4 py-1 text-white`}
                    onClick={toggleStart}
                >
                    {!boolStart ? "START" : "PAUSE"}
                </button>
                <button
                    onClick={
                        !boolStart
                            ? () => setTimer(inputTime)
                            : () => {
                                  return undefined;
                              }
                    }
                    className={`${
                        !boolStart
                            ? "bg-blue-500 cursor-pointer"
                            : "bg-gray-300 cursor-not-allowed"
                    } rounded-full px-4 py-1 text-white ml-4`}
                >
                    SET
                </button>
                <button
                    onClick={
                        boolStart
                            ? () => setTime(inputTime)
                            : () => {
                                  return undefined;
                              }
                    }
                    className={`${
                        boolStart
                            ? "bg-blue-500 cursor-pointer"
                            : "bg-gray-300 cursor-not-allowed"
                    } rounded-full px-4 py-1 text-white ml-4`}
                >
                    RESET
                </button>
                <button
                    onClick={triggerLapOne}
                    className={`${
                        boolStart
                            ? "bg-blue-500 cursor-pointer"
                            : "bg-gray-300 cursor-not-allowed"
                    } rounded-full px-4 py-1 text-white ml-4`}
                >
                    LAP
                </button>
            </div>
        </>
    );
};
