import React from 'react'
import BarChart from "../charts/BarChart"
import PieChart from "../charts/PieChart"
import {Link as ReactRouterLink, Route} from "react-router-dom"
import ThemeContext from "../components/ThemeContext";
import styled  from 'styled-components'

const DivRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const Link = styled(ReactRouterLink)`
  color: white;
  text-decoration: none;
`

const data = [
  {k: "A", v: 17},
  {k: "B", v: 12},
  {k: "C", v: 11},
  {k: "D", v: 28},
  {k: "E", v: 14}
]

function Index() {
  return (
    <ThemeContext.Consumer>
      {(value) =>
        <DivRow>
          <Link to="/config/BarChartDocs">
            <BarChart data={data} theme={value.theme} />
          </Link>
          <Link to="/config/PieChartDocs">
            <PieChart theme={value.theme} />
          </Link>
        </DivRow>
      }
    </ThemeContext.Consumer>
  )
}

export default Index