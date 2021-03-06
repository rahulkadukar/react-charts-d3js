const createProperty = (name, type, desc, value) => {
  return {
    name,
    type,
    desc,
    value,
  }
}

const data = {
  "name": "TOPICS", "children": [{
    "name": "Topic A and B are so long that they curve",
    "children": [
      { "name": "Sub A2",
        "children": [
          { "name": "Sub A222",
            "children": [
              { "name": "Sub L", "size": 1},
              { "name": "Sub XL", "size": 1}
            ]
          },
          {"name": "Sub A2E", "size": 3}
        ]
      },
      { "name": "Sub A1",
        "children": [
          { "name": "Sub AA1",
            "children": [
              { "name": "Sub AAA1", "size": 3},
              { "name": "Sub AAA2", "size": 4}
            ]},
          { "name": "Sub AA2", "size": 6 }
        ]
      }
    ]
  }, {
    "name": "Topic B",
    "children": [
      {"name": "Sub B1", "size": 3},
      {"name": "Sub B2", "size": 3},
      {"name": "Sub B3", "size": 3}
    ]
  }, {
    "name": "Topic C",
    "children": [
      {"name": "Sub A1", "size": 4},
      {"name": "Sub A212", "size": 4}
    ]
  }]
};

const config = {
  "docs": [
    createProperty("marginBottom", "Numeric", "The margin from the bottom of the element", 20),
    createProperty("marginLeft", "Numeric", "The margin from the left of the element", 20),
    createProperty("marginRight", "Numeric", "The margin from the right of the element", 20),
    createProperty("marginTop", "Numeric", "The margin from the top of the element", 20),
    createProperty("maxDepth", "Numeric", "Maximum number of layers in the Sunburst", 4),
    createProperty("radius", "Numeric", "The total radius of the Pie chart", 360),
    createProperty("title", "Text", "The title to display on the chart", "Title")
  ]
}

module.exports = {
  config,
  data,
}