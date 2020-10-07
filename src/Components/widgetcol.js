import React from 'react';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import ZuneTheme from "fusioncharts/themes/fusioncharts.theme.zune";
ReactFC.fcRoot(FusionCharts, Column2D, ZuneTheme);

function Widgetcol(props) {

  const chartConfigs = {
    type: "column2d", // The chart type
    width: "50%", // Width of the chart
    height: "300", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        theme: "zune"
      },
      // Chart Data
      data: props.data
    }
  };


  return (
      <div className="chart">
          <div className="widgettitle">{props.title}</div> 
          <div className="widgetvalue">
          <ReactFC {...chartConfigs} />
          </div>
      </div>
  )
}

export default Widgetcol;
