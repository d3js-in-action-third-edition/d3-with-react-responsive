import { useState, useEffect } from "react";
import * as d3 from "d3";

import Card from '../UI/Card';
import ChartContainer from '../ChartComponents/ChartContainer';
import BarChartVertical from "./BarChartVertical";
import BarChartHorizontal from "./BarChartHorizontal";

const getWindowWidth = () => {
  const windowWidth = window.innerWidth;
  return windowWidth;
};

const BarChart = props => {
  const breakPoint = 600;
  const width = 300;
  let windowWidth = getWindowWidth();

  const getHeight = (width) => {
    return width >= breakPoint ? 245 : 400;
  };
  const getMarginBottom = (width) => {
    return width >= breakPoint ? 85 : props.margin.bottom;
  };
  const getMarginRight = (width) => {
    return width >= breakPoint ? props.margin.right : 30;
  };
  const getMarginLeft = (width) => {
    return width >= breakPoint ? props.margin.left : 90;
  };
  const getInnerWidth = (mR, mL) => {
    return width - mR - mL;
  };
  const getInnerHeight = (h, m) => {
    return h - props.margin.top - m;
  };
  const getLayout = (width) => {
    return width >= breakPoint ? "vertical" : "horizontal";
  };

  let marginBottom = getMarginBottom(windowWidth);
  let marginRight = getMarginRight(windowWidth);
  let marginLeft = getMarginLeft(windowWidth);
  const [height, setHeight] = useState(getHeight(windowWidth));
  const [innerWidth, setInnerWidth] = useState(getInnerWidth(marginRight, marginLeft));
  const [innerHeight, setInnerHeight] = useState(getInnerHeight(height, marginBottom));
  const [layout, setLayout] = useState(getLayout(windowWidth));

  useEffect(() => {
    const handleWindowResize = () => {
      const newWindowWidth = getWindowWidth();
      if ((newWindowWidth >= breakPoint && windowWidth < breakPoint) ||
           (newWindowWidth < breakPoint && windowWidth >= breakPoint)) {
        const newHeight = getHeight(newWindowWidth);
        marginBottom = getMarginBottom(newWindowWidth);
        marginRight = getMarginRight(newWindowWidth);
        marginLeft = getMarginLeft(newWindowWidth);
        const newInnerWidth = getInnerWidth(marginRight, marginLeft);
        const newInnerHeight = getInnerHeight(newHeight, marginBottom);
        setHeight(newHeight);
        setInnerWidth(newInnerWidth);
        setInnerHeight(newInnerHeight);
        setLayout(getLayout(newWindowWidth));
      }
      windowWidth = newWindowWidth;
      
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const awarenessData = [];
  props.data.forEach(d => {
    const awareness = { 
      id: d.id, 
      name: d.name,
      awareness_percentage: d.awareness[d.awareness.length -1].percentage_question 
    };
    awarenessData.push(awareness);
  });
  awarenessData.sort((a, b) => b.awareness_percentage - a.awareness_percentage);

  const xScale = d3.scaleBand()
    .domain(awarenessData.map(d => d.name))
    .range([0, innerWidth])
    .padding(0.2);
  const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([innerHeight, 0]);
  const xScaleMobile = d3.scaleLinear()
    .domain([0, 100])
    .range([0, innerWidth]);
  const yScaleMobile = d3.scaleBand()
    .domain(awarenessData.map(d => d.name))
    .range([0, innerHeight])
    .padding(0.2);

  return (
    <Card>
      <h2>Awareness</h2>
      <div className="small-chart-container">
        <ChartContainer
          width={width}
          height={height}
          margin={{ top: props.margin.top, right: props.margin.right, bottom: marginBottom, left: marginLeft }}
        >
          {layout === "vertical"
            ? <BarChartVertical
                xScale={xScale}
                yScale={yScale}
                innerWidth={innerWidth}
                innerHeight={innerHeight}
                data={awarenessData}
                colorScale={props.colorScale}
              />
            : <BarChartHorizontal
                xScale={xScaleMobile}
                yScale={yScaleMobile}
                innerWidth={innerWidth}
                innerHeight={innerHeight}
                data={awarenessData}
                colorScale={props.colorScale}
              />
          }
        </ChartContainer> 
      </div>
    </Card>
  )
};

export default BarChart;