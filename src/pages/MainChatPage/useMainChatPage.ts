import { useEffect, useState } from "react";
import { ChatMsgIOTypes } from "../../App-Interfaces/ChatRelatedInterfaces";
import { getChatTextMsgPanel, transformResponseToChat } from "./chatComponents";
import { getPromptResult } from "../../api/bedrock-client";
import { useAppToast } from "../../Context/AppGlobalToast";
import { ApiChatTempData } from "./ApiResponse";

const getChatDetails = () => {
  const [chatDetails, setChatDetails] = useState<any>([]);
  const [enteredChat, setEnteredChat] = useState<string>(
    "Show adverse events reported for metformin, especially nausea and high blood sugar.",
  );
  const { addNewToast } = useAppToast();
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  useEffect(() => {
    setChatDetails([
      getChatTextMsgPanel({
        type: ChatMsgIOTypes.INCOMING,
        message:
          "Hello! I am your Clinical Data Safety Assistant. How can I assist you today?",
      }),
    ]);
  }, []);

  const onUserChatEnter = async () => {
    setWaitingForResponse(true);
    setChatDetails((prevChatDetails: any) => [
      ...prevChatDetails,
      getChatTextMsgPanel({
        type: ChatMsgIOTypes.OUTGOING,
        message: enteredChat,
      }),
    ]);
    let promptRes: any = "";
    try {
      promptRes = await getPromptResult(enteredChat);
    } catch (error: any) {
      console.log(error);
      addNewToast({
        type: "ERROR",
        content: error.message || "Error occurred while fetching RCA",
      });
    }
    console.log(promptRes.result);
    setChatDetails((prevChatDetails: any) => [
      ...prevChatDetails,
      // transformResponseToChat(ApiChatTempData),
      transformResponseToChat(promptRes.result),
    ]);
    setWaitingForResponse(false);
    setEnteredChat("");
  };

  return {
    chatDetails,
    enteredChat,
    setEnteredChat,
    onUserChatEnter,
    waitingForResponse,
  };
};
export default getChatDetails;
