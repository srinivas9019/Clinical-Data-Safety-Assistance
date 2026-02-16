import { useEffect, useState } from "react";
import { ChatMsgIOTypes } from "../../App-Interfaces/ChatRelatedInterfaces";
import { getChatTextMsgPanel, transformResponseToChat } from "./chatComponents";
import { useAppToast } from "../../Context/AppGlobalToast";
import api from "../../api";
import { appUrls } from "../../api/config";
import { useGlobalContext } from "../../Context/AppGlobalData";

// import { ApiChatTempData } from "./ApiResponse";

const getChatDetails = () => {
  const [enteredChat, setEnteredChat] = useState<string>(
    "We're planning simultaneous FDA and EMA submissions for our cardiovascular program. Analyze regulatory requirements, identify harmonization opportunities, and recommend an optimal submission strategy",
  );
  const { setAppGlobalData, appGlobalData } = useGlobalContext();
  const { addNewToast } = useAppToast();
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  useEffect(() => {
    initializeAIChat();
  }, []);

  const initializeAIChat = () => {
    setAppGlobalData((prevData: any) => ({
      ...prevData,
      currentChatDetails: [
        getChatTextMsgPanel({
          type: ChatMsgIOTypes.INCOMING,
          message:
            "Hello! I am your Clinical Development Assistant. How can I assist you today?",
        }),
      ],
    }));
  };

  const saveMessagesViaAPI = (enteredData: any, userType: any) => {
    let configuredUrl =
      appUrls.SAVE_MESSAGE +
      appGlobalData?.chatSessionDetails?.currChatId +
      "/messages?user_id=" +
      appGlobalData?.userDetails?.userId;

    api
      .post(configuredUrl, { role: userType, content: enteredData })
      .catch((error) => {
        console.log(error);
      });
  };

  async function customInvokeAgent(prompt: any, jwtToken: string) {
    // Your agent ARN

    const arn = import.meta.env.VITE_API_CHAT_URL;

    // Build the correct URL
    const url = `https://bedrock-agentcore.us-east-1.amazonaws.com/runtimes/${encodeURIComponent(
      arn,
    )}/invocations`;

    const body = {
      prompt,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      addNewToast({
        type: "ERROR",
        content: `Error invoking agent: ${response.status} ${text}`,
      });
      throw new Error(`Error invoking agent: ${response.status} ${text}`);
    }

    return await response.json();
  }

  const onUserChatEnter = async () => {
    setWaitingForResponse(true);

    setAppGlobalData((prevData: any) => {
      return {
        ...prevData,
        currentChatDetails: [
          ...(prevData?.currentChatDetails || {}),
          getChatTextMsgPanel({
            type: ChatMsgIOTypes.OUTGOING,
            message: enteredChat,
          }),
        ],
      };
    });

    let promptRes: any = "";
    try {
      // promptRes = await getPromptResult(enteredChat, generateSessionId());
      promptRes = await customInvokeAgent(
        enteredChat,
        localStorage.getItem("access_token") || "",
      );

      console.log("Agent Response:", promptRes);

      setAppGlobalData((prevData: any) => ({
        ...prevData,
        chatSessionDetails: {
          ...(prevData?.chatSessionDetails || {}),
          lastQuestion: enteredChat,
        },
      }));

      saveMessagesViaAPI(enteredChat, "user");
      setTimeout(() => {
        saveMessagesViaAPI(promptRes, "assistant");
      }, 200);
    } catch (error: any) {
      console.log(error);
      addNewToast({
        type: "ERROR",
        content: error.message || "Error occurred while fetching RCA",
      });
    }

    setAppGlobalData((prevData: any) => ({
      ...prevData,
      currentChatDetails: [
        ...(prevData?.currentChatDetails || {}),
        transformResponseToChat(promptRes),
        // transformResponseToChat(ApiChatTempData),
      ],
    }));
    setTimeout(() => {
      setWaitingForResponse(false);
      setEnteredChat("");
    }, 500);
  };

  return {
    appGlobalData,
    enteredChat,
    setEnteredChat,
    onUserChatEnter,
    waitingForResponse,
  };
};
export default getChatDetails;
