import React, { Component } from 'react'
import {select, selectAll} from 'd3-selection';

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

    const svg = select(node)
      .attr("width", 50)
      .attr("height", 50)

    selectAll("p").style("color", "blue");
  }

  render() {
    return (
      <div className="container" style={{marginTop: '10px'}}>
        <svg className="d3-class" ref={node => this.node = node}></svg>
        <p>Random</p>
      </div>
    );
  }
}

export default Index
