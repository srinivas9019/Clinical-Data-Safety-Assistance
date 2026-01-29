
import Box from "@cloudscape-design/components/box";
import CartesianChart from "@cloudscape-design/chart-components/cartesian-chart";
import Highcharts from "highcharts";

export default ({
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
  return (
    <>
      <CartesianChart
        highcharts={Highcharts}
        stacking="normal"
        chartHeight={height}
        // hideFilter
        // fitHeight
        series={data || []}
        empty={
          <Box textAlign="center" color="inherit">
            <b>Stacked-Chart !!, No data available.</b>
          </Box>
        }
        {...otherProps}
      />
    </>
  );
};
