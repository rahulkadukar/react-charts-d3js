import React, { useState } from 'react'
import BarChart from "../charts/BarChart"
import ThemeContext from "../components/ThemeContext"
import { config } from "./BarChartConfig"
import styled from 'styled-components'
console.log(config)
const data = [
  {k: "A", v: 17},
  {k: "B", v: 12},
  {k: "C", v: 11},
  {k: "D", v: 28},
  {k: "E", v: 14},
  {k: "F", v: 25}
]

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Table = styled.table`
  border: 1px solid orange;
  margin: 20px;
  width: calc(100% - 40px);
`

const Th = styled.th`
  border: 1px solid gray;
  padding: 15px 10px;
  font-size: 20px;
  text-align: left;
`

const Td = styled.td`
  padding: 15px 10px;
  font-size: 16px;
  border: 1px solid black;
`

const APIConfig = (props) => {
  return <SubContainer>
    {props.children}
  </SubContainer>
}

function BarChartDocs() {
  //const [config, setConfig] = useState(config)

  const BarChartConfig = (props) => {
    return (
      <APIConfig>
        <Table width="100%">
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Value</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>data</Td>
              <Td>The input data that will be used to create the Bar Chart</Td>
              <Td>{JSON.stringify(data)}</Td>
            </tr>
            {
              config.docs.map((p) => {
                return (
                  <tr>
                    <Td>{p.name}</Td>
                    <Td>{p.desc}</Td>
                    <Td>{p.value}</Td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </APIConfig>
    )  
  }

  const chartConfig = {}

  config.docs.forEach((p) => {
    chartConfig[p.name] = p.value
  })
  
  return (
    <ThemeContext.Consumer>
      { (value) =>
      <div>
        <BarChart config={chartConfig} data={data} theme={value.theme} />
        <BarChartConfig /> 
      </div>
      }
    </ThemeContext.Consumer>
  )
}

export default BarChartDocs