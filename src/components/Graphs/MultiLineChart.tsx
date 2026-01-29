import CartesianChart from "@cloudscape-design/chart-components/cartesian-chart";
import Highcharts from "highcharts";

const MultiLineChart = ({
  data,

  height = 400,
  
}: {
  data: any;
  
  height?: number;
  
}) => {
  return (
    <CartesianChart
      highcharts={Highcharts}
      ariaLabel="Multiple data series line chart"
      chartHeight={height}
      series={data || []}
      xAxis={{type:"datetime"}}
    />
  );
};

export default MultiLineChart;
