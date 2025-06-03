import { columnMapping, drawBarChart } from './utils.js';

let regionalData = [];
let svg, width, height, margin, chartWidth, chartHeight;

// CREATE TOOLTIP DIV
const tooltip = d3.select("body")
  .append("div")
  .attr("class", "regionalTooltip")
  .style("position", "absolute")
  .style("background", "#fff")
  .style("border", "1px solid #999")
  .style("padding", "5px")
  .style("border-radius", "3px")
  .style("pointer-events", "none")
  .style("opacity", 0);

export function initRegionalGraph(data) {
    regionalData = data.map(row => {
    const filteredRow = {};
    Object.entries(row).forEach(([key, value]) => {
        if (!key.toLowerCase().includes('pct') && !key.toLowerCase().includes('gen') && !key.toLowerCase().includes('sum')) {
            filteredRow[key] = value;
        }
    });
    return filteredRow;
});;
  svg = d3.select("#graph-continents");
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

export function drawRegionalGraph(continentCode, year) {
    svg.selectAll("*").remove();

    if (!continentCode || !year) {
    console.error("INVALID INPUTS:", { continentCode, year });
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Invalid country or year");
    return;
  }

  let dataForContinent;
    if (Array.isArray(continentCode)) {
    // Filter all matching regions for given year
    const filteredData = regionalData.filter(d =>
        continentCode.includes(d.region) && d.year === year
    );
    // Sum values by key
    const mergedData = filteredData.reduce((acc, curr) => {
        Object.entries(curr).forEach(([key, value]) => {
        if (key !== "region" && key !== "year") {
            const numericValue = parseFloat(String(value).replace(/,/g, ''));
            acc[key] = (acc[key] || 0) + (isNaN(numericValue) ? 0 : numericValue);
        } else {
            acc[key] = curr[key]; // keep region/year from last entry (optional)
        }
        });
        return acc;
    }, {});
    dataForContinent = [mergedData]; // wrap in array to keep structure consistent
    } else {
    // Single region case
    dataForContinent = regionalData.filter(
        d => d.region === continentCode && d.year === year
    );
    }

  if (!dataForContinent) {
    console.error("NO DATA FOUND FOR:", { countryCode, year });
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("No data available for this country and year");
    return;
  }
  const row = dataForContinent[0];
  const entries = Object.entries(row).filter(([key]) => 
    key !== "year" && 
    key !== "region" && 
    key !== "name" && 
    key !== "version" && 
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
    .filter(([key, value]) => !isNaN(value) && value !== 0)
    .map(([key, value]) => {
        return {
            religion: columnMapping[key] || key,
            population: value
        };
    });
    if (religionData.length === 0) {
        console.warn("NO VALID RELIGION DATA FOR:", { continentCode, year });
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
  console.info("BAR DATA REGIONAL:", barData);
  drawBarChart({svg,data: barData,tooltip,margin,width,height,yLabel: "Number of People"});



  // // SET UP SCALES
  // const x = d3.scaleBand()
  //   .domain(religionData.map(d => d.religion))
  //   .range([margin.left, chartWidth + margin.left])
  //   .padding(0.1);

  //   const maxPopulation = d3.max(religionData, d => Number(d.population));
  // console.info("MAX POPULATION:", maxPopulation);
  // if (isNaN(maxPopulation) || maxPopulation <= 0) {
  //   console.error("INVALID MAX POPULATION:", maxPopulation);
  //   svg.append("text")
  //     .attr("x", width / 2)
  //     .attr("y", height / 2)
  //     .attr("text-anchor", "middle")
  //     .style("font-size", "14px")
  //     .text("Invalid population data");
  //   return;
  // }

  //   const y = d3.scaleLinear()
  //       .domain([0, maxPopulation])
  //       .range([chartHeight + margin.top, margin.top]);
  //       console.info("Y DOMAIN:", y.domain());

  //   const numBars = religionData.length;

  //   const colorScale = d3.scaleSequential()
  //   .domain([0, numBars - 1])
  //   .interpolator(t => d3.interpolateBlues(0.3 + t * 0.7));

  //   // Assign a color to each religion
  //   const religionColorMap = {};
  //   religionData.forEach((d, i) => {
  //   religionColorMap[d.religion] = colorScale(i);
  //   });


  // // CREATE CHART GROUP
  // const chart = svg.append("g")
  //   .attr("transform", `translate(0, 0)`);

  // // DRAW BARS
  //   chart.selectAll(".bar")
  //     .data(religionData)
  //     .join("rect")
  //     .attr("class", "bar")
  //     .attr("x", d => {
  //       const xVal = x(d.religion);
  //       if (isNaN(xVal)) console.error("INVALID X VALUE:", d.religion);
  //       return xVal;
  //     })
  //     .attr("y", d => {
  //       const yVal = y(d.population);
  //       if (isNaN(yVal)) console.error("INVALID Y VALUE:", d.population);
  //       return yVal;
  //     })
  //     .attr("width", x.bandwidth())
  //     .attr("height", d => {
  //       const h = chartHeight + margin.top - y(d.population);
  //       if (isNaN(h)) console.error("INVALID HEIGHT:", d.population);
  //       return h;
  //     })
  //     .attr("fill", d => religionColorMap[d.religion])
  //     .attr("data-original-fill", d => religionColorMap[d.religion]) // store original color
  //       .on("mouseover", function(event, d) {
  //         d3.select(this)
  //             .attr("fill", "orange"); // highlight

  //         tooltip
  //             .style("opacity", 1)
  //             .html(`${d.religion}: ${formatNumber(d.population)}`)
  //             .style("left", (event.pageX + 10) + "px")
  //             .style("top", (event.pageY - 10) + "px");
  //       })
  //       .on("mouseout", function(event, d) {
  //         const original = d3.select(this).attr("data-original-fill");
  //         d3.select(this).attr("fill", original); // safely restore
  //         tooltip.style("opacity", 0);
  //       });


  //   chart.append("g")
  //       .attr("class", "x-axis")
  //       .attr("transform", `translate(0, ${chartHeight + margin.top})`)
  //       .call(d3.axisBottom(x))
  //       .selectAll("text")
  //       .style("text-anchor", "end")
  //       .attr("dx", "-.8em")
  //       .attr("dy", ".15em")
  //       .attr("transform", "rotate(-45)");

  // // ADD Y-AXIS
  // chart.append("g")
  //   .attr("class", "y-axis")
  //   .attr("transform", `translate(${margin.left}, 0)`)
  //   .call(d3.axisLeft(y).tickFormat(d3.format(".2s")))
  //   .append("text")
  //   .attr("fill", "#000")
  //   .attr("transform", "rotate(-90)")
  //   .attr("y", 6)
  //   .attr("dy", "-3em")
  //   .attr("text-anchor", "end")
  //   .text("Number of People");
}

export function resetRegionalGraph() {
    svg.selectAll("*").remove();
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Select a continent to view religion data");
}