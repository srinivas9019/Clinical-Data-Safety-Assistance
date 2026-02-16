import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Button, Box } from "@cloudscape-design/components";
import AWSLogo from "../assets/icons/aws-logo.svg";
import { useAppToast } from "../Context/AppGlobalToast";
import api from "../api";
import { appUrls } from "../api/config";
import { useGlobalContext } from "../Context/AppGlobalData";

export default function Login() {
  const navigate = useNavigate();
  const { showPageLoader } = useAppToast();
  const { setAppGlobalData } = useGlobalContext();

  const { user, signInWithSSO, isLoading } = useAuth();
  const [signingInWith, setSigningInWith] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    showPageLoader({ status: true, title: "Loading Cognito Credentials..." });
    api
      .get(appUrls.COGNITO_CREDENTIALS)
      .then((res) => {
        showPageLoader({ status: false });
        setAppGlobalData((prevData: any) => ({
          ...prevData,
          cognitoDetails: res.data || null,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSSOLogin = async () => {
    setSigningInWith("azure");
    await signInWithSSO("microsoft");
  };

  return (
    <Box data-login-container textAlign="center" padding={"l"}>
      <img src={AWSLogo} />
      <Box padding={"l"} fontSize="heading-xl" fontWeight="bold">
        Welcome to GTN Forecasting & Analysis System
      </Box>
      <Box margin={{ top: "l" }}>
        <Button
          onClick={() => {
            handleSSOLogin();
          }}
          disabled={isLoading}
          data-font-ember-bold
        >
          {signingInWith === "azure" ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Authenticating...
            </span>
          ) : (
            "Login To Proceed"
          )}
        </Button>
      </Box>
    </Box>
  );
}
