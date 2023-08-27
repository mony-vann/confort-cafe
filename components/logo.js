import Link from "next/link";
import Image from "next/image";
import { useColorModeValue, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 20px;
  display: inline-flex;
  align-items: center;
  height: 40px;
  line-height: 20px;
  padding: 10px;

  > svg {
    transition: 200ms ease;
  }

  &:hover > svg {
    transform: rotate(20deg);
  }
`;

const Logo = () => {
  const logo = `/images/logi-logo.png`;

  return (
    <Link href="/" scroll={false}>
      <LogoBox>
        <Image src={logo} width={50} height={10} alt="logo"></Image>
        <Text ml={3}> </Text>
        <Text color={useColorModeValue("gray.800", "whiteAlpha.900")} mt={2}>
          Comfort喫茶
        </Text>
      </LogoBox>
    </Link>
  );
};

export default Logo;
