import {
  Badge,
  Box,
  Container,
  Grid,
  Header,
  Icon,
  Popover,
  SpaceBetween,
  Tabs,
} from "@cloudscape-design/components";

import confidenceIcon from "../../assets/icons/confidence-icon.svg";
import exclamationCircle from "../../assets/icons/exclamation-circle.svg";
import { ChatMsgIOTypes } from "../../App-Interfaces/ChatRelatedInterfaces";

import BarChart from "../../components/Graphs/BarChart";
import CollapsiblePanel from "../../components/CollapsiblePanel";
import BarChartStacked from "../../components/Graphs/BarChartStacked";
import ScatteredGraph from "../../components/Graphs/ScatteredGraph";
import AppTable from "../../components/CloudscapeTable/AppTable";
import { SummaryPanel } from "../../components/SummaryPanel";
import MultiLineChart from "../../components/Graphs/MultiLineChart";

export const transformResponseToChat = (apiResponse: any) => {
  let allKeyMetrics: any = {};
  let QAnswers: any = [];
  let allRecommendations: any = [];
  let AllCharts: any = [];
  let domainTableData: any = {};

  let crossQuestionResponse = "";
  if (apiResponse?.cross_question) {
    crossQuestionResponse = apiResponse?.cross_question_response;
  }

  Object.keys(apiResponse?.domain_results || {})?.map((domain) => {
    let ObjDomain = apiResponse?.domain_results?.[domain];
    if (!Object.keys(ObjDomain || {})?.length) return;

    Object.entries(ObjDomain?.analysis_results?.key_metrics || {})?.length &&
      (allKeyMetrics = {
        ...allKeyMetrics,
        ...Object.fromEntries(
          Object.entries(ObjDomain?.analysis_results?.key_metrics).slice(0, 2),
        ),
      });

    ObjDomain?.recommendations?.length &&
      (allRecommendations = [
        ...allRecommendations,
        ...ObjDomain?.recommendations?.slice(0, 2),
      ]);
    ObjDomain?.analysis_results?.questions_answered?.length &&
      (QAnswers = [
        ...QAnswers,
        ...ObjDomain?.analysis_results?.questions_answered?.slice(0, 2),
      ]);

    
    Object.keys(ObjDomain?.visualizations?.data_table || {})?.length &&
      (domainTableData[domain] = formatTableData(
        ObjDomain?.visualizations?.data_table,
      ));

    Object.keys(ObjDomain?.visualizations?.primary_chart || {})?.length &&
      AllCharts.push(ObjDomain?.visualizations?.primary_chart);

    Object.keys(ObjDomain?.visualizations?.secondary_chart || {})?.length &&
      AllCharts.push(ObjDomain?.visualizations?.secondary_chart);
  });

  return (
    <>
      <SpaceBetween size="l">
        <div data-chat-panel-ai-reply-header>
          <Icon name={"gen-ai"} />
          <p data-chat-panel-ai-reply-text data-font-ember-bold>
            Result
          </p>
        </div>
        {crossQuestionResponse?.length ? (
          <Container>
            <p>{crossQuestionResponse}</p>
          </Container>
        ) : (
          <></>
        )}

        {apiResponse?.supervisor_agent_summary && (
          <SummaryPanel
            expandShowMore={true}
            dataId={"data-chat-panel-summary"}
            description={apiResponse?.supervisor_agent_summary}
          />
        )}
        {Object.keys(allKeyMetrics || {}) ? (
          <Box>{getCardPanel(allKeyMetrics)}</Box>
        ) : (
          <></>
        )}

        {!crossQuestionResponse?.length ? (
          <>
            <Tabs
              tabs={[
                {
                  label: (
                    <span data-tab-title data-font-ember-bold>
                      Recommendation
                    </span>
                  ),
                  id: "first",
                  content: (
                    <>
                      <SpaceBetween size="l">
                        {transformRecommendationPanel(allRecommendations)}
                      </SpaceBetween>
                    </>
                  ),
                },
                {
                  label: (
                    <span data-tab-title data-font-ember-bold>
                      Questions Answered
                    </span>
                  ),
                  id: "second",
                  content: (
                    <>
                      <SpaceBetween size="l">
                        {getQuestionAndAnswers(QAnswers)}
                      </SpaceBetween>
                    </>
                  ),
                },
              ]}
              variant="container"
            />

            <Tabs
              tabs={[
                {
                  label: (
                    <span data-tab-title data-font-ember-bold>
                      Overview
                    </span>
                  ),
                  id: "first",
                  content: (
                    <>
                      <SpaceBetween size="l">
                        {Object.values(domainTableData).length ? (
                          Object.values(domainTableData)?.map(
                            (item: any, index: any) => {
                              return (
                                <Container
                                  key={index}
                                  header={
                                    <Header
                                      data-anomaly-detected-header
                                      variant="h2"
                                    >
                                      {item.title || ""}
                                    </Header>
                                  }
                                >
                                  <AppTable
                                    columns={item?.tableHeaders}
                                    data={item?.tableContent || []}
                                    otherProps={{ pageSize: 10 }}
                                  />
                                </Container>
                              );
                            },
                          )
                        ) : (
                          <>
                            <p>No Overview Available!!</p>
                          </>
                        )}
                      </SpaceBetween>
                    </>
                  ),
                },
                {
                  label: (
                    <span data-tab-title data-font-ember-bold>
                      Visualization
                    </span>
                  ),
                  id: "second",
                  content: (
                    <>
                      <SpaceBetween size="l">
                        {AllCharts?.length ? (
                          AllCharts?.map((chart: any) => {
                            return getChartWithType(chart);
                          })
                        ) : (
                          <p>No Charts Available!!</p>
                        )}
                      </SpaceBetween>
                    </>
                  ),
                },
              ]}
              variant="container"
            />
          </>
        ) : (
          <></>
        )}
      </SpaceBetween>
    </>
  );
};

const formatTableData = (data: any) => {
  // format table header;
  let newTableData: any = {};

  if (!Object.keys(data || {})?.length) return newTableData;

  newTableData.title = data.title || "";
  newTableData.tableHeaders = [];

  //converting headers
  data.headers.map((item: string) => {
    newTableData.tableHeaders.push({
      id: item.toLowerCase()?.split(" ").join("_"),
      header: (
        <span data-font-ember-bold data-table-header>
          {item}
        </span>
      ),
      cell: (row: any) => (
        <span>{row[item.toLowerCase()?.split(" ").join("_")]}</span>
      ),
      sortingField: "label",
      isRowHeader: true,
    });
  });

  newTableData.tableContent = data.rows.map((row: any) => {
    let newRow: any = {};
    row.map((rowVal: any, index: number) => {
      newTableData.tableHeaders[index]?.["id"] &&
        (newRow[newTableData.tableHeaders[index]?.["id"]] = rowVal);
    });
    return newRow;
  });
  return newTableData;
};

const getCardPanel = (data: any) => {
  return (
    <>
      {Object.keys(data || {})?.length ? (
        <>
          <h2>Key Metrics</h2>
          <Grid
            gridDefinition={Array(Object.keys(data || {})?.length || 10).fill({
              colspan: 3,
            })}
          >
            {Object.keys(data || {})?.map((itemKey: any, index: number) => {
              let cardStatusGreen =
                data[itemKey]?.status === "good" ||
                data[itemKey]?.status === "normal";

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
                          content={data[itemKey]?.context}
                        >
                          <span data-rca-recommendation-list-item-reason>
                            <span
                              data-font-ember-bold
                              style={{
                                marginRight: "4px",
                                fontSize: "16px",
                                marginTop: "4px",
                              }}
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

                    <h1 data-card-panel-main-text-value>
                      {data[itemKey]?.value +
                        (data[itemKey]?.unit?.length > 1 ? " " : "") +
                        data[itemKey]?.unit}
                    </h1>
                    <div data-card-panel-status-wrapper>
                      <p>
                        <span data-font-ember-bold>Benchmark : </span>
                        <span>{data[itemKey]?.benchmark}</span>
                      </p>
                      <p>
                        <Badge data-anomaly-detected-badge>
                          <span data-font-ember-bold>
                            {data[itemKey]?.status}
                          </span>
                        </Badge>
                      </p>
                    </div>
                  </Box>
                </Container>
              );
            })}
          </Grid>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const getQuestionAndAnswers = (data: any) => {
  let contentPanel: any = [];

  data?.map((item: any, index: any) => {
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
        <p style={{ fontSize: "17px" }}>
          <span data-font-ember-bold>{index + 1}</span>
          {") "}
          {item?.question}{" "}
          <Badge data-anomaly-detected-badge>
            <span data-font-ember-bold>{item.severity}</span>
          </Badge>
        </p>
      </div>
    );
    contentPanel.push({
      header: headerContent,
      content: rowContent,
      rowId: `collapsibleItem_${index + 1}`,
    });
  });

  return <CollapsiblePanel content={contentPanel} />;
};

export const transformRecommendationPanel = (data: any) => {
  let contentPanel: any = [];

  data?.map((item: any, index: any) => {
    let mainContent = (
      <div data-recommend-panel-list-item>
        <p data-recommend-panel-description-item>
          <span data-recommend-panel-list-title data-font-ember-bold>
            Rationale :{" "}
          </span>
          <span data-recommend-panel-list-description>{item?.rationale}</span>
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
            Responsible Party :{" "}
          </span>
          <span data-recommend-panel-list-description>
            {item?.responsible_party}
          </span>
        </p>
      </div>
    );
    let headerContent = (
      <div data-header-panel-content>
        <p style={{ fontSize: "17px" }}>
          <span data-font-ember-bold>{index + 1}</span>
          {") "}
          {item?.action}{" "}
          <Badge data-anomaly-detected-badge>
            <span data-font-ember-bold>{item.priority}</span>
          </Badge>
        </p>
      </div>
    );
    contentPanel.push({
      header: headerContent,
      content: mainContent,
      rowId: `collapsibleItem_${index + 1}`,
    });
  });

  return <CollapsiblePanel content={contentPanel} />;
};

const getChartWithType = (data: any) => {
  switch (data?.chart_type) {
    case "bar_chart":
      return getBarChart(data);
    case "scatter_plot":
      return getScatteredChart(data);
    case "stacked_bar":
      return getStackedBar(data);
    case "line_chart":
      return getLineChart(data);
    default:
      return <></>;
  }
};
const getLineChart = (data: any) => {
  let lineItems = data?.data?.series?.map((item: any) => {
    let lineData: { x: number; y: number }[] = [];
    item?.values?.map((linePoint: any, index: number) => {
      lineData.push({
        x: data?.data?.x_values[index],
        y: linePoint,
      });
    });

    return {
      name: item?.name,
      type: "line",
      data: lineData || [],
    };
  });
  return (
    <Container data-center-bar-graph-legend>
      <h2 data-container-header-b-margin>{data?.title}</h2>
      <MultiLineChart data={lineItems || []} />
    </Container>
  );
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
