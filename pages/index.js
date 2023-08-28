import { Box, Container, HStack, Flex } from "@chakra-ui/react";
import Music from "../components/music";
import Nature from "../components/nature-sound";
import Rain from "../components/rain";
import Fire from "../components/fire";

const Page = () => {
  return (
    <Container>
      <Box mt="80px" p={3} align="left">
        <Box flexGrow={1}>
          <Music />

          <Flex justifyContent="space-between">
            <HStack mt={3} spacing={[3, 3, 9]}>
              <Nature />
              <Rain />
              <Fire />
            </HStack>
          </Flex>
        </Box>
      </Box>
    </Container>
  );
};

export default Page;
