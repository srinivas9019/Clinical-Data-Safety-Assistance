import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { exchangeCognitoToken } from "./SSOService";
import { Box } from "@cloudscape-design/components";
import type { User } from "./Model";
import { PanelLoader } from "../components/PanelLoader";
import { useAppToast } from "../Context/AppGlobalToast";


const SsoLogin = () => {
  const [searchParams] = useSearchParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const { addNewToast } = useAppToast();

  React.useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      auth.setError("SSO Login failed: No code Received from provider");
      auth.setIsLoading(false);
      return;
    }
    exchangeToken(code);
  }, [searchParams]);

  const exchangeToken = async (code: string) => {
    auth.setIsLoading(true);
    try {
      const result = await exchangeCognitoToken(code);
      if (result) {
        const { user, tokens } = result;

        /** Set tokens in localstorage */
        localStorage.setItem("access_token", tokens.access_token);
        localStorage.setItem("id_token", tokens.id_token);
        localStorage.setItem("refresh_token", tokens.refresh_token);

        /** Set user info in localstorage */
        const auth_user: User = {
          id: user.email,
          email: user.email,
          name: `${user.given_name} ${user.family_name}`,
          username: user.username || "",
          provider: "",
          organization: "",
        };
        localStorage.setItem("auth_user", JSON.stringify(auth_user));
        localStorage.setItem("user_name", user.email)

        /** Update AuthContext so ProtectedRoute recognizes the user */
        auth.setUser(auth_user);

        auth.setIsLoading(false);

        navigate("/");
        addNewToast({
          type: "SUCCESS",
          content: "Logged-In Successfully.",
        });
      }
    } catch (error: any) {
      auth.setError("SSO Login failed: " + error.message);
      auth.setIsLoading(false);
    }
  };

  return (
    <Box textAlign="center" data-gtn-connecting-text>
      <PanelLoader title="Connecting to Clinical Development Assistant..." />
      
    </Box>
  );
};

export default SsoLogin;
