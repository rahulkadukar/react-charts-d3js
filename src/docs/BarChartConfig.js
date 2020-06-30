const createProperty = (name, type, desc, value) => {
  return {
    name,
    type,
    desc,
    value,
  }
}

const config = {
  "docs": [
    createProperty("barPadding", "Numeric",
      "Adjust distance between two adjacent bars.", 2),
    createProperty("barWidth", "Numeric",
      "Adjust the width of each bar. Default 50", 50),
    createProperty("marginBottom", "Numeric",
      "The margin from the bottom of the element", 20),
    createProperty("marginLeft", "Numeric",
      "The margin from the left of the element", 40),
    createProperty("marginRight", "Numeric",
      "The margin from the right of the element", 20),
    createProperty("marginTop", "Numeric",
      "The margin from the top of the element", 20),
    createProperty("title", "String",
      "The title to display on the chart", ""),
  ]
}

module.exports = {
  config
}