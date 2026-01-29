import {
  Button,
  Icon,
  Input,
  SideNavigation,
  SpaceBetween,
} from "@cloudscape-design/components";
import "./SplitPanel.css";
import { useEffect, useState } from "react";
const AppLeftNAvPanel = () => {
  const [value, setValue] = useState("");
  const [historyList, setHistoryList] = useState([]);
  const [historyListOpen, setHistoryListOpen] = useState(true);
  useEffect(()=>{
    setHistoryList([]);
  },[])
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
                {historyList?.length ? historyList?.map((item: any) => {
                  return (
                    <div data-history-list-item>
                      <span>{item}</span>
                    </div>
                  );
                }) : <div data-history-list-item data-history-list-item-disabled>
                      <span>- No History Available -</span>
                    </div>}
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
