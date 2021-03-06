import React, { useEffect, useRef } from 'react'
import { hierarchy as d3hierarchy,
  partition as d3partition } from "d3-hierarchy";
import { interpolate as d3interpolate } from "d3-interpolate";
import {
  scaleOrdinal as d3scaleOrdinal } from 'd3-scale'
import { schemeCategory10 } from 'd3-scale-chromatic'
import {
  select as d3select
} from 'd3-selection'
import { arc as d3arc } from "d3-shape"
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

  function drawSunburst() {
    console.log('AX')
  }

  useEffect(() => {
    opts._margin = {
      top: opts.marginTop,
      right: opts.marginRight,
      bottom: opts.marginBottom,
      left: opts.marginLeft
    }

    const temptitleHeight = 40

    opts._title = opts.title ? opts.title : ''
    opts._titleHeight = opts.title.length === 0 ? 0 : temptitleHeight
    const parentElem = d3select(node.current).node()
    opts._width = parentElem.getBoundingClientRect().width - 4
    opts._height = opts._margin.top + opts._margin.bottom + temptitleHeight
      + (2 * opts.radius)
    opts._innerWidth = opts._width - opts._margin.right - opts._margin.left
    opts._innerHeight = (data.length * (opts.barWidth + opts.barPadding))

    // Color scale for the color of the charts
    const colorScale = d3scaleOrdinal(schemeCategory10)

    // Get the node that will be used for creating the chart
    const svg = d3select(node.current)
    svg.selectAll('*').remove()

    svg.attr("width", opts._width)
      .attr("height", opts._height)

    svg.append("text")
      .attr("x", Math.round(opts._width / 2))
      .attr("y", 36)
      .attr("text-anchor", "middle")
      .style("font-size", "24px")
      .style("font-family", "Roboto")
      .text(opts._title)

    const g = svg.append("g")
      .attr("transform", `translate(${opts._width/2}, ${opts._height/2})`)

    /* EXPLANATION: https://github.com/d3/d3-hierarchy#hierarchy */
    const root = d3hierarchy(data)
      .sum((d) => d.size)
      .sort((a, b) => b.value - a.value)

    /* EXPLANATION: https://bl.ocks.org/denjn5/e1cdbbe586ac31747b4a304f8f86efa5 */
    const widthOfArc = Math.floor((opts.radius /
      (1 + (opts.maxDepth < root.height ? opts.maxDepth : root.height)) * (root.height + 1)))
    const partition = d3partition()
      .size([2 * Math.PI, widthOfArc]);
    partition(root)

    const arcGenerator = d3arc()
      .startAngle(d => {d.x0s = d.x0; return d.x0})
      .endAngle(d => {d.x1s = d.x1; return d.x1})
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1)

    const arcGeneratorText = (d) => {
      const { x0, x1, y0, y1 } = d
      const halfRadius = Math.round((y1 - y0) / 2)
      return arcGenerator({
        x0: x0,
        x1: x1,
        y0: y1 - (halfRadius) - 1,
        y1: y1 - (halfRadius)
      })
    }

    const depthCalculator = d => {
      if (d.depth > opts.maxDepth) {
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
      return (angle < 95 || angle > 270) ? "25%" : "75%"
    }

    const generateId = d => {
      return `${d.data.name}_${d.depth}_${d.height}`
    }

    const createHrefLink = d => {
      return `#${generateId(d)}`
    }

    /* BEGIN OF EXPLANATION */
    //
    /*
    const abcd = d3hierarchy(data)
        .sum((d) => d.size);
    d3partition().size([2 * Math.PI * 20, opts.radius])(abcd)

    const allSquares = g.selectAll('.hier')
      .data(abcd.descendants())

    allSquares.enter()
      .append('rect')
      .attr("class","hier")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .style("fill", d => colorScale(colorForSection(d)))
      .attr("transform", `translate(-${opts._width/4}, 0)`)


    */
    /* END OF EXPLANATION */
    const allArcs = g.selectAll('.sbpie')
      .data(root.descendants())

    const sss = allArcs.enter()
      .append('g')            // For the text nodes
      .attr("class", "node")  // For the text nodes
      .append('path')
      .attr("class", "sbpie")
      .attr("display", depthCalculator)
      .attr("d", arcGenerator)
      .attr("pointer-events", "all")
      .on("click", clicked)
      .style('stroke', '#fff')
      .style("fill", d => colorScale(colorForSection(d)))

    g.selectAll(".node")
      .append("path")
      .attr("id", generateId)
      .attr("d", arcGeneratorText)
      .style("fill", d => colorScale(colorForSection(d)))
      .attr("display", depthCalculator)

    g.selectAll(".node")
      .append("text")
      .attr("display", depthCalculator)
      .attr("dy", "8")
      .append("textPath")
      .attr("xlink:href", createHrefLink)
      .attr("text-anchor", "middle")
      .attr("startOffset", computeRotation)
      .text(d => d.data.name)

    function clicked(p) {
      try {
        console.log('I AM HERE')
        console.log(p.parent || root)
        const arcWidth = widthOfArc / (root.height + 1)
        root.each((d) => {
          d.target = {
            x0: Math.max(0, Math.min(1, ((d.x0 - p.x0) / (p.x1 - p.x0)))) * 2 * Math.PI,
            x1: Math.max(0, Math.min(1, ((d.x1 - p.x0) / (p.x1 - p.x0)))) * 2 * Math.PI,
            y0: Math.max(0, d.y0 - p.depth * arcWidth),
            y1: Math.max(0, d.y1 - p.depth * arcWidth)
          }
        })

        //root.each(d => console.log(d.target))

        const t = allArcs.transition().duration(750);

        sss.transition(t)
            .tween("data", d => {
              const i = d3interpolate(d.current, d.target);
              return t => d.current = i(t);
            })
            .filter(function (d) {
              console.log('X')
              return +this.getAttribute("fill-opacity") || depthCalculator(d.depth);
            })
            .attr("fill-opacity", d => depthCalculator(d.target) ? (d.children ? 0.6 : 0.4) : 0)
            .attrTween("d", d => () => d3arc(d.current));
      } catch (excp) {
        console.log(excp.message)
      }

    }
    /*
      parent.datum(p.parent || root);

      root.each(d => d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth)
      });

      const t = g.transition().duration(750);

      // Transition the data on all arcs, even the ones that aren’t visible,
      // so that if this transition is interrupted, entering arcs will start
      // the next transition from the desired position.
      path.transition(t)
          .tween("data", d => {
            const i = d3.interpolate(d.current, d.target);
            return t => d.current = i(t);
          })
          .filter(function(d) {
            return +this.getAttribute("fill-opacity") || arcVisible(d.target);
          })
          .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
          .attrTween("d", d => () => arc(d.current));

      label.filter(function(d) {
        return +this.getAttribute("fill-opacity") || labelVisible(d.target);
      }).transition(t)
          .attr("fill-opacity", d => +labelVisible(d.target))
          .attrTween("transform", d => () => labelTransform(d.current));
    }

     */
  }, [props])

  return (
    <svg width="100%" className="d3-class" ref={node} />
  )
})

export default PieChart
