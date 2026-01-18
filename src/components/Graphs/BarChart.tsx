import BarChart from "@cloudscape-design/components/bar-chart";
import Box from "@cloudscape-design/components/box";

export default ({
  data,
  showLegend = false,
  height = 200,
  horizontalBars = false,
  otherProps = {}
}: {
  data?: any;
  showLegend?: boolean;
  height?: number;
  horizontalBars?: boolean;
  otherProps?:any
}) => {
  return (
    <BarChart
      height={height}
      series={data || []}
      hideFilter
      fitHeight
      horizontalBars={horizontalBars}
      hideLegend={!showLegend}
      ariaLabel="data"
      {...otherProps}
      empty={
        <Box textAlign="center" color="inherit">
          <b>BarChart!!, No data available.</b>
        </Box>
      }
    />
  );
};
