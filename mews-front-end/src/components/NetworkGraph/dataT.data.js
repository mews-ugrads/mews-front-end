module.exports = {
    nodes: [{ id: "Harry", age:"10", svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/marvel.png",}, 
    { id: "Sally", age:12 },
    { id: "Alice", age:45 },
    {id: "Jack", age:21}
    ],
    links: [
      { source: "Harry", target: "Sally" },
      { source: "Harry", target: "Alice" },
      { source: "Jack", target:"Jack"}
    ],
  };