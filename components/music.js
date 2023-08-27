import { useEffect, useState } from "react";
import {
  useColorModeValue,
  IconButton,
  Box,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  MdGraphicEq,
} from "@chakra-ui/react";
import Image from "next/image";
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

const AudioPlayer = ({ tracks }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const currentTrack = tracks[currentTrackIndex];
  const [volume, setVolume] = useState(0.5); // Initial volume

  const handlePlayNext = () => {
    console.log(isPlaying);
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIndex);

    const audioElement = document.getElementById("audio-player");
    audioElement.play(); // Auto play the next track
    setIsPlaying(true);
  };

  const handleTrackEnded = () => {
    handlePlayNext();
  };

  const handleVolumeChange = (newVolume) => {
    const audioElement = document.getElementById("audio-player");
    const newVol = parseFloat(newVolume);
    audioElement.volume = newVol;
    setVolume(newVol);
  };

  const togglePauseAndPlay = () => {
    const audioElement = document.getElementById("audio-player");
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audioElement = document.getElementById("audio-player");
    audioElement.addEventListener("ended", handleTrackEnded);
    audioElement.volume = volume; // Set initial volume
    // setIsPlaying(true); // Start playing the first track
    audioElement.play(); // Auto play the first track

    return () => {
      audioElement.removeEventListener("ended", handleTrackEnded);
    };
  }, [currentTrackIndex, volume]);
  return (
    <Box align="left" mt={16}>
      <IconButton
        aria-label="Toggle theme"
        colorScheme={useColorModeValue("yellow", "pink")}
        onClick={togglePauseAndPlay}
      >
        {isPlaying ? (
          <Image
            src={`/images/pause.png`}
            width={12}
            height={10}
            alt="logo"
          ></Image>
        ) : (
          <Image
            src={`/images/play.png`}
            width={12}
            height={10}
            alt="logo"
          ></Image>
        )}
      </IconButton>
      <LogoBox>
        <Text fontFamily='M PLUS Rounded 1c", sans-serif' fontWeight="bold">
          Now playing : {currentTrack.slice(0, -4)}
        </Text>
      </LogoBox>
      <p></p>
      <Flex>
        <IconButton
          aria-label="Toggle theme"
          colorScheme={useColorModeValue("yellow", "pink")}
          onClick={handlePlayNext}
          mt={2}
        >
          <Image
            src={`/images/next.png`}
            width={12}
            height={10}
            alt="logo"
          ></Image>
        </IconButton>
        <Slider
          ml={3}
          mr={5}
          mt={2}
          maxW={285}
          aria-label="slider-ex-4"
          colorScheme={useColorModeValue("yellow", "pink")}
          defaultValue={0.5}
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
      </Flex>
      <audio id="audio-player" src={`/music/${currentTrack}`} />
    </Box>
  );
};

const tracks = [
  "bert - coastline.mp3",
  "doolie x dao - sincere.mp3",
  "hikari - idyllic delight.mp3",
  "lakey - me2.mp3",
  "lofi fruit - chilling tokyo.mp3",
  "lofi fruit - heat wave.mp3",
  "lofi fruit - i'm yours.mp3",
  "lofi fruit - yellow.mp3",
  "r6 postmatch lofi.mp3",
  "mix up lofi.mp3",
]; // List your track filenames here

export default function Home() {
  return (
    <Box>
      <AudioPlayer tracks={tracks}></AudioPlayer>
    </Box>
  );
}
