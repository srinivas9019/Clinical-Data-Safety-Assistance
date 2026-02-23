import { useEffect, useState } from "react";
import {
  ChatMsgIOTypes,
  UserTypes,
} from "../../App-Interfaces/ChatRelatedInterfaces";

import { useAppToast } from "../../Context/AppGlobalToast";
import api from "../../api";
import { getNewChatSessionId } from "../../utility";
import { useSelector, useDispatch } from "react-redux";
import { type AppDispatch, type RootState } from "../../react-redux/chatStore";
import { chatStore } from "../../react-redux/chatStore";
import {
  clearChatSessionAtStore,
  pushToCurrentChatDetails,
  updateChatSessionDetails,
} from "../../react-redux/chatSlice";
import { useGlobalContext } from "../../Context/AppGlobalData";

const getChatDetails = () => {
  const { loadChatHistory } = useGlobalContext();

  const dispatch = useDispatch<AppDispatch>();
  let currSessionDetails = useSelector(
    (state: RootState) => state.chatReducer.chatSessionDetails,
  );
  const [enteredChat, setEnteredChat] = useState<string>(
    "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
  );

  const { addNewToast } = useAppToast();
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  useEffect(() => {
    console.log("i hit");
    dispatch(clearChatSessionAtStore());
  }, []);

  const saveMessagesViaAPI = async (enteredData: any) => {
    let configuredUrl =
      import.meta.env.VITE_CHAT_URL +
      "/" +
      chatStore.getState().chatReducer.chatSessionDetails?.currChatId +
      "/messages?user_id=" +
      localStorage.getItem("user_name");

    await api.post(configuredUrl, enteredData).catch((error) => {
      console.log(error);
    });
  };

  async function customInvokeAgent(prompt: any) {
    try {
      const response = await api.post(
        // "https://c2gu865khj.execute-api.us-east-1.amazonaws.com/cda-supervisor-invoke",
        "https://bs4bulorvmwgr5w6o3edz2awfa0ppvzm.lambda-url.us-east-1.on.aws/",
        {
          prompt,
          runtimeSessionId: currSessionDetails.currChatId || "",
          qualifier: "DEFAULT",
        },
      );
      console.log("Agent response:", response);
      return response.data;
    } catch (error: any) {
      addNewToast({
        type: "ERROR",
        content:
          error.message || "Error occurred while fetching response from agent",
      });
    }
  }

  const onUserChatEnter = async () => {
    setWaitingForResponse(true);

    dispatch(
      pushToCurrentChatDetails({
        userType: UserTypes.USER,
        content: {
          type: ChatMsgIOTypes.OUTGOING,
          message: enteredChat || "",
        },
      }),
    );

    let promptRes: any = "";

    setTimeout(async () => {
      try {
        promptRes = await customInvokeAgent(enteredChat);
        dispatch(
          pushToCurrentChatDetails({
            userType: UserTypes.ASSISTANT,
            content: {
              message: promptRes || "",
            },
          }),
        );
        console.log(promptRes?.runtimeSessionId);
        dispatch(
          updateChatSessionDetails({
            currChatId: promptRes?.runtimeSessionId,
            currChatSessionId: getNewChatSessionId(),
            lastQuestion: enteredChat,
          }),
        );

        saveMessagesViaAPI({ role: "user", content: enteredChat });
        saveMessagesViaAPI({ role: "assistant", content: promptRes });
        setTimeout(() => {
          loadChatHistory();
        }, 500);
      } catch (error: any) {
        console.log(error);
        addNewToast({
          type: "ERROR",
          content: error.message || "Error occurred while fetching RCA",
        });
      }

      setWaitingForResponse(false);
    }, 100);

    setTimeout(() => {
      setEnteredChat("");
    }, 100);
  };

  return {
    enteredChat,
    setEnteredChat,
    onUserChatEnter,
    waitingForResponse,
  };
};
export default getChatDetails;
