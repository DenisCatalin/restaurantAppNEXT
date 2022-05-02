import Head from "next/head";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { magic } from "../lib/magic-client";
import Header from "../components/header/header";
import { motion } from "framer-motion";
import { useLogin } from "../utils/useFetch";

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
            const res = await fetch("/api/login", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${didToken}`,
                "Content-type": "application/json",
              },
            });
            const loggedInResponse = await res.json();
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
        <motion.main className={styles.main} animate={{ scale: [0, 1] }}>
          <motion.h1
            className={styles.signinHeader}
            animate={{ opacity: [0, 1] }}
            transition={{ delay: 0.5 }}
          >
            SIGN IN
          </motion.h1>
          <div className={styles.inputWrapper}>
            <motion.h4
              className={styles.signinHeader}
              animate={{ opacity: [0, 1] }}
              transition={{ delay: 0.7 }}
            >
              Email
            </motion.h4>
            <motion.input
              type="text"
              className={styles.emailInput}
              onChange={handleOnChangeEmail}
              animate={{ opacity: [0, 1] }}
              transition={{ delay: 0.9 }}
            />
          </div>
          {userMsg !== "" ? <p className={styles.userMsg}>{userMsg}</p> : null}
          <motion.button
            onClick={handleLoginWithEmail}
            className={styles.loginBtn}
            whileHover={{ rotate: [0, -5, 5, 0] }}
            animate={{ scale: isLoading ? 0 : 1 }}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </motion.button>
        </motion.main>
      </div>
    </div>
  );
};

export default Login;
