module.exports =  {
    nodeHighlightBehavior: true,
    height: 1000,
    width:1000,
    focusAnimationDuration: 0.75,
    maxZoom: 8, 
    minZoom: .05, 
    focusZoom: 6,
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
    gravity: -270,
    linkStrength: .5,
    linkLength: 1,
    }
};