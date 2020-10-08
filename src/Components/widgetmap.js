// STEP 1 - Include Dependencies
import ".././dashboard.css";
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

//Import FusionMaps
import FusionMaps from "fusioncharts/maps/es/fusioncharts.world";
import World from "fusioncharts/fusioncharts.maps";

// Include the theme as fusion
import ZuneTheme from "fusioncharts/themes/fusioncharts.theme.zune";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, FusionMaps, World, ZuneTheme);

//STEP 2 - Define the dataset and the colorRange of the map
const dataset = [
  {
    id: "NA",
    value: ".82",
    showLabel: "1"
  },
  {
    id: "SA",
    value: "2.04",
    showLabel: "1"
  },
  {
    id: "AS",
    value: "1.78",
    showLabel: "1"
  },
  {
    id: "EU",
    value: ".40",
    showLabel: "1"
  },
  {
    id: "AF",
    value: "2.58",
    showLabel: "1"
  },
  {
    id: "AU",
    value: "1.30",
    showLabel: "1"
  }
];

const colorrange = {
  minvalue: "0",
  code: "#FFE0B2",
  gradient: "1",
  color: [
    {
      minvalue: "0.5",
      maxvalue: "1.0",
      color: "#88CDF6"
    },
    {
      minvalue: "1.0",
      maxvalue: "2.0",
      color: "#2D82B5"
    },
    {
      minvalue: "2.0",
      maxvalue: "3.0",
      color: "#015C92"
    }
  ]
};

// STEP 3 - Creating the JSON object to store the chart configurations
const chartConfigs = {
  type: "world", // The chart type
  width: "300", // Width of the chart
  height: "300", // Height of the chart
  dataFormat: "json", // Data type
  dataSource: {
    // Map Configuration
    chart: {
      caption: "Average Page Views",
      subcaption: "October 2020 - Decemeber 2020",
      numbersuffix: "%",
      includevalueinlabels: "1",
      labelsepchar: ": ",
      entityFillHoverColor: "#7BE495",
      theme: "zune"
    },
    // Aesthetics; ranges synced with the slider
    colorrange: colorrange,
    // Source data as JSON --> id represents countries of the world.
    data: dataset
  }
};

// STEP 3 - Creating the DOM element to pass the react-fusioncharts component
class WidgetMap extends React.Component {
  render() {
    return (
      <div className="Map">
        <div className="widgettitle">Map Locations</div>
        <div className="widgetvalue">
          <ReactFC {...chartConfigs} />
        </div>
      </div>
    );
  }
}

export default WidgetMap;
