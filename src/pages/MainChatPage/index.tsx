import {
  Box,
  Container,
  Header,
  LiveRegion,
  PromptInput,
  SpaceBetween,
} from "@cloudscape-design/components";
import LoadingBar from "@cloudscape-design/chat-components/loading-bar";

import getChatDetails from "./useMainChatPage";
import { transformStateIntoComponents } from "./chatComponents";
import { useSelector } from "react-redux";
import { type RootState } from "../../react-redux/chatStore";
const MainChatPage = () => {
  const { enteredChat, setEnteredChat, onUserChatEnter, waitingForResponse } =
    getChatDetails();
  const currentChatDetails = useSelector(
    (state: RootState) => state.chatReducer.currentChatDetails,
  );

  return (
    <>
      <div data-main-chat-page-wrapper>
        <Box data-header-with-btn>
          <Header variant="h1">Clinical Development Assistant</Header>
          {/* <Button
            data-font-ember-bold
            onClick={() => {
              console.log("Download Conversation clicked");
            }}
          >
            Download Chat
          </Button> */}
        </Box>
        <Container
          data-chat-panel
          fitHeight
          footer={
            <PromptInput
              data-prompt-input-box
              onChange={({ detail }) => setEnteredChat(detail.value)}
              value={enteredChat}
              onAction={() => {
                enteredChat?.length && onUserChatEnter();
              }}
              actionButtonAriaLabel="Send message"
              actionButtonIconName="send"
              ariaLabel="Prompt input with action button"
              placeholder="Please ask a question"
              disabled={waitingForResponse}
            />
          }
        >
          <SpaceBetween size="l">
            {/* {chatDetails.map((chatDetail: any, index: number) => ( */}
            {currentChatDetails?.map((chatDetail: any, index: number) => (
              <div key={index} data-chat-bubble-wrapper>
                {transformStateIntoComponents(chatDetail)}
              </div>
            ))}
            {waitingForResponse ? (
              <LiveRegion>
                <Box
                  margin={{ bottom: "xs", left: "l" }}
                  color="text-body-secondary"
                >
                  Generating a response
                </Box>
                <LoadingBar variant="gen-ai" />
              </LiveRegion>
            ) : (
              <></>
            )}
          </SpaceBetween>
        </Container>
      </div>
    </>
  );
};
export default MainChatPage;
