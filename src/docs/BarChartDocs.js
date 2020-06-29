import React from 'react'
import BarChart from "../charts/BarChart"
import ThemeContext from "../components/ThemeContext"

const data = [
  {k: "A", v: 1},
  {k: "B", v: 2},
  {k: "C", v: 23},
  {k: "D", v: 4},
  {k: "E", v: 4},
  {k: "F", v: 4},
  {k: "G", v: 4}
]

function BarChartDocs() {
  return (
    <ThemeContext.Consumer>
      { (value) => <BarChart data={data} theme={value.theme} /> }
    </ThemeContext.Consumer>
  )
}

export default BarChartDocs