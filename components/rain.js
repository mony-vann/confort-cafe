import { useRef, useState } from "react";
import {
  useColorModeValue,
  IconButton,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  MdGraphicEq,
  HStack,
} from "@chakra-ui/react";
import Image from "next/image";

export default function Rain() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();
  const [volume, setVolume] = useState(0.2); // Initial volume

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Error playing audio:", error);
        });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (newVolume) => {
    const audioElement = document.getElementById("audio-player-rain");
    const newVol = parseFloat(newVolume);
    audioElement.volume = newVol;
    setVolume(newVol);
  };

  return (
    <Box align="left" mt={2}>
      <HStack>
        <IconButton
          colorScheme={
            isPlaying
              ? useColorModeValue("yellow", "pink")
              : useColorModeValue("orange", "orange")
          }
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Image
              src={`/images/rainy.png`}
              width={15}
              height={10}
              alt="logo"
            ></Image>
          ) : (
            <Image
              src={`/images/rainy.png`}
              width={17}
              height={10}
              alt="logo"
            ></Image>
          )}
        </IconButton>
        <Slider
          ml={2}
          maxW="200"
          minW={100}
          aria-label="slider-ex-4"
          colorScheme={useColorModeValue("yellow", "pink")}
          defaultValue={0.1}
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
        >
          <SliderTrack bg="gray.200">
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={4}>
            <Box color="tomato" as={MdGraphicEq} />
          </SliderThumb>
        </Slider>
      </HStack>
      <audio ref={audioRef} id="audio-player-rain">
        <source src="/music/rain.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </Box>
  );
}
