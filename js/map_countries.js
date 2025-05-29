export function displayCountriesMap(svg, width, height) {
  // Load GeoJSON data for countries
  d3.json("data/world_map.geo.json").then(geoData => {
    console.log("GeoJSON loaded for countries map:", geoData);

    // Set up the projection
    const projection = d3.geoNaturalEarth1()
      .fitSize([width, height], { type: "FeatureCollection", features: geoData.features });

    // Create the path generator
    const path = d3.geoPath().projection(projection);

    // Draw the map
    svg.selectAll("path")
      .data(geoData.features)
      .join("path")
      .attr("class", "country")
      .attr("d", path)
      .attr("fill", "#E6F0FA") // Light blue fill for countries
      .attr("stroke", "#999") // Grey border for countries
      .attr("stroke-width", 0.5);
  }).catch(error => {
    console.error("Error loading GeoJSON for countries map:", error);
  });
}