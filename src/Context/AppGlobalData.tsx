import {
  createContext,
  useContext,
  
  useState,
  type ReactNode,
} from "react";
import api from "../api";
import { generateSessionId, getNewChatSessionId } from "../utility";
import { useAppToast } from "./AppGlobalToast";

import {
  ChatMsgIOTypes,
  UserTypes,
} from "../App-Interfaces/ChatRelatedInterfaces";

interface InterfaceAddToast {
  setAppGlobalData: (data: any) => void;
  appGlobalData: any;
  getChatFromHistory: (data: any) => void;
  loadChatHistory: () => void;
  createNewChatSession: (data?: any) => void;
  deleteChatFromHistory: (data: any) => void;
  clearChatSession: () => void;
}

export const appGlobalDataContext = createContext<InterfaceAddToast | null>(
  null,
);

export const AppGlobalDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { showPageLoader, addNewToast } = useAppToast();
  const [appGlobalData, setAppGlobalData] = useState<any>(null);

  const getChatFromHistory = (chatItem: any) => {
    setAppGlobalData((prevData: any) => ({
      ...prevData,
      currentChatDetails: [],
      chatSessionDetails: {
        currChatId: chatItem?.session_id,
        currChatSessionId: generateSessionId(),
        lastQuestion: "",
      },
    }));
    showPageLoader({
      status: true,
      title: "Please Wait, Loading The Chat !!",
    });
    api
      .get(
        import.meta.env.VITE_CHAT_URL +
          "/" +
          chatItem?.session_id +
          "?user_id=" +
          localStorage.getItem("user_name"),
      )
      ?.then((res) => {
        if (!res.data?.messages?.length) {
          addNewToast({
            type: "ERROR",
            content: "No History Found for this Chat!!",
          });
          return;
        }
        setAppGlobalData((prevData: any) => ({
          ...prevData,
          chatSessionDetails: {
            currChatId: res?.data?.session?.session_id,
            currChatSessionId: generateSessionId(),
            lastQuestion: res?.data?.session?.title,
          },
        }));

        let resContent: any = [];

        res.data?.messages?.map((msg: any) => {
          if (msg.role === "user") {
            resContent.push({
              userType: UserTypes.USER,
              content: {
                type: ChatMsgIOTypes.OUTGOING,
                message: msg.content || "",
              },
            });
          } else if (msg.role === "assistant") {
            resContent.push({
              userType: UserTypes.ASSISTANT,
              content: {
                message: msg.content || "",
              },
            });
          }
        });

        setAppGlobalData((prevData: any) => ({
          ...prevData,
          currentChatDetails: resContent,
        }));
      })
      .finally(() => {
        showPageLoader({
          status: false,
          title: "",
        });
      })
      .catch(() => {});
  };

  const createNewChatSession = async (updateChatTitle?: any) => {
    let newChatPayload = {
      user_id: localStorage.getItem("user_name"),
      session_id: "chat-" + getNewChatSessionId(),
      agent_id: "agent-chat",
      title: "New Chat",
    };
    // if (!updateChatTitle?.length) {
    //   showPageLoader({
    //     status: true,
    //     title: "Please Wait, Loading New Session !!",
    //   });
    // }
    if (updateChatTitle?.length) {
      newChatPayload = {
        user_id: localStorage.getItem("user_name"),
        session_id: appGlobalData?.chatSessionDetails?.currChatId,
        agent_id: "agent-chat",
        title: appGlobalData?.chatSessionDetails?.lastQuestion,
      };
    }

    let checkIsNewSession = !updateChatTitle?.length
      ? [
          {
            userType: UserTypes.USER,
            content: {
              type: ChatMsgIOTypes.INCOMING,
              message:
                "Hello! I am your Clinical Development Assistant. How can I assist you today?",
            },
          },
        ]
      : appGlobalData?.currentChatDetails;
 
    await api
      .post(import.meta.env.VITE_CHAT_URL, newChatPayload)
      .then((res) => {
        setAppGlobalData((prevData: any) => ({
          ...prevData,
          userDetails: { userId: res?.data?.session?.user_id },
          chatSessionDetails: {
            currChatId: res?.data?.session?.session_id,
            currChatSessionId: generateSessionId(),
            lastQuestion: "",
          },
          currentChatDetails: checkIsNewSession,
        }));
        setTimeout(() => {
          loadChatHistory();
        }, 250);
      })
      .finally(() => {
        showPageLoader({ status: false });
      });
  };

  const clearChatSession = () => {
    localStorage.removeItem("arn_session_id");
    setAppGlobalData((prevData: any) => ({
      ...prevData,
      chatSessionDetails: {
        currChatId: "",
        currChatSessionId: "",
        lastQuestion: "",
      },
      currentChatDetails: [
        {
          userType: UserTypes.USER,
          content: {
            type: ChatMsgIOTypes.INCOMING,
            message:
              "Hello! I am your Clinical Development Assistant. How can I assist you today?",
          },
        },
      ],
    }));
  };

  const loadChatHistory = async () => {
    api
      .get(
        import.meta.env.VITE_CHAT_URL +
          "/?user_id=" +
          localStorage.getItem("user_name"),
      )
      .then((res) => {
        setAppGlobalData((prevData: any) => ({
          ...(prevData || {}),
          chatSessionList: res?.data.sessions,
          chatSessionLoading: false,
        }));

        // if (appGlobalData?.chatSessionDetails?.currChatId === "") {
        //   setAppGlobalData((prevData: any) => ({
        //     ...(prevData || {}),
        //     chatSessionDetails: {
        //       ...(prevData?.chatSessionDetails || {}),
        //       currChatId: res?.data.sessions?.[0]?.session_id || "",
        //       currChatSessionId: res?.data.sessions?.[0]?.session_id
        //         ? generateSessionId()
        //         : "",
        //       lastQuestion: "",
        //     },
        //   }));
        // }
      });
  };

  const deleteChatFromHistory = (chatInfo: any) => {
    api
      .delete(
        import.meta.env.VITE_CHAT_URL +
          "/" +
          chatInfo?.session_id +
          "?user_id=" +
          chatInfo?.user_id,
      )
      .then(() => {
        if (
          chatInfo?.session_id === appGlobalData?.chatSessionDetails?.currChatId
        ) {
          setAppGlobalData((prevData: any) => ({
            ...prevData,
            chatSessionDetails: {
              ...(prevData?.chatSessionDetails || {}),
              currChatId: "",
              currChatSessionId: generateSessionId(),
              lastQuestion: "",
            },
          }));
        }
        setTimeout(() => {
          loadChatHistory();
        }, 250);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <appGlobalDataContext.Provider
      value={{
        setAppGlobalData,
        appGlobalData,
        getChatFromHistory,
        loadChatHistory,
        createNewChatSession,
        deleteChatFromHistory,
        clearChatSession,
      }}
    >
      {children}
    </appGlobalDataContext.Provider>
  );
};

export const useGlobalContext = () => {
  const ctx = useContext(appGlobalDataContext);
  if (!ctx) {
    throw new Error(
      "useGlobalContext must be used within a AppGlobalDataProvider",
    );
  }
  return ctx;
};
