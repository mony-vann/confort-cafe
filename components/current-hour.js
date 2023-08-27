import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

const CurrentHour = () => {
  const [currentTime, setCurrentTime] = useState(getFormattedTime());

  function getFormattedTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours === 12 ? 12 : hours % 12;
    return `${formattedHours}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${period}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Text fontFamily='M PLUS Rounded 1c", sans-serif' fontWeight="bold">
        {currentTime}
      </Text>
    </Box>
  );
};

export default CurrentHour;
