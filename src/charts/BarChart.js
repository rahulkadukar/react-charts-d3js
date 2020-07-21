import React, { useEffect, useRef } from 'react'
import { max as d3max } from 'd3-array'
import {
  axisBottom as d3axisBottom,
  axisLeft as d3axisLeft } from 'd3-axis'
import { easeLinear as d3easeLinear } from 'd3-ease'
import {
  scaleBand as d3scaleBand,
  scaleLinear as d3scaleLinear,
  scaleOrdinal as d3scaleOrdinal } from 'd3-scale'
import { schemeCategory10 } from 'd3-scale-chromatic'
import {
  select as d3select
} from 'd3-selection'
import { transition } from "d3-transition"

/* Import all configuration from BarChartConfig */
import { config } from '../config/BarChartConfig'
const defaultConfig = {}
config.docs.forEach((p) => {
  defaultConfig[p.name] = p.value
})

const BarChart = React.memo(function BarChartD3 (props) {
  const opts = Object.assign({}, defaultConfig, props.config)
  const { data, theme } = props
  const node = useRef(null)

  useEffect(() => {
    const margin = {
      top: opts.marginTop,
      right: opts.marginRight,
      bottom: opts.marginBottom,
      left: opts.marginLeft
    }

    const temptitleHeight = 40
    const yAxisWidth = 5 + (d3max(data.map((r) => r.k.toString().length)) * 12)

    const title = opts.title ? opts.title : ''
    const titleHeight = opts.title.length === 0 ? 0 : temptitleHeight
    const parentElem = d3select(node.current).node()
    const width = parentElem.getBoundingClientRect().width - 4
    const height = margin.top + margin.bottom + temptitleHeight +
      (data.length * (opts.barWidth + opts.barPadding))

    const innerWidth = width - margin.right - margin.left - yAxisWidth
    const innerHeight = (data.length * (opts.barWidth + opts.barPadding))

    // xScale is for the length along x-axis
    const xScale = d3scaleLinear()
      .domain([0, d3max(data.map((d) => d.v))])
      .range([0, innerWidth]).nice()
    const xAxis = d3axisBottom(xScale)

    // yScale is for the names of the keys along y-axis
    const yScale = d3scaleBand()
      .domain(data.map(d => d.k))
      .range([0, innerHeight])
    const yAxis = d3axisLeft(yScale)

    // Color scale for the color of the charts
    const colorScale = d3scaleOrdinal(schemeCategory10)

    // Get the node that will be used for creating the chart
    const svg = d3select(node.current)
    svg.selectAll('*').remove()

    svg.attr("width", width)
      .attr("height", height)

    svg.append("text")
      .attr("x", Math.round(width / 2))
      .attr("y", 36)
      .attr("text-anchor", "middle")
      .style("font-size", "24px")
      .style("font-family", "Roboto")
      .text(title)

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top + titleHeight})`)

    g.append('g')
      .call(yAxis)
      .style("font-size", "1.2em")
      .attr("transform", `translate(${yAxisWidth},0)`)
      .style("font-family", "Roboto")
      .style("color", `${theme === 'dark' ? 'white' : 'black'}`)

    g.append('g')
      .call(xAxis)
      .attr("transform", `translate(${yAxisWidth}, ${innerHeight})`)
      .style("font-size", "1em")
      .style("color", `${theme === 'dark' ? 'white' : 'black'}`)

    const allBars = g.attr("width", innerWidth)
      .attr("height", innerHeight)
      .selectAll("rect").data(data)

    allBars.enter()
        .append("rect")
        .attr("x", 1 + yAxisWidth)
        .attr("y", d => Math.round(yScale(d.k)) + (opts.barPadding / 2))
        .attr("width", 1)
      .merge(allBars)
        .attr("height", opts.barWidth)
        .style("fill", d => colorScale(d.k))
      .transition()
        .duration(1000)
        .ease(d3easeLinear)
        .attr("width", d => Math.round(xScale(d.v)))

  }, [props])

  return (
    <svg width="100%" className="d3-class" ref={node} />
  )
})

export default BarChart
