import { LineChart } from "@cloudscape-design/components";
import Box from "@cloudscape-design/components/box";

export default ({
  data,
  showLegend = false,
  height = 150,
  otherProps,
}: {
  data?: any;
  showLegend?: boolean;
  height?: number;
  otherProps?: any;
}) => {
  return (
    <LineChart
      
      height={height}
      series={data || []}
      hideFilter
      
      hideLegend={!showLegend}
      {...otherProps}
      empty={
        <Box textAlign="center" color="inherit">
          <b>No data available</b>
        </Box>
      }
    />
  );
};
