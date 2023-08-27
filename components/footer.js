import { useColorModeValue, Box, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";

const Footer = () => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const info = `/images/info.png`;

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <Box opacity={0.4} fontSize="sm" align="center" mt={30}>
      <Box align="center" opacity={0.4}>
        <p> &copy; {new Date().getFullYear()} Monyvann. All Rights Reserved.</p>
      </Box>
      <IconButton
        onClick={toggleContentVisibility}
        colorScheme={useColorModeValue("yellow", "pink")}
        width={5}
        height={5}
      >
        <Image src={info} width={10} height={10} alt="logo"></Image>
      </IconButton>
      {isContentVisible && (
        <Box opacity={0.4}>
          <p>
            "(FREE) Isometric Cafe"
            <a href="https://skfb.ly/oDzTU">(https://skfb.ly/oDzTU) </a>by
            LowPolyBoy is licensed under Creative Commons Attribution
            (http://creativecommons.org/licenses/by/4.0/).
          </p>
          <p>
            All the icons used in this website are credited to
            <a href="https://www.flaticon.com/">flaticon.</a>
          </p>
        </Box>
      )}
    </Box>
  );
};

export default Footer;
