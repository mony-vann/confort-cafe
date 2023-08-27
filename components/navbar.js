import Logo from "./logo";
import {
  useColorModeValue,
  Container,
  Box,
  Heading,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import ThemeToggleButton from "./theme-toggle-button";
import CurrentHour from "./current-hour";
import styled from "@emotion/styled";

const LogoBox = styled.span`
  font-weight: bold;
  font-family: 'M PLUS Rounded 1c";
  display: inline-flex;
  align-items: center;
  line-height: 0px;
  padding: 5px;

  > svg {
    transition: 200ms ease;
  }

  &:hover > svg {
    transform: rotate(20deg);
  }
`;

const Navbar = (props) => {
  // const { path } = props;
  const fontSize = useBreakpointValue({ base: "20px", md: "20px", sm: "20px" });

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue("#b08b84", "#542947")}
      css={{ backdropFilter: "blur(10px)" }}
      zIndex={2}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"tight"}>
            <Logo />
          </Heading>
        </Flex>
        <Box flex={1} align="right" mr={10} fontSize={fontSize}>
          <LogoBox>
            <CurrentHour />
          </LogoBox>
        </Box>
        <Box align="right" mt={2}>
          <ThemeToggleButton />
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
