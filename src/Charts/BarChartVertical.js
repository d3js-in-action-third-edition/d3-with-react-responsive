import { Fragment } from "react";

import Axis from "../ChartComponents/Axis";
import Rectangle from "../ChartComponents/Rectangle";

const BarChartVertical = props => {
  return (
    <Fragment>
      <Axis 
        type="band"
        scale={props.xScale}
        ticks={props.data.map(d => d.name)}
        innerWidth={props.innerWidth}
        innerHeight={props.innerHeight}
      />
      <Axis 
        type="left"
        scale={props.yScale}
        innerWidth={props.innerWidth}
        innerHeight={props.innerHeight}
        label={"Awareness %"}
      />
      {props.data.map(framework => (
        <Rectangle
          key={`rectangle-${framework.id}`}
          x={props.xScale(framework.name)}
          y={props.yScale(framework.awareness_percentage)}
          width={props.xScale.bandwidth()}
          height={props.innerHeight - props.yScale(framework.awareness_percentage)}
          fill={props.colorScale(framework.id)}
        />
      ))}
    </Fragment>
  );
};

export default BarChartVertical;