import Layout from "../components/layouts/main";
import Chakra from "../components/chakra";
import Font from "../components/font";

if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
}

function Website({ Component, pageProps, router }) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <Font />
      <Layout router={router}>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </Chakra>
  );
}

export default Website;
