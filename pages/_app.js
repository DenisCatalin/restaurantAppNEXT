import "../styles/globals.css";
import Loading from "../components/loading/loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };

    const handleLoading = () => {
      setIsLoading(true);
    };

    router.events.on("routeChangeStart", handleLoading);
    router.events.on("routeChangeError", handleComplete);
    router.events.on("routeChangeComplete", handleComplete);
    return () => {
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, [router]);

  return isLoading ? (
    <Loading />
  ) : (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
