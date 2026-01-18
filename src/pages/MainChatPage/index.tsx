import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Header,
  PromptInput,
  SpaceBetween,
  StatusIndicator,
} from "@cloudscape-design/components";

import getChatDetails from "./useMainChatPage";
import { getChatMsgBasedOnType } from "./chatComponents";
const MainChatPage = () => {
  const { chatDetails, enteredChat, setEnteredChat, onUserChatEnter } =
    getChatDetails();

  return (
    <>
      <div data-main-chat-page-wrapper>
        <Box data-header-with-btn>
          <Header variant="h1">Clinical Data Safety Assistance</Header>
          <Button
            data-font-ember-bold
            onClick={() => {
              console.log("Download Conversation clicked");
            }}
          >
            Download Chat
          </Button>
        </Box>
        <Container
          data-chat-panel
          fitHeight
          footer={
            <PromptInput
              onChange={({ detail }) => setEnteredChat(detail.value)}
              value={enteredChat}
              onAction={() => {
                enteredChat?.length && onUserChatEnter();
              }}
              actionButtonAriaLabel="Send message"
              actionButtonIconName="send"
              ariaLabel="Prompt input with action button"
              placeholder="Please ask a question"
            />
          }
        >
          {chatDetails.map((chatDetail: any, index: number) => (
            <div key={index} data-chat-bubble-wrapper>
              {getChatMsgBasedOnType(chatDetail)}
            </div>
          ))}
        </Container>
      </div>
    </>
  );
};
export default MainChatPage;
