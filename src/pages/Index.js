import React from 'react'
import BarChartDocs from "../docs/BarChartDocs"
import BarChart from "../charts/BarChart"
import styled from "styled-components"

const DivRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
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
    <DivRow>
      <BarChartDocs />
    </DivRow>
  )
}

export default Index