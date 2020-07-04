const createProperty = (name, type, desc, value) => {
  return {
    name,
    type,
    desc,
    value,
  }
}
const data = [
  {k: "Apple", v: 17},
  {k: "Bravo", v: 12},
  {k: "Car", v: 11},
  {k: "Delta", v: 28},
  {k: "Endian", v: 14},
  {k: "France", v: 7},
  {k: "Green", v: 42}
]

const config = {
  "docs": [
    createProperty("barPadding", "Numeric",
      "Adjust distance between two adjacent bars.", 10),
    createProperty("barWidth", "Numeric",
      "Adjust the width of each bar. Default 50", 50),
    createProperty("marginBottom", "Numeric",
      "The margin from the bottom of the element", 20),
    createProperty("marginLeft", "Numeric",
      "The margin from the left of the element", 20),
    createProperty("marginRight", "Numeric",
      "The margin from the right of the element", 20),
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