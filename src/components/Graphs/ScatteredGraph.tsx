import Box from "@cloudscape-design/components/box";
import CartesianChart from "@cloudscape-design/chart-components/cartesian-chart";
import Highcharts from "highcharts";

const ScatteredGraph = ({
  data,
  height = 400,
  otherProps = {},
}: {
  data?: any;
  showLegend?: boolean;
  height?: number;
  horizontalBars?: boolean;
  otherProps?: any;
}) => {
  console.log(JSON.stringify(data));
  return (
    <>
      <CartesianChart
        highcharts={Highcharts}
        ariaLabel="Scatter chart"
        chartHeight={height}
        series={data}
        empty={
          <Box textAlign="center" color="inherit">
            <b>Scatter-Chart !!, No data available.</b>
          </Box>
        }
        {...otherProps}
      />
    </>
  );
};
export default ScatteredGraph;
