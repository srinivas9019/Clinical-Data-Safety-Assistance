import { useEffect, useState } from "react";
import {
  ChatMsgIOTypes,
  UserTypes,
} from "../../App-Interfaces/ChatRelatedInterfaces";

import { useAppToast } from "../../Context/AppGlobalToast";
import api from "../../api";

import { useSelector, useDispatch } from "react-redux";
import { type AppDispatch, type RootState } from "../../react-redux/chatStore";
import { chatStore } from "../../react-redux/chatStore";
import {
  clearChatSessionAtStore,
  pushToCurrentChatDetails,
  updateChatSessionDetails,
  updateChatSessionLoading,
  updateChatSubmissionRunningStatus,
} from "../../react-redux/chatSlice";
import { useGlobalContext } from "../../Context/AppGlobalData";

const getChatDetails = () => {
  const { loadChatHistory } = useGlobalContext();

  const dispatch = useDispatch<AppDispatch>();
  let currSessionDetails = useSelector(
    (state: RootState) => state.chatReducer.chatSessionDetails,
  );
  const [enteredChat, setEnteredChat] = useState<string>("");

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
        import.meta.env.VITE_AGENT_ARN_SUBMIT_CHAT,
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

  const updateChatSessionItem = async (sessionId: any, title: string) => {
    dispatch(updateChatSessionLoading(true));
    await api
      .post(
        import.meta.env.VITE_CHAT_URL,
        {
          session_id: sessionId,
          agent_id: "agent-chat",
          title: title,
        },
        {
          params: {
            user_id: localStorage.getItem("user_name"),
          },
        },
      )
      .then((res: any) => {
        console.log(res);
      })
      .catch((error: any) => {
        console.log(error);
        addNewToast({
          type: "ERROR",
          content: error || "Error occurred while creating/updating session",
        });
      })
      .finally(() => {
        dispatch(updateChatSessionLoading(false));
      });
  };

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
        dispatch(updateChatSubmissionRunningStatus(true));
        promptRes = await customInvokeAgent(enteredChat);
        dispatch(updateChatSubmissionRunningStatus(false));
        if (promptRes?.runtimeSessionId?.length) {
          dispatch(
            pushToCurrentChatDetails({
              userType: UserTypes.ASSISTANT,
              content: {
                message: promptRes || "",
              },
            }),
          );
          dispatch(
            updateChatSessionDetails({
              currChatId: promptRes?.runtimeSessionId,
              lastQuestion: enteredChat,
            }),
          );
          await updateChatSessionItem(promptRes?.runtimeSessionId, enteredChat);
          await saveMessagesViaAPI({ role: "user", content: enteredChat });
          await saveMessagesViaAPI({ role: "assistant", content: promptRes });
          setTimeout(async () => {
            await loadChatHistory();
          }, 500);
        }
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
