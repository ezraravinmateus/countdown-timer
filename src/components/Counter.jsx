import {
    ChakraProvider,
    HStack,
    Button,
    Heading,
    Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useTimer } from "react-use-precision-timer";

export const Counter = () => {
    const [counterMinutes, setCounterMinutes] = useState(0);
    const [counterSeconds, setCounterSeconds] = useState(0);
    const [time, setTime] = useState(0);
    const [boolStart, setBoolStart] = useState(false);
    const [inputTime, setInputTime] = useState(0);

    const increase = (setParamState, paramState) => {
        if (paramState < 59) {
            setParamState(paramState + 1);
        } else {
            setParamState(0);
        }
    };
    const decrease = (setParamState, paramState) => {
        if (paramState > 0) {
            setParamState(paramState - 1);
        } else {
            setParamState(59);
        }
    };

    const formatTime = (paramState) => {
        if (paramState > 9) {
            return paramState;
        } else {
            return `0${paramState}`;
        }
    };

    const toggleStart = () => {
        if (counterMinutes <= 0) {
            setTime(counterSeconds * 1000);
        } else if (counterSeconds <= 0) {
            setTime(counterMinutes * 60 * 1000);
        } else {
            setTime((counterMinutes * 60 + counterSeconds) * 1000);
        }

        if (!boolStart) {
            setBoolStart(true);
            timer.start();
        } else {
            if (counterMinutes <= 0) {
                setInputTime(counterSeconds * 1000);
            } else if (counterSeconds <= 0) {
                setInputTime(counterMinutes * 60 * 1000);
            } else {
                setInputTime((counterMinutes * 60 + counterSeconds) * 1000);
            }
            setBoolStart(false);
            timer.pause();
        }
    };

    const keepTime = (time) => {
        let total_seconds = parseInt(Math.floor(time / 1000));
        let seconds = parseInt(total_seconds % 60);
        let total_minutes = parseInt(Math.floor(total_seconds / 60));
        let minutes = parseInt(total_minutes % 60);
        if (seconds == 0) {
            setCounterSeconds(59);
            setCounterMinutes(minutes - 1);
        } else {
            setCounterSeconds(seconds - 1);
            setCounterMinutes(minutes);
        }
    };
    // console.log(inputTime);

    const timer = useTimer({ delay: 1000 }, () => {
        keepTime(time);
        if (time > 0) {
            setTime(time - 1000);
        } else {
            setCounterMinutes(0);
            setCounterSeconds(0);
            console.log("Time is UP!");
            setBoolStart(false);
            timer.stop();
        }
    });

    const getSeconds = (timeMillis) => {
        let total_seconds = parseInt(Math.floor(timeMillis / 1000));
        let seconds = parseInt(total_seconds % 60);
        if (seconds <= 9) {
            return `0${seconds}`;
        } else {
            return seconds;
        }
    };

    const getMinutes = (timeMillis) => {
        let total_seconds = parseInt(Math.floor(timeMillis / 1000));
        let total_minutes = parseInt(Math.floor(total_seconds / 60));
        let minutes = parseInt(total_minutes % 60);
        if (minutes <= 9) {
            return `0${minutes}`;
        } else {
            return minutes;
        }
    };

    const sizeCounterButton = "5vh";
    const spacingButton = "8";
    const sizeButtonStartReset = "10vh";
    const fontSize = "40vh";

    return (
        <ChakraProvider>
            <HStack>
                <Stack
                    spacing={spacingButton}
                    position={"fixed"}
                    left={"16"}
                    visibility={!boolStart ? "visible" : "hidden"}
                >
                    <Button
                        minHeight={sizeCounterButton}
                        minWidth={sizeCounterButton}
                        variant={"unstyled"}
                        backgroundColor={"blue.500"}
                        borderRadius={"full"}
                        textColor={"white"}
                        onClick={() =>
                            increase(setCounterMinutes, counterMinutes)
                        }
                    >
                        <ChevronUpIcon fontSize={sizeCounterButton} />
                    </Button>
                    <Button
                        minHeight={sizeCounterButton}
                        minWidth={sizeCounterButton}
                        variant={"unstyled"}
                        backgroundColor={"blue.500"}
                        borderRadius={"full"}
                        textColor={"white"}
                        onClick={() =>
                            decrease(setCounterMinutes, counterMinutes)
                        }
                    >
                        <ChevronDownIcon fontSize={sizeCounterButton} />
                    </Button>
                </Stack>
                <HStack>
                    <Heading fontSize={fontSize}>
                        {!boolStart
                            ? formatTime(counterMinutes)
                            : getMinutes(time)}
                    </Heading>
                    <Heading fontSize={fontSize}>:</Heading>
                    <Heading fontSize={fontSize}>
                        {!boolStart
                            ? formatTime(counterSeconds)
                            : getSeconds(time)}
                    </Heading>
                </HStack>
                <Stack
                    spacing={spacingButton}
                    position={"fixed"}
                    right={"16"}
                    visibility={!boolStart ? "visible" : "hidden"}
                >
                    <Button
                        minHeight={sizeCounterButton}
                        minWidth={sizeCounterButton}
                        variant={"unstyled"}
                        backgroundColor={"blue.500"}
                        borderRadius={"full"}
                        textColor={"white"}
                        onClick={() =>
                            increase(setCounterSeconds, counterSeconds)
                        }
                    >
                        <ChevronUpIcon fontSize={sizeCounterButton} />
                    </Button>
                    <Button
                        minHeight={sizeCounterButton}
                        minWidth={sizeCounterButton}
                        variant={"unstyled"}
                        backgroundColor={"blue.500"}
                        borderRadius={"full"}
                        textColor={"white"}
                        onClick={() =>
                            decrease(setCounterSeconds, counterSeconds)
                        }
                    >
                        <ChevronDownIcon fontSize={sizeCounterButton} />
                    </Button>
                </Stack>
            </HStack>

            <HStack mt={"4"} spacing={"10vh"}>
                <Button
                    onClick={toggleStart}
                    fontSize={sizeCounterButton}
                    minH={sizeButtonStartReset}
                    minW={sizeButtonStartReset}
                    px={sizeButtonStartReset}
                    variant={"unstyled"}
                    backgroundColor={!boolStart ? "blue.500" : "red.500"}
                    borderRadius={"full"}
                    textColor={"white"}
                >
                    {!boolStart ? "START" : "PAUSE"}
                </Button>
                <Button
                    minW={sizeButtonStartReset}
                    minH={sizeButtonStartReset}
                    px={sizeButtonStartReset}
                    fontSize={sizeCounterButton}
                    variant={"unstyled"}
                    backgroundColor={!boolStart ? "white" : "blue.500"}
                    borderRadius={"full"}
                    textColor={!boolStart ? "gray.500" : "white"}
                    borderColor={!boolStart ? "gray.500" : "white"}
                    border={"1px"}
                >
                    RESET
                </Button>
            </HStack>
        </ChakraProvider>
    );
};
