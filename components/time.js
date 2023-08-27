import {
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  > svg {
    transition: 200ms ease;
  }

  &:hover > svg {
    transform: rotate(20deg);
  }
`;

const Time = () => {
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - startTime;
      setElapsedTime(timeDifference);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [startTime]);

  const formatElapsedTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} min `;
  };

  const resetElapsedTime = () => {
    setStartTime(new Date().getTime());
    setElapsedTime(0); // Reset the start time
  };
  const reset = `/images/reset.png`;

  return (
    <Box align="right" mt={2}>
      <Flex alignItems="center" flexDirection={{ base: "column", md: "row" }}>
        <LogoBox>
          <Text
            fontFamily='M PLUS Rounded 1c", sans-serif'
            fontWeight="bold"
            fontSize={{ base: "md", md: "lg" }}
            mb={{ base: 2, md: 0 }}
          >
            {formatElapsedTime(elapsedTime)}
          </Text>
        </LogoBox>
        <IconButton
          aria-label="Toggle theme"
          colorScheme={useColorModeValue("yellow", "orange")}
          onClick={resetElapsedTime}
          ml={{ base: 0, md: 2 }}
        >
          <Image src={reset} width={14} height={10} alt="logo" />
        </IconButton>
      </Flex>
    </Box>
  );
};

export default Time;
