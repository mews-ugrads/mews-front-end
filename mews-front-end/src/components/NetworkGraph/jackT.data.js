module.exports = {
    nodes: [
        { id: 1, group:1, charge: -500},
        {id: 2, group:1, charge: -500},
        {id:3, group:1, charge: -400},
        {id:4, group:1, charge: -500},
        {id:5, group: 2, charge: 0},
        {id:6, group:2, charge: 0},
        {id:7, group:2, charge: 0}
    ],
    links: [
      {source: 1, target: 2},
      {source:1, target:3},
      {source:1, target:4},
      {source:5, target:6},
      {source:5, target:7}

    ],
  };