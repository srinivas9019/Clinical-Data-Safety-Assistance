import { useEffect, useState } from "react";
import { ChatMsgIOTypes } from "../../App-Interfaces/ChatRelatedInterfaces";
import { getChatTextMsgPanel, transformResponseToChat } from "./chatComponents";
import { getPromptResult } from "../../api/bedrock-client";
import { useAppToast } from "../../Context/AppGlobalToast";
const getChatDetails = () => {
  const [chatDetails, setChatDetails] = useState<any>([]);
  const [enteredChat, setEnteredChat] = useState<string>(
    "Show adverse events reported for metformin, especially nausea and high blood sugar.",
  );
  const { addNewToast } = useAppToast();
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  useEffect(() => {
    setChatDetails([
      getChatTextMsgPanel({
        type: ChatMsgIOTypes.INCOMING,
        message:
          "Hello! I am your Clinical Data Safety Assistant. How can I assist you today?",
      }),
      // {
      //   type: ChatMsgPanelTypes.CONTAINER_PANEL,
      //   title: "",
      //   items: [
      //     {
      //       type: ChatMsgPanelTypes.SPACE_BETWEEN,
      //       items: [
      //         {
      //           type: ChatMsgPanelTypes.SUMMARY,
      //           description:
      //             "The clinical trial report provides a comprehensive overview of the study's objectives, methodology, results, and conclusions. It includes detailed information on patient demographics, treatment protocols, efficacy outcomes, and safety assessments. The report highlights key findings, statistical analyses, and any adverse events observed during the trial. Overall, the report serves as a critical document for regulatory submissions and informs future research directions in the field. The clinical trial report provides a comprehensive overview of the study's objectives, methodology, results, and conclusions. It includes detailed information on patient demographics, treatment protocols, efficacy outcomes, and safety assessments. The report highlights key findings, statistical analyses, and any adverse events observed during the trial. Overall, the report serves as a critical document for regulatory submissions and informs future research directions in the field. The clinical trial report provides a comprehensive overview of the study's objectives, methodology, results, and conclusions. It includes detailed information on patient demographics, treatment protocols, efficacy outcomes, and safety assessments. The report highlights key findings, statistical analyses, and any adverse events observed during the trial. Overall, the report serves as a critical document for regulatory submissions and informs future research directions in the field. The clinical trial report provides a comprehensive overview of the study's objectives, methodology, results, and conclusions. It includes detailed information on patient demographics, treatment protocols, efficacy outcomes, and safety assessments. The report highlights key findings, statistical analyses, and any adverse events observed during the trial. Overall, the report serves as a critical document for regulatory submissions and informs future research directions in the field. ",
      //         },
      //         {
      //           type: ChatMsgPanelTypes.KPIS,
      //           cardsList: [
      //             {
      //               title: "abcd",
      //               value: "12345.324",
      //               type: ChatMsgPanelTypes.VALUE_CURRENCY,
      //             },
      //             {
      //               title: "abcd",
      //               value: "12345.324",
      //               type: ChatMsgPanelTypes.VALUE_PERCENT,
      //             },
      //             {
      //               title: "abcd",
      //               value: "12345.324",
      //               type: ChatMsgPanelTypes.VALUE_CURRENCY,
      //             },
      //             {
      //               title: "abcd",
      //               value: "12345.324",
      //               type: ChatMsgPanelTypes.VALUE_PERCENT,
      //             },
      //           ],
      //         },
      //         {
      //           type: ChatMsgPanelTypes.GRID_PANEL,
      //           showItemCount: 2,
      //           items: [
      //             {
      //               type: ChatMsgPanelTypes.BAR_CHART,
      //               title: "New bar chart 1",
      //             },
      //             {
      //               type: ChatMsgPanelTypes.BAR_CHART,
      //               title: "New bar chart 2",
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // },
    ]);
  }, []);

  const onUserChatEnter = async () => {
    setWaitingForResponse(true);
    setChatDetails((prevChatDetails: any) => [
      ...prevChatDetails,
      getChatTextMsgPanel({
        type: ChatMsgIOTypes.OUTGOING,
        message: enteredChat,
      }),
    ]);
    let promptRes: any = "";
    try {
      promptRes = await getPromptResult(enteredChat);
    } catch (error: any) {
      addNewToast({
        type: "ERROR",
        content: error.message || "Error occurred while fetching RCA",
      });
    }

    setChatDetails((prevChatDetails: any) => [
      ...prevChatDetails,
      transformResponseToChat(promptRes?.result),
    ]);
    setWaitingForResponse(false);
    setEnteredChat("");
  };

  return {
    chatDetails,
    enteredChat,
    setEnteredChat,
    onUserChatEnter,
    waitingForResponse,
  };
};
export default getChatDetails;
