import {
  Button,
  Icon,
  Input,
  SideNavigation,
  SpaceBetween,
} from "@cloudscape-design/components";
import "./SplitPanel.css";
import { useEffect, useState } from "react";

import { PanelLoader } from "../utility";
import { useGlobalContext } from "../Context/AppGlobalData";
import {
  ChatMsgIOTypes,
  UserTypes,
} from "../App-Interfaces/ChatRelatedInterfaces";

const AppLeftNAvPanel = () => {
  const [value, setValue] = useState("");

  const {
    setAppGlobalData,
    appGlobalData,
    getChatFromHistory,
    createNewChatSession,
    deleteChatFromHistory,
    loadChatHistory,
    clearChatSession,
  } = useGlobalContext();
  const [historyListOpen, setHistoryListOpen] = useState(true);

  useEffect(() => {
    appGlobalData?.chatSessionDetails?.lastQuestion &&
      createNewChatSession(appGlobalData?.chatSessionDetails?.lastQuestion);
  }, [appGlobalData?.chatSessionDetails?.lastQuestion]);

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {}, [value]);

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
                  clearChatSession();
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
            {appGlobalData?.chatSessionLoading ? <PanelLoader /> : <></>}
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
                {appGlobalData?.chatSessionList?.length ? (
                  appGlobalData?.chatSessionList
                    ?.filter((item: any) => {
                      return item?.title
                        ?.toLowerCase()
                        ?.includes(value?.toLowerCase());
                    })
                    ?.map((item: any, index: number) => {
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
