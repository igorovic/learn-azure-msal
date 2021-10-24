import type { Configuration, RedirectRequest } from "@azure/msal-browser";
import { LogLevel } from "@azure/msal-common";
export const msalConfig: Configuration = {
  auth: {
    clientId: String(process.env.NEXT_PUBLIC_AZURE_CLIENT_ID),
    authority: `https://${process.env.NEXT_PUBLIC_TENANT_NAME}.b2clogin.com/${process.env.NEXT_PUBLIC_TENANT_NAME}.onmicrosoft.com/${process.env.NEXT_PUBLIC_USER_FLOW}`,
    knownAuthorities: [`${process.env.NEXT_PUBLIC_TENANT_NAME}.b2clogin.com`],
    redirectUri: "http://localhost:3000/",
    postLogoutRedirectUri: "http://localhost:3000",
    //protocolMode: ProtocolMode.OIDC,
  },
  // Uncomment the block below for detailed logs
  /* system: {
    loggerOptions: {
      loggerCallback: (level: any, message: string) => {
        console.log(level, message);
      },
      logLevel: LogLevel.Trace,
    },
  }, */
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: RedirectRequest = {
  //scopes: ["User.Read"],
  //prompt: "create",
  scopes: ["openid", "https://graph.microsoft.com/User.Read"],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  //graphMeEndpoint: "https://graph.microsoft-ppe.com/v1.0/me",
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
