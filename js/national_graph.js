import { columnMapping, drawBarChart } from './utils.js';

let nationalData = [];
let svg, width, height, margin, chartWidth, chartHeight;

const tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("position", "absolute")
  .style("background", "#fff")
  .style("border", "1px solid #999")
  .style("padding", "5px")
  .style("border-radius", "3px")
  .style("pointer-events", "none")
  .style("opacity", 0);

export function initGraph(data) {
  nationalData = data.map(row => {
    const filteredRow = {};
    Object.entries(row).forEach(([key, value]) => {
        if (!key.toLowerCase().includes('pct') && !key.toLowerCase().includes('gen') && !key.toLowerCase().includes('sum')) {
            filteredRow[key] = value;
        }
    });
    return filteredRow;
});;
  svg = d3.select("#graph-countries");
  margin = { top: 40, right: 30, bottom: 150, left: 60 };
  width = svg.node().getBoundingClientRect().width;
  height = svg.node().getBoundingClientRect().height;
  chartWidth = width - margin.left - margin.right;
  chartHeight = height - margin.top - margin.bottom;
  if (width <= 0 || height <= 0 || isNaN(width) || isNaN(height)) {
    console.error("INVALID SVG DIMENSIONS:", { width, height });
    svg.append("text")
      .attr("x", 50)
      .attr("y", 50)
      .attr("text-anchor", "start")
      .style("font-size", "14px")
      .text("Graph rendering failed: Invalid SVG size");
    return false;
  }
  return true;
}

export function drawGraph(countryCode, year) {
  svg.selectAll("*").remove();

  if (!countryCode || !year) {
    console.error("INVALID INPUTS:", { countryCode, year });
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Invalid country or year");
    return;
  }

  const dataForCountry = nationalData.filter(d => d.name === countryCode && d.year === year);
  if (!dataForCountry) {
    console.error("NO DATA FOUND FOR:", { countryCode, year });
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("No data available for this country and year");
    return;
  }

  const row = dataForCountry[0];
  const entries = Object.entries(row).filter(([key]) => 
    key !== "year" && 
    key !== "state" && 
    key !== "name" && 
    key !== "Version" && 
    key !== "sourcecode" && 
    !key.includes("total") && 
    !key.includes("datatype") && 
    !key.includes("recreliab") && 
    !key.includes("sourcereliab") &&
    !key.includes("pop"));
  const religionData = entries
    .map(([key, value]) => {
          const cleanedValue = parseInt(String(value).replace(/,/g, ''), 10);
          return [key, cleanedValue];
      })
    .filter(([key, value]) => !isNaN(value) && Number(value) !== 0)
    .map(([key, value]) => {
        return {
            religion: columnMapping[key] || key,
            population: isNaN(value) ? 0 : value
      };
    });

  if (religionData.length === 0) {
    console.warn("NO VALID RELIGION DATA FOR:", { countryCode, year });
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("No religion data available");
    return;
  }

  const barData = religionData.map(d => ({
    label: d.religion,   // or whatever label
    value: d.population, // or population %
  }));

  drawBarChart({svg,data: barData, tooltip, margin, width, height, yLabel: "Number of People"});
}

export function resetGraph() {
  // RESET CHART TO EMPTY STATE
  svg.selectAll("*").remove();
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Select a country to view religion data");
}