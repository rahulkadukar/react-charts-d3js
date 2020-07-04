const createProperty = (name, type, desc, value) => {
  return {
    name,
    type,
    desc,
    value,
  }
}
const data = [
  {k: "2019-01-01", v: 17},
  {k: "2019-01-16", v: 27},
  {k: "2019-02-01", v: 12},
  {k: "2019-03-01", v: 11},
  {k: "2019-04-01", v: 28},
  {k: "2019-05-01", v: 14},
  {k: "2019-06-01", v: 7},
  {k: "2019-07-01", v: 42}
]

const config = {
  "docs": [
    createProperty("barPadding", "Numeric",
      "Adjust distance between two adjacent bars.", 10),
    createProperty("barWidth", "Numeric",
      "Adjust the width of each bar. Default 50", 50),
    createProperty("marginBottom", "Numeric",
      "The margin from the bottom of the element", 40),
    createProperty("marginLeft", "Numeric",
      "The margin from the left of the element", 20),
    createProperty("marginRight", "Numeric",
      "The margin from the right of the element", 40),
    createProperty("marginTop", "Numeric",
      "The margin from the top of the element", 20),
    createProperty("title", "Text",
      "The title to display on the chart", "Title")
  ]
}

module.exports = {
  config,
  data,
}