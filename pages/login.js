import Head from "next/head";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { magic } from "../lib/magic-client";
import Header from "../components/header/header";

const Login = () => {
  const [userMsg, setUserMsg] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, [router]);

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (email) {
      if (email.includes("@") && email.includes(".com")) {
        setUserMsg("Waiting for magic link...");

        try {
          setIsLoading(true);
          const didToken = await magic.auth.loginWithMagicLink({
            email,
          });
          if (didToken) {
            const response = await fetch("/api/login", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${didToken}`,
                "Content-type": "application/json",
              },
            });

            const loggedInResponse = await response.json();
            if (loggedInResponse.done) {
              router.push("/");
            } else {
              console.error("Something went wrong");
            }
          }
        } catch (error) {
          console.error("Something went wrong", error);
          setIsLoading(false);
        }
      } else {
        setUserMsg("Something went wrong");
        setIsLoading(false);
      }
    } else {
      setUserMsg("Enter a valid email address");
      setIsLoading(false);
    }
  };

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
    setUserMsg("");
  };

  return (
    <div className={styles.imageBG}>
      <div className={styles.container}>
        <Head>
          <title>Good Food - SignIn</title>
        </Head>
        <Header />
        <main className={styles.main}>
          <div className={styles.mainWrapper}>
            <h1 className={styles.signinHeader}>Sign In</h1>
            <input
              type="text"
              placeholder="Email address"
              className={styles.emailInput}
              onChange={handleOnChangeEmail}
            />
            {userMsg !== "" ? (
              <p className={styles.userMsg}>{userMsg}</p>
            ) : null}
            <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
              {isLoading ? "Loading..." : "Sign In"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
