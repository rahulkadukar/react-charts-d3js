import React, { useEffect, useRef } from 'react'
import { extent as d3extent,
  max as d3max,
  min as d3min } from 'd3-array'
import {
  axisBottom as d3axisBottom,
  axisLeft as d3axisLeft } from 'd3-axis'
import { easeLinear as d3easeLinear } from 'd3-ease'
import {
  scaleBand as d3scaleBand,
  scaleLinear as d3scaleLinear,
  scaleOrdinal as d3scaleOrdinal,
  scaleTime as d3scaleTime,
  scaleUtc as d3scaleUtc } from 'd3-scale'
import { schemeCategory10 } from 'd3-scale-chromatic'
import {
  create as d3create,
  select as d3select
} from 'd3-selection'
import { curveMonotoneX as d3curveMonotoneX,
  line as d3line} from "d3-shape"
import { timeDay as d3timeDay } from "d3-time"
import { transition } from "d3-transition"

/* Import all configuration from BarChartConfig */
import { config } from '../config/LineChartConfig'
const defaultConfig = {}
config.docs.forEach((p) => {
  defaultConfig[p.name] = p.value
})

const LineChart = React.memo(function BarChartD3 (props) {
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
    const yAxisWidth = 5 + (d3max(data.map((r) => r.v.toString().length)) * 12)

    const title = opts.title ? opts.title : ''
    const titleHeight = opts.title.length === 0 ? 0 : temptitleHeight
    const parentElem = d3select(node.current).node()
    const width = parentElem.getBoundingClientRect().width - 4
    const height = margin.top + margin.bottom + temptitleHeight +
      (data.length * (opts.barWidth + opts.barPadding))

    const innerWidth = width - margin.right - margin.left - yAxisWidth
    const innerHeight = (data.length * (opts.barWidth + opts.barPadding))

    // xScale is for the length along x-axis
    const minDate = d3min(data.map((d) => d.k))
    const xScale = d3scaleUtc()
      .domain(d3extent(data.map(d => new Date(`${d.k}T00:00:00`))))
      .range([0, innerWidth]).nice()
    const xAxis = d3axisBottom(xScale)

    // yScale is for the names of the keys along y-axis
    const yScale = d3scaleLinear()
      .domain(d3extent(data.map(d => d.v)))
      .range([innerHeight, 0]).nice()
    const yAxis = d3axisLeft(yScale)

    const pathData = d3line().curve(d3curveMonotoneX)
        .x(d => xScale( new Date(`${d.k}T00:00:00`)))
        .y(d => yScale(d.v))

    const createXGrid = () => d3axisBottom(xScale).tickArguments([d3timeDay.every(7)]);
    const createYGrid = () => d3axisLeft(yScale)

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
      .attr("width", innerWidth)
      .attr("height", innerHeight)
      .attr("transform", `translate(${margin.left}, ${margin.top + titleHeight})`)

    g.append('g')
      .call(yAxis)
      .style("font-size", "1.2em")
      .attr("transform", `translate(${yAxisWidth},0)`)
      .style("font-family", "Roboto")
      .style("color", `${theme === 'dark' ? 'white' : 'black'}`)

    g.append("g")
      .attr("class", "xgrid")
      .attr("transform", `translate(${yAxisWidth}, ${innerHeight})`)
      .call(createXGrid().tickSize(-innerHeight).tickFormat(""))
      .style('stroke-width', 0.2)

    g.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${yAxisWidth}, 0)`)
      .call(createYGrid().tickSize(-innerWidth).tickFormat(""))
      .style('stroke-width', 0.2)

    g.append('g')
      .call(xAxis)
      .attr("transform", `translate(${yAxisWidth}, ${innerHeight})`)
      .style("font-size", "1em")
      .style("color", `${theme === 'dark' ? 'white' : 'black'}`)

    g.append('path')
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("transform", `translate(${yAxisWidth},0)`)
        .attr("d", pathData);

  }, [props])

  return (
    <svg width="100%" className="d3-class" ref={node} />
  )
})

export default LineChart
