import React, { useEffect, useRef } from 'react'
import { max as d3max } from 'd3-array'
import {
  axisBottom as d3axisBottom,
  axisLeft as d3axisLeft } from 'd3-axis'
import { easeLinear as d3easeLinear } from 'd3-ease'
import { hierarchy as d3hierarchy,
  partition as d3partition } from "d3-hierarchy";
import {
  scaleBand as d3scaleBand,
  scaleLinear as d3scaleLinear,
  scaleOrdinal as d3scaleOrdinal } from 'd3-scale'
import { schemeCategory10 } from 'd3-scale-chromatic'
import {
  create as d3create,
  select as d3select
} from 'd3-selection'
import { arc as d3arc } from "d3-shape";
import { transition } from "d3-transition"

/* Import all configuration from PieChartConfig */
import { config } from '../config/PieChartConfig'
const defaultConfig = {}
config.docs.forEach((p) => {
  defaultConfig[p.name] = p.value
})

const PieChart = React.memo(function BarChartD3 (props) {
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

    const title = opts.title ? opts.title : ''
    const titleHeight = opts.title.length === 0 ? 0 : temptitleHeight
    const parentElem = d3select(node.current).node()
    const width = parentElem.getBoundingClientRect().width - 4
    const height = margin.top + margin.bottom + temptitleHeight
      + (2 * opts.radius)
    const innerWidth = width - margin.right - margin.left// - yAxisWidth
    const innerHeight = (data.length * (opts.barWidth + opts.barPadding))

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
      .attr("transform", `translate(${width/2}, ${height/2})`)

    /* EXPLANATION
      https://github.com/d3/d3-hierarchy#hierarchy
    */
    const root = d3hierarchy(data)
      .sum((d) => d.size)

    /* EXPLANATION
      https://bl.ocks.org/denjn5/e1cdbbe586ac31747b4a304f8f86efa5
     */

    const widthOfArc = Math.floor((opts.radius / (1 + (opts.maxDepth < root.height ? opts.maxDepth : root.height)) * (root.height + 1)))
    const partition = d3partition()
      .size([2 * Math.PI, widthOfArc]);
    partition(root)

    const arcGenerator = d3arc()
      .startAngle(function (d) { return d.x0 })
      .endAngle(function (d) { return d.x1 })
      .innerRadius(function (d) { return d.y0 })
      .outerRadius(function (d) { return d.y1 })

    const depthCalculator = d => {
      if (d.depth > opts.maxDepth || d.depth === 0) {
        return "none"
      }
    }

    const colorForSection = d => {
      if (d.parent !== null) {
        let c = Object.assign({}, d)
        while (c.parent.data.name !== data.name) { c = c.parent }
        return c.data.name
      }
      return ((d.children ? d : d.parent).data.name)
    }

    const computeRotation = d => {
      let angle = ((d.x0 + d.x1) / Math.PI) * 90
      return (angle < 120 || angle > 270) ? angle : angle + 180;
    }

    /* EXPLANATION
    const abcd = d3hierarchy(data)
        .sum((d) => d.size);
    d3partition().size([2 * Math.PI, opts.radius])(abcd)

    const allSquares = g.selectAll('.hier')
        .data(abcd.descendants())

    allSquares.enter()
        .append('rect')
        .attr("class","hier")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .style("fill", d => colorScale(colorForSection(d)));
    */

    const allArcs = g.selectAll('.sbpie')
      .data(root.descendants())

    allArcs.enter()
        .append('g')                  // For the text nodes
        .attr("class", "node")  // For the text nodes
        .append('path')
        .attr("class", "sbpie")
        .attr("display", depthCalculator)
        .attr("d", arcGenerator)
        .style('stroke', '#fff')
        .style("fill", d => colorScale(colorForSection(d)));

    g.selectAll(".node")
      .append("text")
      .attr("transform",(d) => {
        return `translate(${arcGenerator.centroid(d)}) rotate(${computeRotation(d)})`
      })
      .attr("dx", "-20")
      .attr("dy", "1em")
      .attr("display", depthCalculator)
      .text(function(d) { return d.parent ? d.data.name : "" });

  })

  return (
    <svg width="100%" className="d3-class" ref={node} />
  )
})

export default PieChart
