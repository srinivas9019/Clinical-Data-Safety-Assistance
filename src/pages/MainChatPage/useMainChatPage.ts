import { useEffect, useState } from "react";
import {
  ChatMsgIOTypes,
  UserTypes,
} from "../../App-Interfaces/ChatRelatedInterfaces";

import { useAppToast } from "../../Context/AppGlobalToast";
import api from "../../api";
import { useGlobalContext } from "../../Context/AppGlobalData";
import { generateSessionId, getNewChatSessionId } from "../../utility";
// import { useSelector, useDispatch } from "react-redux";
// import { type AppDispatch, type RootState } from "../../react-redux/chatStore";
// import { fetchUser } from "../../react-redux/chatSlice";
// import { updateName, updateAge } from "../../react-redux/chatSlice";

// import { ApiChatTempData } from "./ApiResponse";

const getChatDetails = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const profile = useSelector((state: RootState) => state.user.profile);
  // dispatch(updateName("Alice"));
  // dispatch(updateAge(25));

  const [enteredChat, setEnteredChat] = useState<string>(
    "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
  );

  // console.log("Updated store state:", profile); // may show old value until re-render console.log("Direct store access:", store.getState().user.profile);

  const { setAppGlobalData, appGlobalData, clearChatSession } =
    useGlobalContext();
  const { addNewToast } = useAppToast();
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  useEffect(() => {
    clearChatSession();
  }, []);

  const saveMessagesViaAPI = (enteredData: any, oChatSessionId: any) => {
    let configuredUrl =
      import.meta.env.VITE_CHAT_URL +
      "/" +
      oChatSessionId +
      "/messages?user_id=" +
      localStorage.getItem("user_name");

    api.post(configuredUrl, enteredData).catch((error) => {
      console.log(error);
    });
  };

  // async function customInvokeAgent(prompt: any, jwtToken: string) {
  //   // Your agent ARN
  //   let arnSessionId = localStorage.getItem("arn_session_id")?.toString();
  //   const arn = import.meta.env.VITE_AGENT_ARN;

  //   // Build the correct URL
  //   const url = `https://bedrock-agentcore.us-east-1.amazonaws.com/runtimes/${encodeURIComponent(
  //     arn,
  //   )}/invocations`;

  //   const body = {
  //     prompt,
  //   };

  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${jwtToken}`,
  //       "x-amzn-bedrock-agentcore-runtime-session-id": arnSessionId || "",
  //     },

  //     body: JSON.stringify(body),
  //   });

  //   if (!response.ok) {
  //     const text = await response.text();
  //     addNewToast({
  //       type: "ERROR",
  //       content: `Error invoking agent: ${response.status} ${text}`,
  //     });
  //     throw new Error(`Error invoking agent: ${response.status} ${text}`);
  //   }

  //   return await response.json();
  // }

  async function customInvokeAgent(prompt: any, jwtToken: string) {
    // Your agent ARN
    const arnSessionId = localStorage.getItem("arn_session_id")?.toString();
    const arn = import.meta.env.VITE_AGENT_ARN;

    // Build the correct URL
    const url = `https://bedrock-agentcore.us-east-1.amazonaws.com/runtimes/${encodeURIComponent(
      arn,
    )}/invocations`;

    let payload = {
      prompt,
      // runtimeSessionId: arnSessionId,
    };

    const params: Record<string, string> = {};
    params.qualifier = "DEFAULT";

    try {
      const response = await api.post(
        "https://c2gu865khj.execute-api.us-east-1.amazonaws.com/cda-supervisor-invoke",
        payload, // Axios automatically stringifies JSON
        // {
          // headers: {
          //   "Content-Type": "application/json",
            // Authorization: `Bearer ${jwtToken}`,
            // ...(arnSessionId && {
            //   "x-amzn-bedrock-agentcore-runtime-session-id": arnSessionId,
            // }),
          // },
          // params,
        // },
      );
      console.log("Agent response:", response);
      return response.data;
    } catch (error: any) {
      const status = error.response?.status;
      const text = error.response?.data || error.message;

      addNewToast({
        type: "ERROR",
        content: `Error invoking agent: ${status ?? ""} ${text}`,
      });

      throw new Error(`Error invoking agent: ${status ?? ""} ${text}`);
    }
  }

  const checkForSessionIdAndProceed = async () => {
    setWaitingForResponse(true);
    setAppGlobalData((prevData: any) => ({
      ...prevData,
      currentChatDetails: [
        ...(prevData?.currentChatDetails || {}),
        {
          userType: UserTypes.USER,
          content: {
            type: ChatMsgIOTypes.OUTGOING,
            message: enteredChat || "",
          },
        },
      ],
    }));

    let newChatSessionId =
      appGlobalData?.chatSessionDetails?.currChatId ||
      "chat-" + getNewChatSessionId();

    let arnSessionId = generateSessionId();

    if (!appGlobalData?.chatSessionDetails?.currChatId) {
      let newChatPayload = {
        user_id: localStorage.getItem("user_name"),
        session_id: newChatSessionId,
        agent_id: "agent-chat",
        title: "New Chat",
      };

      //this api is for creating session-ids
      api.post(import.meta.env.VITE_CHAT_URL, newChatPayload).then((res) => {
        localStorage.setItem("arn_session_id", arnSessionId);
        setAppGlobalData((prevData: any) => {
          return {
            ...prevData,
            userDetails: { userId: res?.data?.session?.user_id },
            chatSessionDetails: {
              currChatId: res?.data?.session?.session_id,
              currChatSessionId: arnSessionId,
              lastQuestion: enteredChat,
            },
          };
        });
        setTimeout(() => {
          onUserChatEnter(newChatSessionId);
        }, 250);
      });
    } else {
      if (!localStorage.getItem("user_name")) {
        localStorage.setItem("arn_session_id", arnSessionId);
      }
      onUserChatEnter(newChatSessionId);
    }
  };

  const onUserChatEnter = async (newChatSessionId: any) => {
    setWaitingForResponse(true);
    let promptRes: any = "";
    console.log(JSON.stringify(appGlobalData?.chatSessionDetails));

    setTimeout(async () => {
      try {
        promptRes = await customInvokeAgent(
          enteredChat,
          localStorage.getItem("access_token") || "",
        );

        console.log(appGlobalData);

        setAppGlobalData((prevData: any) => ({
          ...prevData,
          currentChatDetails: [
            ...(prevData?.currentChatDetails || {}),
            {
              userType: UserTypes.ASSISTANT,
              content: {
                message: promptRes || "",
              },
            },
            // transformResponseToChat(ApiChatTempData),
          ],
        }));

        saveMessagesViaAPI(
          { role: "assistant", content: promptRes },
          newChatSessionId,
        );

        setTimeout(() => {
          saveMessagesViaAPI(
            { role: "user", content: enteredChat },
            newChatSessionId,
          );
        }, 250);
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
    appGlobalData,
    enteredChat,
    setEnteredChat,
    checkForSessionIdAndProceed,
    waitingForResponse,
  };
};
export default getChatDetails;
