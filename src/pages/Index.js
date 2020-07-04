import React from 'react'
import BarChart from "../charts/BarChart"
import PieChart from "../charts/PieChart"
import {Link as ReactRouterLink, Route} from "react-router-dom"
import ThemeContext from "../components/ThemeContext";
import styled  from 'styled-components'

import { data as barData } from '../config/BarChartConfig'
import { data as pieData } from '../config/PieChartConfig'

const DivRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const Link = styled(ReactRouterLink)`
  color: white;
  text-decoration: none;
`

function Index() {
  return (
    <ThemeContext.Consumer>
      {(value) =>
        <DivRow>
          <Link to="/config/BarChartDocs">
            <BarChart data={barData} theme={value.theme} />
          </Link>
          <Link to="/config/PieChartDocs">
            <PieChart data={pieData} theme={value.theme} />
          </Link>
        </DivRow>
      }
    </ThemeContext.Consumer>
  )
}

export default Index