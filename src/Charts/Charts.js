import { Fragment, useState, useEffect } from "react";
import * as d3 from "d3";

import Rankings from "./Rankings";
import RankingsMobile from "./RankingsMobile";
import ScatterplotReactControlled from "./ScatterplotReactControlled";
import BarChartVertical from "./BarChartVertical";
import BarChartHorizontal from "./BarChartHorizontal";

const getWindowWidth = () => {
  const windowWidth = window.innerWidth;
  return windowWidth;
};

const rankingFilters = [
  { id: "satisfaction", label: "Satisfaction" },
  { id: "interest", label: "Interest" },
  { id: "usage", label: "Usage" },
  { id: "awareness", label: "Awareness" },
];

const Charts = props => {
  const [activeFilter, setActiveFilter] = useState("satisfaction");
  const filterSelectionHandler = (id) => {
    if (activeFilter !== id) {
      setActiveFilter(id);
    }
  };

  const margin = {top: 30, right: 10, bottom: 50, left: 60};
  const breakPoint = 600;

  const colorScale = d3.scaleOrdinal()
    .domain(props.data.ids)
    .range(d3.schemeTableau10);

  const [windowWidth, setWindowWidth] = useState(getWindowWidth());
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Fragment>
      <h1>Front-end Frameworks</h1>
      <div className="row">
        <div className="col-12 col-lg-9">
          {windowWidth >= breakPoint
            ? <Rankings 
                margin={margin} 
                data={props.data}
                colorScale={colorScale}
                rankingFilters={rankingFilters}
                activeFilter={activeFilter}
                onFilterSelection={filterSelectionHandler}
              />
            : <RankingsMobile
                margin={margin} 
                data={props.data}
                colorScale={colorScale}
                rankingFilters={rankingFilters}
                activeFilter={activeFilter}
                onFilterSelection={filterSelectionHandler}
              />
          }
        </div>
        <div className="col-12 col-lg-3">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-12">
              <ScatterplotReactControlled 
                margin={margin}
                data={props.data.experience}
                colorScale={colorScale}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-12">
              {windowWidth >= breakPoint
                ? <BarChartVertical
                    data={props.data.experience} 
                    margin={margin} 
                    colorScale={colorScale}
                  />
                : <BarChartHorizontal
                    data={props.data.experience} 
                    margin={margin} 
                    colorScale={colorScale}
                  />
              }
            </div>
          </div>
        </div>
      </div>
      <div className="source">Data source and original rankings chart: <a href="https://2021.stateofjs.com/en-US/libraries/front-end-frameworks">The State of JS 2021: Front-end Frameworks</a></div>
    </Fragment>
  )
};

export default Charts;