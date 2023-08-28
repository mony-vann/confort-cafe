import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "../navbar.js";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import VoxelDogLoader from "../voxel-cafe-loader";
import Footer from "../footer.js";
import { Analytics } from "@vercel/analytics/react";

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
        <meta name="description" content="Comfort喫茶" />
        <meta name="author" content="monyvann" />
        <meta name="author" content="monyvann" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <title>Comfort喫茶</title>
      </Head>

      <Navbar path={router.asPath}></Navbar>

      <Container maxW="container.md" pt={15}>
        <Box mt={20}>
          <LazyVoxelDog />
        </Box>

        {children}
        <Footer />
        <Analytics />
      </Container>
    </Box>
  );
};

export default Main;
