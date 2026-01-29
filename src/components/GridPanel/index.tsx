import { Container, Grid, Header } from "@cloudscape-design/components";
const ChatGridPanel = (props: any) => {
  let { GridItems } = props;
  console.log(GridItems);

  let gridCount = 12 % GridItems?.length === 0 ? 12 / GridItems?.length : 2;
  let gridDefinitionVal = Array(GridItems?.length)
    .fill({ colspan: gridCount })
    .flat();

  return (
    <>
      <Grid gridDefinition={gridDefinitionVal}>
        {GridItems?.map((data: any, index: number) => {
          console.log(data);
          return (
            <Container
              header={
                <Header data-anomaly-detected-header variant="h2">
                  Gross vs Net Revenue Result
                </Header>
              }
              key={index}
              data-card-panel-container
            >
              {/* {data.title} */}
            </Container>
          );
        })}
      </Grid>
    </>
  );
};
export default ChatGridPanel;
