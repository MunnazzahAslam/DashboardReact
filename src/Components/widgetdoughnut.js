import React, { Component } from 'react';
import '.././dashboard.css';

// Step 2 - Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Step 3 - Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Step 5 - Include the theme as fusion
import ZuneTheme from "fusioncharts/themes/fusioncharts.theme.zune";

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, ZuneTheme);

function Widgetdoughnut(props) {

  const chartConfigs = {
    type: "doughnut2d", // The chart type
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

export default Widgetdoughnut;
