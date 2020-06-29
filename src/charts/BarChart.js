import React, { useEffect, useRef } from 'react'
import { max as d3max } from 'd3-array'
import {
  axisBottom as d3axisBottom,
  axisLeft as d3axisLeft } from 'd3-axis'
import {
  scaleBand as d3scaleBand,
  scaleLinear as d3scaleLinear,
  scaleOrdinal as d3scaleOrdinal } from 'd3-scale'
import { schemeCategory10 } from 'd3-scale-chromatic'
import { select as d3select } from 'd3-selection'

const BarChart = (props) => {
  console.log(props)
  const { data, theme } = props
  const node = useRef(null)

  useEffect(() => {
    const width = window.innerWidth - 20
    const height = 400
    const margin = { top: 20, right: 20, bottom: 20, left: 60}

    const innerWidth = width - margin.right - margin.left
    const innerHeight = height - margin.top - margin.bottom

    // xScale is for the length along x-axis
    const xScale = d3scaleLinear()
      .domain([0, d3max(data.map((d) => d.v))])
      .range([0, innerWidth])
    const xAxis = d3axisBottom(xScale)

    // yScale is for the names of the keys along y-axis
    const yScale = d3scaleBand()
      .domain(data.map(d => d.k))
      .range([0, innerHeight])
    const yAxis = d3axisLeft(yScale)

    // Color scale for the color of the charts
    const colorScale = d3scaleOrdinal(schemeCategory10)

    // Get the node that will be used for creating the chart
    const svg = d3select(node.current);

    svg.attr("width", width)
      .attr("height", height)

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)

    g.append('g')
      .call(yAxis)
      .style("font-size", "1.2em")
      .style("color", `${theme === 'dark' ? 'white' : 'black'}`)

    g.append('g')
      .call(xAxis)
      .attr("transform", `translate(0, ${innerHeight})`)
      .style("font-size", "1em")
      .style("color", `${theme === 'dark' ? 'white' : 'black'}`)

    g.attr("width", innerWidth)
      .attr("height", innerHeight)
      .selectAll("rect").data(data)
      .enter()
      .append("rect")
      .attr("x", 1)
      .attr("y", d => yScale(d.k) + 5)
      .attr("width", d => xScale(d.v))
      .attr("height", yScale.bandwidth() - 10)
      .style("fill", d => colorScale(d.k))
  })

  return (
    <svg className="d3-class" ref={node} />
  )
}

export default BarChart
