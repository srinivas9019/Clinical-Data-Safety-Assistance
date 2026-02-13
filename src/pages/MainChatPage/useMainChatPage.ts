import { useEffect, useState } from "react";
import { ChatMsgIOTypes } from "../../App-Interfaces/ChatRelatedInterfaces";
import { getChatTextMsgPanel, transformResponseToChat } from "./chatComponents";
import { useAppToast } from "../../Context/AppGlobalToast";
import api from "../../api";
import { appUrls } from "../../api/config";
import { useGlobalContext } from "../../Context/AppGlobalData";
import { getPromptResult } from "../../api/bedrock-client";
import { generateSessionId } from "../../utility";
// import { ApiChatTempData } from "./ApiResponse";

const getChatDetails = () => {
  const [enteredChat, setEnteredChat] = useState<string>(
    "We're planning simultaneous FDA and EMA submissions for our cardiovascular program. Analyze regulatory requirements, identify harmonization opportunities, and recommend an optimal submission strategy",
  );
  const { setAppGlobalData, appGlobalData } = useGlobalContext();
  const { addNewToast, showPageLoader } = useAppToast();
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  useEffect(() => {
    initializeAIChat();
    showPageLoader({ status: true, title: "Loading Cognito Credentials..." });
    api.get(appUrls.COGNITO_CREDENTIALS).then((res) => {
      showPageLoader({ status: false });
      setAppGlobalData((prevData: any) => ({
        ...prevData,
        cognitoDetails: res || null,
      }));
    });
  }, []);

  const initializeAIChat = () => {
    setAppGlobalData((prevData: any) => ({
      ...prevData,
      currentChatDetails: [
        getChatTextMsgPanel({
          type: ChatMsgIOTypes.INCOMING,
          message:
            "Hello! I am your Clinical Data Safety Assistant. How can I assist you today?",
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

  const onUserChatEnter = async () => {
    setWaitingForResponse(true);

    setAppGlobalData((prevData: any) => ({
      ...prevData,
      currentChatDetails: [
        ...prevData.currentChatDetails,
        getChatTextMsgPanel({
          type: ChatMsgIOTypes.OUTGOING,
          message: enteredChat,
        }),
      ],
    }));

    let promptRes: any = "";
    try {
      promptRes = await getPromptResult(enteredChat, generateSessionId());
      saveMessagesViaAPI(enteredChat, "user");
      setTimeout(() => {
        saveMessagesViaAPI(promptRes?.result, "assistant");
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
        ...prevData.currentChatDetails,
        transformResponseToChat(promptRes?.result),
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
