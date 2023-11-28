import { Counter } from "./components/Counter";
import { TimerFour } from "./components/TimerFour";
import { TimerOne } from "./components/TimerOne";
import { TimerThree } from "./components/TimerThree";
import { TimerTwo } from "./components/TimerTwo";
import { ChakraProvider, Heading, Flex, Stack } from "@chakra-ui/react";
function App() {
    return (
        <Stack height={"100vh"} justify={"space-between"} align={"center"}>
            {/* <TimerOne duration={60 * 1000}></TimerOne> */}
            {/* <TimerTwo duration={2 * 24 * 60 * 60 * 1000}></TimerTwo> */}
            {/* <h1>Hi</h1> */}
            {/* <TimerThree></TimerThree> */}
            {/* <Counter></Counter> */}
            <TimerFour></TimerFour>
        </Stack>
    );
}

export default App;
