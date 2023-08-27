import { Box, Container, HStack } from "@chakra-ui/react";
import Music from "../components/music";
import Nature from "../components/nature-sound";
import Rain from "../components/rain";

const Page = () => {
  return (
    <Container>
      <Box mt="80px" p={3} align="left">
        <Box flexGrow={1}>
          <Music />
          <HStack spacing={7}>
            <Nature />
            <Rain />
          </HStack>
        </Box>
      </Box>
    </Container>
  );
};

export default Page;
