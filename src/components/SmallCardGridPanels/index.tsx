import { Box, Container, Grid } from "@cloudscape-design/components";
import DollarIcon from "../../assets/icons/dollar-icon.svg";
import { checkIsNumber, formatCurrency } from "../../utility";
import { ChatMsgPanelTypes } from "../../App-Interfaces/ChatRelatedInterfaces";
import "./style.css"
const SmallCardGridPanels = (props: any) => {
  let { CardData, ShowCount } = props;
  let gridCount =
    12 % CardData?.length === 0 ? 12 / CardData?.length : ShowCount;
  let gridDefinitionVal = Array(CardData?.length)
    .fill({ colspan: gridCount })
    .flat();

  return (
    <Grid gridDefinition={gridDefinitionVal}>
      {CardData?.map((data: any, index: number) => {
        return <Container key={index} data-card-panel-container>
          <Box data-top-card-panel>
            <Box data-top-card-panel-content>
              <p
                data-font-ember-bold
                title={"Avg Data Quality Score"}
              >
                {data.title}
              </p>
              <img src={DollarIcon} data-dashboard-card-icons alt="missing" />
            </Box>
            <h2>
              {data.type === ChatMsgPanelTypes.VALUE_CURRENCY
                ? checkIsNumber(data.value)
                  ? "$" + formatCurrency(data.value)
                  : 0
                : data.type === ChatMsgPanelTypes.VALUE_CURRENCY
                ? checkIsNumber(data.value)
                  ? data.value + "%"
                  : data.value
                : data.value}
            </h2>
          </Box>
        </Container>;
      })}
    </Grid>
  );
};

export default SmallCardGridPanels;
