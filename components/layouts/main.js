import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "../navbar.js";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import VoxelDogLoader from "../voxel-cafe-loader";
import Footer from "../footer.js";

const LazyVoxelDog = dynamic(() => import("../voxel-cafe"), {
  ssr: false,
  loading: () => <VoxelDogLoader />,
});

const Main = ({ children }) => {
  const router = useRouter();
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="小さなカフェ" />
        <meta name="author" content="monyvann" />
        <meta name="author" content="monyvann" />
        <title>Comfort喫茶</title>
      </Head>

      <Navbar path={router.asPath}></Navbar>

      <Container maxW="container.md" pt={15}>
        <Box mt={20}>
          <LazyVoxelDog />
        </Box>

        {children}
        <Footer />
      </Container>
    </Box>
  );
};

export default Main;
