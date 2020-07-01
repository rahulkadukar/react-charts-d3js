import React, { useState } from 'react'
import BarChart from "../charts/BarChart"
import BarChart1 from "../charts/BarChart1"
import ThemeContext from "../components/ThemeContext"
import { config } from "./BarChartConfig"
import styled from 'styled-components'

const data = [
  {k: "Apple", v: 17},
  {k: "Bravo", v: 12},
  {k: "Car", v: 11},
  {k: "Delta", v: 28},
  {k: "Endian", v: 14},
  {k: "France", v: 257},
  {k: "Green", v: 3}
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

const Input = (props) => {
  let inputType = 'text'
  if (props.type === 'Numeric') {
    inputType = 'number'
  }

  return <input type={inputType} value={props.value}
    onChange={(e) => props.onchange(e.target.value)}
  />
}

const configInfo = {}
config.docs.forEach((p) => {
  const r = Object.assign({}, p)
  configInfo[r.name] = r.value
})

function BarChartDocs() {
  const [chartData, setData] = useState(config)
  const [chartConfig, setConfig] = useState(configInfo)

  function applyChange() {
    const existingConfig = Object.assign({}, chartConfig)
    const configInfo = {}
    let changeDetected = false
    chartData.docs.forEach((p) => {
      configInfo[p.name] = p.value
      if (configInfo[p.name] !== existingConfig[p.name]) {
        changeDetected = true
      }
    })

    if (changeDetected === true)
      setConfig(configInfo)
  }

  function handleChange(val, id) {
    const modifiedState = chartData.docs.map((c) => Object.assign({}, c))
    modifiedState.forEach((p) => {
      if (p.name === id) {
        let changedVal = val
        if (p.type === 'Numeric') {
          changedVal = parseInt(changedVal, 10)
        }
        p.value = changedVal
      }
    })

    const fullState = Object.assign({}, chartData)
    fullState.docs = modifiedState
    setData(fullState)
  }

  return (
    <ThemeContext.Consumer>
      { (value) =>
      <div>
        {
          chartData.docs.map((p) => {
            return (
              <tr>
                <Td>{p.name}</Td>
                <Td>{p.desc}</Td>
                <Td>
                  <input
                    key={p.name}
                    value={p.value}
                    onChange={e => handleChange(e.target.value, p.name)}
                    onBlur={e => applyChange()} >
                  </input>
                </Td>
              </tr>
            )
          })
        }
        <BarChart config={chartConfig} data={data} />
      </div>
      }
    </ThemeContext.Consumer>
  )
}

export default BarChartDocs