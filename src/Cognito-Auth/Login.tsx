import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Button, Box } from "@cloudscape-design/components";
import AWSLogo from "../assets/icons/aws-logo.svg";

export default function Login() {
  const navigate = useNavigate();
  

  const { user, signInWithSSO, isLoading } = useAuth();
  const [signingInWith, setSigningInWith] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);


  const handleSSOLogin = async () => {
    setSigningInWith("azure");
    await signInWithSSO("microsoft");
  };

  return (
    <Box data-login-container textAlign="center" padding={"l"}>
      <img src={AWSLogo} />
      <Box padding={"l"} fontSize="heading-xl" fontWeight="bold">
        Welcome to Clinical Development Assistant
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
