import React, { Component } from 'react'
import {
  select as d3select,
  selectAll
} from 'd3-selection';
import {
  scaleLinear as d3scaleLinear
} from 'd3-scale';


const data = [
  {k: "A", v: 1},
  {k: "B", v: 2},
  {v: 3},
  {v: 4},
  {v: 5}
]

class Index extends Component {
  constructor(props) {
    super(props)
    this.createD3Chart = this.createD3Chart.bind(this)
  }

  componentDidMount() {
    this.createD3Chart()
  }

  createD3Chart() {
    const node = this.node
    const width = 1000
    const height = 400

    const xAxisScale = d3scaleLinear()
      .domain([0, data.length])
      .range([0, width])

    const svgabc = d3select(node)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", 100)
        .attr("height", (d, i) => d.v * 50)
        .attr("x", (d, i) => d.v * 40)
        .style("fill", "yellow")


  }

  render() {
    return (
      <div className="container" style={{marginTop: '10px'}}>
        <div className="d3-class" ref={node => this.node = node}></div>
        <p>Random</p>
      </div>
    );
  }
}

export default Index
