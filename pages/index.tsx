import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@blueprintjs/core";
import styles from "../styles/Home.module.css";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { useRouter } from "next/router";
import type { IPublicClientApplication } from "@azure/msal-browser";

function signOutClickHandler(instance: IPublicClientApplication) {
  const logoutRequest = {
    account: instance.getAccountByHomeId(
      instance.getActiveAccount()?.homeAccountId || ""
    ),
    postLogoutRedirectUri: "http://localhost:3000",
  };
  instance.logoutRedirect(logoutRequest);
}

// SignOutButton Component returns a button that invokes a redirect logout when clicked
function SignOutButton() {
  // useMsal hook will return the PublicClientApplication instance you provided to MsalProvider
  const { instance } = useMsal();

  return (
    <button onClick={() => signOutClickHandler(instance)}>Sign Out</button>
  );
}

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>learn azrue msal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <SignOutButton />
        <AuthenticatedTemplate>
          <Link href="/profile">
            <Button color="primary">Request Profile Information</Button>
          </Link>
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <p>Please sign-in to see your profile information.</p>
        </UnauthenticatedTemplate>
      </main>
    </div>
  );
};

export default Home;
