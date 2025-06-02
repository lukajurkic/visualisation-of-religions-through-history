export async function displayCountriesMap(svg, width, height, data) {
  // Create a group for zoom transformation
  const zoomGroup = svg.append("g");

  // Load GeoJSON data for countries
  try {
    const geoData = await d3.json("data/world_map.geo.json");
    console.log("GeoJSON loaded:", geoData.features.length, "features"); // LOG NUMBER OF FEATURES - GROK

    // Set up the projection
    const projection = d3.geoNaturalEarth1()
      .fitSize([width, height], { type: "FeatureCollection", features: geoData.features });

    // Create the path generator
    const path = d3.geoPath().projection(projection);

    // Draw the map within the zoomGroup
    const paths = zoomGroup.selectAll("path")
      .data(geoData.features)
      .join("path")
      .attr("class", "country")
      .attr("d", path)
      .attr("fill", "#E6F0FA") // Light blue fill for countries
      .attr("stroke", "#999") // Grey border for countries
      .attr("stroke-width", 0.5);
    console.log("Paths created:", paths.size(), "elements"); // LOG NUMBER OF PATHS - GROK
    return { zoomGroup, projection, paths, data }; // Return group, projection, and paths for zoom handling
  } catch (error) {
    console.error("Error loading GeoJSON for countries map:", error);
    throw error;
  }
}