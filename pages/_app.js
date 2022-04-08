import "../styles/globals.css";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import Loading from "../components/loading/loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const store = useStore(pageProps.initialReduxState);
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
