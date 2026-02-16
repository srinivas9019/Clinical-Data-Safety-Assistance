import {
  Button,
  Icon,
  Input,
  SideNavigation,
  SpaceBetween,
} from "@cloudscape-design/components";
import "./SplitPanel.css";
import { useEffect, useState } from "react";
import api from "../api";

import {
  generateSessionId,
  getNewChatSessionId,
  PanelLoader,
} from "../utility";
import { useGlobalContext } from "../Context/AppGlobalData";
import {
  getChatTextMsgPanel,
  transformResponseToChat,
} from "../pages/MainChatPage/chatComponents";
import { ChatMsgIOTypes } from "../App-Interfaces/ChatRelatedInterfaces";
import { useAppToast } from "../Context/AppGlobalToast";
const AppLeftNAvPanel = () => {
  const [value, setValue] = useState("");
  const [historyList, setHistoryList] = useState([]);
  const [historyChatLoading, setHistoryChatLoading] = useState(false);
  const { setAppGlobalData, appGlobalData } = useGlobalContext();
  const [historyListOpen, setHistoryListOpen] = useState(true);

  const { showPageLoader, addNewToast } = useAppToast();

  useEffect(() => {
    startNewChat();
  }, []);

  useEffect(() => {
    appGlobalData?.chatSessionDetails?.lastQuestion &&
      startNewChat(appGlobalData?.chatSessionDetails?.lastQuestion);
  }, [appGlobalData?.chatSessionDetails?.lastQuestion]);

  const getChatHistory = async () => {
    setHistoryChatLoading(true);
    api
      .get(
        import.meta.env.VITE_CHAT_URL +
          "/?user_id=" +
          localStorage.getItem("user_name"),
      )
      .then((res) => {
        setHistoryList(res?.data.sessions || []);
        setHistoryChatLoading(false);

        if (!res?.data.sessions?.length) {
          startNewChat();
          return;
        }

        if (appGlobalData?.chatSessionDetails?.currChatId === "") {
          setAppGlobalData((prevData: any) => ({
            ...(prevData || {}),
            chatSessionDetails: {
              ...(prevData?.chatSessionDetails || {}),
              currChatId: res?.data.sessions?.[0]?.session_id || "",
              currChatSessionId: res?.data.sessions?.[0]?.session_id
                ? generateSessionId()
                : "",
              lastQuestion: "",
            },
          }));
        }
      });
  };

  const getChatFromHistory = (chatItem: any) => {
    setAppGlobalData((prevData: any) => ({
      ...prevData,
      currentChatDetails: [],
    }));

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

        res.data?.messages?.map((msg: any) => {
          if (msg.role === "user") {
            setAppGlobalData((prevData: any) => ({
              ...prevData,
              currentChatDetails: [
                ...prevData.currentChatDetails,
                getChatTextMsgPanel({
                  type: ChatMsgIOTypes.OUTGOING,
                  message: msg.content || "",
                }),
              ],
            }));
          } else if (msg.role === "assistant") {
            setAppGlobalData((prevData: any) => ({
              ...prevData,
              currentChatDetails: [
                ...prevData.currentChatDetails,
                transformResponseToChat(msg.content || ""),
              ],
            }));
          }
        });
      })
      .catch(() => {});
  };

  const startNewChat = (updateChatTitle?: any) => {
    let newChatPayload = {
      user_id: localStorage.getItem("user_name"),
      session_id: "chat-" + getNewChatSessionId(),
      agent_id: "agent-chat",
      title: "New Chat",
    };
    if (!updateChatTitle?.length) {
      showPageLoader({
        status: true,
        title: "Please Wait, Loading New Session !!",
      });
    }
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
          getChatTextMsgPanel({
            type: ChatMsgIOTypes.INCOMING,
            message:
              "Hello! I am your Clinical Development Assistant. How can I assist you today?",
          }),
        ]
      : appGlobalData?.currentChatDetails;

    api
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
          getChatHistory();
        }, 250);
      })
      .finally(() => {
        showPageLoader({ status: false });
      });
  };

  const deleteChatFromHistory = (chatInfo: any) => {
    setHistoryChatLoading(true);
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
          getChatHistory();
        }, 250);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <SideNavigation
        activeHref={location.pathname}
        header={{ text: "Menu", href: "/" }}
      />
      <div data-app-nav-left-panel-main>
        <SpaceBetween size="l">
          <div data-app-left-panel-search-box>
            <SpaceBetween size="l">
              <Button
                data-add-new-chat
                data-font-ember-bold
                ariaLabel="Start New Chat"
                iconAlign="left"
                variant="primary"
                iconName="add-plus"
                onClick={() => {
                  startNewChat();
                }}
              >
                New Chat
              </Button>
              <Input
                onChange={({ detail }) => setValue(detail.value)}
                value={value}
                placeholder="Search"
                type="search"
              />
            </SpaceBetween>
          </div>
          <div data-app-left-nav-history-panel>
            {historyChatLoading ? <PanelLoader /> : <></>}
            <div
              data-app-left-nav-panel-title-container
              onClick={() => {
                setHistoryListOpen((prevVal) => !prevVal);
              }}
            >
              <span>
                <Icon
                  name={
                    historyListOpen ? "caret-down-filled" : "caret-right-filled"
                  }
                />
              </span>
              <span data-font-ember-bold data-history-title>
                History
              </span>
            </div>
            {historyListOpen ? (
              <div data-history-lest-container>
                {historyList?.length ? (
                  historyList?.map((item: any, index: number) => {
                    return (
                      <div
                        data-history-list-item
                        key={index}
                        data-history-list-item-active={
                          appGlobalData?.chatSessionDetails?.currChatId ===
                          item?.session_id
                            ? true
                            : false
                        }
                        onClick={() => {
                          getChatFromHistory(item);
                          // setAppGlobalData((prevData: any) => ({
                          //   ...prevData,
                          //   chatSessionDetails: {
                          //     ...prevData?.chatSessionDetails,
                          //     currChatId: item?.session_id,
                          //     currChatSessionId: generateSessionId(),
                          //   },
                          // }));
                        }}
                      >
                        <span
                          onClick={(event) => {
                            event.stopPropagation();
                            deleteChatFromHistory(item);
                          }}
                          data-chat-remove-icon
                          title="Delete This Chat"
                        >
                          <Icon name="remove" />
                        </span>
                        <span title={item?.title}>{item?.title}</span>
                      </div>
                    );
                  })
                ) : (
                  <div data-history-list-item data-history-list-item-disabled>
                    <span>- No History Available -</span>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </SpaceBetween>
      </div>
    </>
  );
};
export default AppLeftNAvPanel;
