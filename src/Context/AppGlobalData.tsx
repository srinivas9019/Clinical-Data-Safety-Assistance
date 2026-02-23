import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import api from "../api";
import { generateSessionId, getNewChatSessionId } from "../utility";
import { useAppToast } from "./AppGlobalToast";
import {
  updateChatSessionList,
  loadChatFromHistory,
} from "../react-redux/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../react-redux/chatStore";
import { chatHistoryListStored } from "../pages/MainChatPage/ApiResponse";

import {
  ChatMsgIOTypes,
  UserTypes,
} from "../App-Interfaces/ChatRelatedInterfaces";

interface InterfaceAddToast {
  setAppGlobalData: (data: any) => void;
  appGlobalData: any;
  getChatFromHistory: (data: any) => void;
  loadChatHistory: () => void;

  deleteChatFromHistory: (data: any) => void;
}

export const appGlobalDataContext = createContext<InterfaceAddToast | null>(
  null,
);

export const AppGlobalDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { showPageLoader, addNewToast } = useAppToast();
  const [appGlobalData, setAppGlobalData] = useState<any>(null);

  const getChatFromHistory = (chatItem: any) => {
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

        dispatch(
          loadChatFromHistory({
            chatSessionDetails: {
              currChatId: res?.data?.session?.session_id,
              currChatSessionId: generateSessionId(),
              lastQuestion: res?.data?.session?.title,
            },
            currentChatDetails: resContent,
          }),
        );
      })
      .finally(() => {
        showPageLoader({
          status: false,
          title: "",
        });
      })
      .catch(() => {});
  };

  const loadChatHistory = async () => {
    await api
      .get(
        import.meta.env.VITE_CHAT_URL +
          "/?user_id=" +
          localStorage.getItem("user_name"),
      )
      .then((res) => {
        dispatch(updateChatSessionList(res?.data.sessions));
      });
  };

  const deleteChatFromHistory = async (chatInfo: any) => {
    await api
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
        deleteChatFromHistory,
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
