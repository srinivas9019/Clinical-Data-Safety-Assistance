
import Box from "@cloudscape-design/components/box";
import CartesianChart from "@cloudscape-design/chart-components/cartesian-chart";

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
  return (
    <>
      <CartesianChart
        stacking="Scatter chart"
        chartHeight={height}
        series={data || []}
        empty={
          <Box textAlign="center" color="inherit">
            <b>Scattered-Chart !!, No data available.</b>
          </Box>
        }
        {...otherProps}
      />
    </>
  );
};
export default ScatteredGraph;