import ChatBubble from "@cloudscape-design/chat-components/chat-bubble";
import Avatar from "@cloudscape-design/chat-components/avatar";
import {
  Box,
  Container,
  Grid,
  SpaceBetween,
} from "@cloudscape-design/components";
import {
  ChatMsgIOTypes,
  ChatMsgPanelTypes,
} from "../../App-Interfaces/ChatRelatedInterfaces";
import { SummaryPanel } from "../../components/SummaryPanel";
import SmallCardGridPanels from "../../components/SmallCardGridPanels";
import ChatGridPanel from "../../components/GridPanel";
import BarChart from "../../components/Graphs/BarChart";

export const getChatMsgBasedOnType = (data: any) => {
  switch (data.type) {
    case ChatMsgIOTypes.INCOMING:
      return getAvatarComponent(data);
    case ChatMsgIOTypes.OUTGOING:
      return getAvatarComponent(data);
    case ChatMsgPanelTypes.CONTAINER_PANEL:
      return getContainerPanel(data);
    default:
      return null;
  }
};

export const getContainerComponent = (data: any) => {
  console.log(data);
  switch (data.type) {
    case ChatMsgPanelTypes.CONTAINER_PANEL:
      return getContainerPanel(data);
    case ChatMsgPanelTypes.GRID_PANEL:
      return getChatGridPanel(data);
    case ChatMsgPanelTypes.SPACE_BETWEEN:
      return getSpaceBetweenPanel(data);
    case ChatMsgPanelTypes.SUMMARY:
      return getSummaryPanelComponent(data);
    case ChatMsgPanelTypes.KPIS:
      return getGridCardPanel(data);
    case ChatMsgPanelTypes.BAR_CHART:
      return getBarChart(data);
    default:
      return null;
  }
};
const getBarChart = (data: any) => {
  return (
    <Container data-center-bar-graph-legend>
      <h2 data-container-header-b-margin>{data.title}</h2>
      <BarChart showLegend={true} data={[]} />
    </Container>
  );
};
const getContainerPanel = (data: any) => {
  return (
    <Container>
      {data?.items?.map((row: any) => {
        return getContainerComponent(row);
      })}
    </Container>
  );
};
const getSpaceBetweenPanel = (data: any) => {
  return (
    <SpaceBetween size="l" direction={data.direction || "vertical"}>
      {data?.items?.map((row: any) => {
        return getContainerComponent(row);
      })}
    </SpaceBetween>
  );
};

const getChatGridPanel = (data: any) => {
  let gridDefinitionVal = Array(data?.showItemCount)
    .fill({ colspan: 6 })
    .flat();
  return (
    <Grid gridDefinition={gridDefinitionVal}>
      {data?.items?.map((row: any) => {
        return getContainerComponent(row);
      })}
    </Grid>
  );
};

const getGridCardPanel = (data: any) => {
  return <SmallCardGridPanels CardData={data?.cardsList || []} />;
};

export const getChatContainerInnerContent = (data: any) => {
  return getContainerComponent(data);
};

const getChatTextMsgPanel = () =>{
  return <div data-chat-msg-panel>
    <p></p>
  </div>
}

const getSummaryPanelComponent = (data: any) => {
  return <SummaryPanel description={data.description} />;
};

const getAvatarComponent = (data: any) => {
  return (
    <ChatBubble
      ariaLabel={data.ariaLabel}
      type={data.type}
      avatar={
        <Avatar
          loading={data.avatarLoading}
          color={data.color}
          iconName={data.iconName}
          ariaLabel={data.avatarAriaLabel}
          tooltipText={data.tooltipText}
        />
      }
    >
      <Box color="text-status-inactive">{data.message}</Box>
    </ChatBubble>
  );
};
