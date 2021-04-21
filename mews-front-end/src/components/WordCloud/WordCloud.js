import React from 'react';
import * as d3 from 'd3';

function WordCloud = () => {
    fontFamily = "sans-serif"
    fontScale = 15
    rotate = () => 0 // () => (~~(Math.random() * 6) - 3) * 30
    padding = 0
    height = 500
    words = Array(811) ["happy", "join", "today", "go", "history"]
    words = source.split(/[\s.]+/g)
        .map(w => w.replace(/^[“‘"\-—()\[\]{}]+/g, ""))
        .map(w => w.replace(/[;:.!?()\[\]{},"'’”\-—]+$/g, ""))
        .map(w => w.replace(/['’]s$/g, ""))
        .map(w => w.substring(0, 30))
        .map(w => w.toLowerCase())
        .filter(w => w && !stopwords.has(w))

}