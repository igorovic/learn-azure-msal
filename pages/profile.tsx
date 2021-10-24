import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import {
  InteractionStatus,
  InteractionType,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { loginRequest } from "app/authConfig";
import React, { useEffect, useState } from "react";
import { H6 } from "@blueprintjs/core";
import ProfileData from "components/ProfileData";
import { callMsGraph } from "app/MsGraphApiCall";
import { useRouter } from "next/router";

const ProfileContent = () => {
  const { instance, inProgress } = useMsal();
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    if (!graphData && inProgress === InteractionStatus.None) {
      callMsGraph()
        .then((response: any) => {
          console.debug("response", response);
          setGraphData(response);
        })
        .catch((e: any) => {
          if (e instanceof InteractionRequiredAuthError) {
            instance.acquireTokenRedirect({
              ...loginRequest,
              account: instance.getActiveAccount(),
            });
          }
        });
    }
  }, [inProgress, graphData, instance]);

  return <div>{graphData ? <ProfileData graphData={graphData} /> : null}</div>;
};

const ErrorComponent = ({ error }: any) => {
  return <H6>An Error Occurred: {error.errorCode}</H6>;
};

const Loading = () => {
  return <H6>Authentication in progress...</H6>;
};

export default function Profile() {
  const router = useRouter();
  //console.debug("pathname", router.pathname);
  //console.debug("query", router.query);
  const authRequest = {
    ...loginRequest,
  };

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
      errorComponent={ErrorComponent}
      loadingComponent={Loading}
    >
      <ProfileContent />
    </MsalAuthenticationTemplate>
  );
}
