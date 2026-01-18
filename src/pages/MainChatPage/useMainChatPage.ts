import { useEffect, useState } from "react";
import {
  ChatMsgIOTypes,
  ChatMsgPanelTypes,
} from "../../App-Interfaces/ChatRelatedInterfaces";

const getChatDetails = () => {
  const [chatDetails, setChatDetails] = useState<any>([]);
  const [enteredChat, setEnteredChat] = useState<string>("");

  useEffect(() => {
    setChatDetails([
      {
        type: ChatMsgIOTypes.INCOMING,
        ariaLabel: "Generative AI assistant",
        avatarLoading: true,
        color: "gen-ai",
        iconName: "gen-ai",
        avatarAriaLabel: "Generative AI assistant",
        tooltipText: "Generative AI assistant",
        message: "Hi, Your Clinical Data Safety Assistant...",
      },
    ]);

    setTimeout(() => {
      setChatDetails([
        {
          type: ChatMsgIOTypes.INCOMING,
          ariaLabel: "Generative AI assistant",

          color: "gen-ai",
          iconName: "gen-ai",
          avatarAriaLabel: "Generative AI assistant",
          tooltipText: "Generative AI assistant",
          message:
            "Hello! I am your Clinical Data Safety Assistant. How can I assist you today?",
        },
        {
          type: ChatMsgPanelTypes.CONTAINER_PANEL,
          title:"",
          items: [
            {
              type: ChatMsgPanelTypes.SPACE_BETWEEN,
              items: [
                {
                  type: ChatMsgPanelTypes.SUMMARY,
                  description:
                    "The clinical trial report provides a comprehensive overview of the study's objectives, methodology, results, and conclusions. It includes detailed information on patient demographics, treatment protocols, efficacy outcomes, and safety assessments. The report highlights key findings, statistical analyses, and any adverse events observed during the trial. Overall, the report serves as a critical document for regulatory submissions and informs future research directions in the field. The clinical trial report provides a comprehensive overview of the study's objectives, methodology, results, and conclusions. It includes detailed information on patient demographics, treatment protocols, efficacy outcomes, and safety assessments. The report highlights key findings, statistical analyses, and any adverse events observed during the trial. Overall, the report serves as a critical document for regulatory submissions and informs future research directions in the field. The clinical trial report provides a comprehensive overview of the study's objectives, methodology, results, and conclusions. It includes detailed information on patient demographics, treatment protocols, efficacy outcomes, and safety assessments. The report highlights key findings, statistical analyses, and any adverse events observed during the trial. Overall, the report serves as a critical document for regulatory submissions and informs future research directions in the field. The clinical trial report provides a comprehensive overview of the study's objectives, methodology, results, and conclusions. It includes detailed information on patient demographics, treatment protocols, efficacy outcomes, and safety assessments. The report highlights key findings, statistical analyses, and any adverse events observed during the trial. Overall, the report serves as a critical document for regulatory submissions and informs future research directions in the field. ",
                },
                {
                  type: ChatMsgPanelTypes.KPIS,
                  cardsList: [
                    {
                      title: "abcd",
                      value: "12345.324",
                      type: ChatMsgPanelTypes.VALUE_CURRENCY,
                    },
                    {
                      title: "abcd",
                      value: "12345.324",
                      type: ChatMsgPanelTypes.VALUE_PERCENT,
                    },
                    {
                      title: "abcd",
                      value: "12345.324",
                      type: ChatMsgPanelTypes.VALUE_CURRENCY,
                    },
                    {
                      title: "abcd",
                      value: "12345.324",
                      type: ChatMsgPanelTypes.VALUE_PERCENT,
                    },
                  ],
                },
                {
                  type: ChatMsgPanelTypes.GRID_PANEL,
                  showItemCount: 2,
                  items: [
                    {
                      type: ChatMsgPanelTypes.BAR_CHART,
                      title: "New bar chart 1",
                    },
                    {
                      type: ChatMsgPanelTypes.BAR_CHART,
                      title: "New bar chart 2",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]);
    }, 500);
  }, []);

  const onUserChatEnter = () => {
    setChatDetails((prevChatDetails: any) => [
      ...prevChatDetails,
      {
        type: ChatMsgIOTypes.OUTGOING,
        ariaLabel: "Generative AI assistant",
        color: "gen-ai",
        iconName: "gen-ai",
        avatarAriaLabel: "Generative AI assistant",
        tooltipText: "Generative AI assistant",
        message: enteredChat,
      },
    ]);
    setEnteredChat("");
  };

  return { chatDetails, enteredChat, setEnteredChat, onUserChatEnter };
};
export default getChatDetails;
