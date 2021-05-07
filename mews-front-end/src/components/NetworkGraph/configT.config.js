module.exports =  {
    nodeHighlightBehavior: true,
    height: 700,
    width:1200,
    focusAnimationDuration: 0.75,
    maxZoom: 8, 
    minZoom: .05, 
    focusZoom: 6,
    initialZoom: .4,
    node: {
    color: "lightgreen",
    size: 600,
    highlightStrokeColor: "blue",
    labelProperty: "central",
    svg:"",
    boxes:"",
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