import React, {useState, useEffect, useRef} from 'react'
import {select as d3select} from "d3-selection";

function About (props) {
  const node = useRef(null)

  useEffect(() => {
    const parentElem = d3select(node.current).node()
    const width = parentElem.getBoundingClientRect().width - 4
    const height = 400

    // Get the node that will be used for creating the chart
    const svg = d3select(node.current)
    svg.selectAll('*').remove()

    svg.attr("width", width)
      .attr("height", height)

    svg.append("circle")
      .attr("cx", 200)
      .attr("cy", 200)
      .attr("r", 100)
      .attr("fill", "red")
  }, [])

  return (
    <svg width="100%" className="d3-class" ref={node} />
  )
}

export default About
