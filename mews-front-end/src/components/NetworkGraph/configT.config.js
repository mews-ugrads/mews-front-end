module.exports =  {
    nodeHighlightBehavior: true,
    height: 1000,
    width:1000,
    focusAnimationDuration: 0.75,
    focusZoom: 1,
    node: {
    color: "lightgreen",
    size: 600,
    highlightStrokeColor: "blue",
    labelProperty: "central",
    svg:"",
    },
    link: {
    highlightColor: "lightblue",
    strokeWidth: 5,
    },
    d3: {
    gravity: -275,
    linkStrength: .9,
    linkLength: 10,
    }
};