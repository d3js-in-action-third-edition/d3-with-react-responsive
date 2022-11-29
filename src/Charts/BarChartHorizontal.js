import { Fragment } from "react";

import Axis from "../ChartComponents/Axis";
import Rectangle from "../ChartComponents/Rectangle";

const BarChartHorizontal = props => {
  return (
    <Fragment>
      <Axis 
        type="bandLeft"
        scale={props.yScale}
        ticks={props.data.map(d => d.name)}
        innerWidth={props.innerWidth}
        innerHeight={props.innerHeight}
      />
      {props.data.map(framework => (
        <g 
          key={`rectangle-${framework.id}`}
          className="axis"
        >
          <Rectangle
            x={0}
            y={props.yScale(framework.name)}
            width={props.xScale(framework.awareness_percentage)}
            height={props.yScale.bandwidth()}
            fill={props.colorScale(framework.id)}
          />
          <text
            x={props.xScale(framework.awareness_percentage) + 5}
            y={props.yScale(framework.name) + props.yScale.bandwidth()/2}
            alignmentBaseline="middle"
          >
            {`${Math.round(framework.awareness_percentage)}%`}
          </text>
        </g>
      ))}
    </Fragment>
  );
};

export default BarChartHorizontal;