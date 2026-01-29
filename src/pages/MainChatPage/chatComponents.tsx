import {
  Badge,
  Box,
  Container,
  Grid,
  Header,
  Icon,
  Popover,
  SpaceBetween,
} from "@cloudscape-design/components";

import confidenceIcon from "../../assets/icons/confidence-icon.svg";
import exclamationCircle from "../../assets/icons/exclamation-circle.svg";
import { ChatMsgIOTypes } from "../../App-Interfaces/ChatRelatedInterfaces";
import { SummaryPanel } from "../../components/SummaryPanel";
import BarChart from "../../components/Graphs/BarChart";
import CollapsiblePanel from "../../components/CollapsiblePanel";
import BarChartStacked from "../../components/Graphs/BarChartStacked";
import ScatteredGraph from "../../components/Graphs/ScatteredGraph";


export const transformResponseToChat = (apiResponse: any) => {
  console.log(apiResponse);

  return (
    <Container>
      <div data-chat-panel-ai-reply-header>
        <Icon name={"gen-ai"} />
        <p data-chat-panel-ai-reply-text data-font-ember-bold>
          Result
        </p>
      </div>
      <SpaceBetween size="l">
        {Object.keys(apiResponse?.domain_results || {})?.map((domain) => {
          let ObjDomain = apiResponse?.domain_results?.[domain];
          if (!Object.keys(ObjDomain || {})?.length) return;

          let domainPanel = (
            <SpaceBetween size="l">
              {/* key-metric panel -- start */}
              {(Object.keys(ObjDomain?.analysis_results?.key_metrics) || [])
                ?.length ? (
                getCardPanel(ObjDomain?.analysis_results)
              ) : (
                <></>
              )}
              {/* key-metric panel -- end */}

              {/* Recommendation panel -- Start */}
              {transformRecommendationPanel(ObjDomain?.recommendations)}

              {/* Recommendation panel -- End */}

              {/* Question-Answer panel -- start */}
              {(ObjDomain?.analysis_results?.questions_answered || [])
                ?.length ? (
                getQuestionAndAnswers(ObjDomain?.analysis_results)
              ) : (
                <></>
              )}
              {/* Question-Answer panel -- end */}

              {Object.keys(ObjDomain?.visualizations || [])?.length ? (
                getChartWithType(
                  ObjDomain?.visualizations?.primary_chart?.chart_type,
                  ObjDomain?.visualizations?.primary_chart,
                )
              ) : (
                <></>
              )}

              {Object.keys(ObjDomain?.visualizations || [])?.length ? (
                getChartWithType(
                  ObjDomain?.visualizations?.secondary_chart?.chart_type,
                  ObjDomain?.visualizations?.secondary_chart,
                )
              ) : (
                <></>
              )}

              {/* Summary panel -- start */}
              {ObjDomain?.summary?.length ? (
                <SummaryPanel description={ObjDomain?.summary} />
              ) : (
                <></>
              )}
              {/* Summary panel -- end */}
            </SpaceBetween>
          );

          let headerContent = (
            <div data-header-panel-content>
              <p data-font-ember-bold style={{ fontSize: "18px" }}>
                {domain}
              </p>
            </div>
          );

          return (
            <CollapsiblePanel header={headerContent} content={domainPanel} />
          );
        })}
      </SpaceBetween>
    </Container>
  );
};

const getCardPanel = (data: any) => {
  return (
    <Container
      header={
        <Header variant="h3">
          <span>Key Metrics</span>
        </Header>
      }
    >
      <Grid
        gridDefinition={Array(Object.keys(data?.key_metrics || {})?.length || 10).fill({
          colspan: 4,
        })}
      >
        {Object.keys(data?.key_metrics || {})?.map(
          (itemKey: any, index: number) => {
            let cardStatusGreen =
              data?.key_metrics[itemKey]?.status === "good" ||
              data?.key_metrics[itemKey]?.status === "normal";

            return (
              <Container
                data-card-panel-container
                data-card-panel-status={cardStatusGreen}
                key={index}
              >
                <Box data-top-card-panel>
                  <Box data-top-card-panel-content>
                    <p
                      data-font-ember-bold
                      title={itemKey}
                      data-card-panel-title-with-info
                    >
                      <Popover
                        dismissButton={false}
                        position="top"
                        size="small"
                        triggerType="custom"
                        content={data?.key_metrics[itemKey]?.context}
                      >
                        <span data-rca-recommendation-list-item-reason>
                          <span
                            data-font-ember-bold
                            style={{ marginRight: "4px", fontSize: "16px" }}
                          >
                            {itemKey}
                          </span>
                          <img src={exclamationCircle} alt="missing" />
                        </span>
                      </Popover>
                    </p>
                    <img
                      src={confidenceIcon}
                      data-dashboard-card-icons
                      alt="missing"
                    />
                  </Box>

                  <h2 data-card-panel-main-text-value>
                    {data?.key_metrics[itemKey]?.value +
                      (data?.key_metrics[itemKey]?.unit?.length > 1
                        ? " "
                        : "") +
                      data?.key_metrics[itemKey]?.unit}
                  </h2>
                  <p>
                    <span data-font-ember-bold>Benchmark : </span>
                    <span>{data?.key_metrics[itemKey]?.benchmark}</span>
                  </p>
                  <p>
                    <span data-font-ember-bold>Status : </span>
                    <Badge data-anomaly-detected-badge>
                      <span data-font-ember-bold>
                        {data?.key_metrics[itemKey]?.status}
                      </span>
                    </Badge>
                  </p>
                </Box>
              </Container>
            );
          },
        )}
      </Grid>
    </Container>
  );
};

const getQuestionAndAnswers = (data: any) => {
  let QAPanel = (
    <SpaceBetween size="l">
      {(data?.questions_answered || [])?.map((item: any) => {
        let rowContent = (
          <div data-recommend-panel-list-item>
            <p data-recommend-panel-description-item>
              <span data-recommend-panel-list-title data-font-ember-bold>
                Answer :{" "}
              </span>
              <span data-recommend-panel-list-description>{item.answer}</span>
            </p>
          </div>
        );
        let headerContent = (
          <div data-header-panel-content>
            <p data-font-ember-bold style={{ fontSize: "17px" }}>
              {item?.question}{" "}
              <Badge data-anomaly-detected-badge>
                <span data-font-ember-bold>{item.severity}</span>
              </Badge>
            </p>
          </div>
        );
        return <CollapsiblePanel header={headerContent} content={rowContent} />;
      })}
    </SpaceBetween>
  );

  let headerContent = (
    <div data-header-panel-content>
      <p data-font-ember-bold style={{ fontSize: "17px" }}>
        Questions Answered
      </p>
    </div>
  );

  return <CollapsiblePanel header={headerContent} content={QAPanel} />;
};

export const transformRecommendationPanel = (data: any) => {
  let recommendPanel = (
    <SpaceBetween size="l">
      {data?.map((item: any) => {
        let rowContent = (
          <div data-recommend-panel-list-item>
            <p data-recommend-panel-description-item>
              <span data-recommend-panel-list-title data-font-ember-bold>
                Rationale :{" "}
              </span>
              <span data-recommend-panel-list-description>
                {item?.rationale}
              </span>
            </p>
            <p data-recommend-panel-description-item>
              <span data-recommend-panel-list-title data-font-ember-bold>
                Expected Impact :{" "}
              </span>
              <span data-recommend-panel-list-description>
                {item?.expected_impact}
              </span>
            </p>
            <p data-recommend-panel-description-item>
              <span data-recommend-panel-list-title data-font-ember-bold>
                Responsible Domain :{" "}
              </span>
              <span data-recommend-panel-list-description>
                {item?.responsible_domain}
              </span>
            </p>
          </div>
        );
        let headerContent = (
          <div data-header-panel-content>
            <p data-font-ember-bold style={{ fontSize: "17px" }}>
              {item?.action}{" "}
              <Badge data-anomaly-detected-badge>
                <span data-font-ember-bold>{item.priority}</span>
              </Badge>
            </p>
          </div>
        );
        return <CollapsiblePanel header={headerContent} content={rowContent} />;
      })}
    </SpaceBetween>
  );
  let headerContent = (
    <div data-header-panel-content>
      <p data-font-ember-bold style={{ fontSize: "17px" }}>
        Recommendations
      </p>
    </div>
  );

  return <CollapsiblePanel header={headerContent} content={recommendPanel} />;
};

const getChartWithType = (type: any, data: any) => {
  console.log(type);
  switch (type) {
    case "bar_chart":
      return getBarChart(data);
    case "scatter_plot":
      return getScatteredChart(data);
    case "stacked_bar":
      return getStackedBar(data);
    default:
      return <></>;
  }
};
const getStackedBar = (data: any) => {
  let newData = data?.data_series?.map((item: any) => {
    return {
      name: item.name,
      type: "column",
      data: item.data,
    };
  });

  return (
    <>
      {data?.data_series?.length ? (
        <Container>
          <h2 data-container-header-b-margin>{data?.title}</h2>
          <BarChartStacked
            otherProps={{
              xAxis: {
                title: data?.x_axis?.label || "",
                categories: data?.x_axis?.values || [],
              },
              yAxis: { title: data?.y_axis?.label || "" },
            }}
            data={newData || []}
          />
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

const getScatteredChart = (data: any) => {
  let barCartData = [
    {
      name: "Actual",
      type: "scatter",
      data: data?.data?.x_axis?.map((item: any, index: number) => {
        return {
          name: data?.data?.labels?.[index],
          x: item,
          y: data?.data?.y_axis?.[index],
        };
      }),
    },
  ];
  console.log(JSON.stringify(barCartData));

  return (
    <Container data-center-bar-graph-legend>
      <h2 data-container-header-b-margin>{data?.title}</h2>
      <ScatteredGraph showLegend={true} data={barCartData} />
    </Container>
  );
};

const getBarChart = (data: any) => {
  let barCartData = {
    title: "Actual",
    type: "bar",

    data: data?.x_axis?.values?.map((item: any, index: number) => {
      return {
        x: item,
        y: data?.y_axis?.values[index],
      };
    }),
  };

  return (
    <Container data-center-bar-graph-legend>
      <h2 data-container-header-b-margin>{data?.title}</h2>
      <BarChart
        otherProps={{ xTitle: data?.x_axis.label, yTitle: data?.y_axis.label }}
        showLegend={true}
        data={[barCartData]}
      />
    </Container>
  );
};

export const getChatTextMsgPanel = (data: any) => {
  return (
    <div
      data-chat-msg-container
      data-chat-msg-incoming={
        data.type === ChatMsgIOTypes.INCOMING ? true : false
      }
    >
      <span data-chat-msg-panel>
        <Icon
          name={
            data.type === ChatMsgIOTypes.INCOMING ? "gen-ai" : "user-profile"
          }
        />
        <span
          data-chat-msg-panel-text-panel
          data-adjust-height-for-user-text={
            data.type === ChatMsgIOTypes.OUTGOING
          }
        >
          {data.message}
        </span>
      </span>
    </div>
  );
};
