import React, { useState } from 'react'
import BarChart from "../charts/BarChart"
import ThemeContext from "../components/ThemeContext"
import { config, data } from "../config/BarChartConfig"
import styled from 'styled-components'

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
  padding: 10px 10px;
  font-size: 16px;
  border: 1px solid black;
`

const InputStyled = styled.input`
  font-size: 16px;
  border: 0px solid black;
  width: 100px;
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

  return <InputStyled type={inputType} value={props.value}
    onChange={(e) => { props.onchange(e.target.value, props.name) }}
    onBlur={() => props.onblur() }
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
          changedVal = parseInt(changedVal, 10) || 0
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
              <Td>Input data (array of objects)</Td>
            </tr>
            {
              chartData.docs.map((p, i) => {
                return (
                  <tr key={i}>
                    <Td>{p.name}</Td>
                    <Td>{p.desc}</Td>
                    <Td>
                      <Input name={p.name} value={p.value} type={p.type}
                        onchange={handleChange}
                        onblur={applyChange} />
                    </Td>
                  </tr>
                )
              })
            }
            </tbody>
          </Table>
        </APIConfig>
        <BarChart config={chartConfig} data={data} theme={value.theme} />
      </div>
      }
    </ThemeContext.Consumer>
  )
}

export default BarChartDocs