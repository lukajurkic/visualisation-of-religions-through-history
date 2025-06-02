export async function displayContinentsMap(svg, width, height) {
  // Load GeoJSON data 
  let geoData;
  try {
    geoData = await d3.json("data/world_map_continents.geojson");
  } catch (error) {
    console.error("Failed to load GeoJSON:", error);
    throw error;
  }
    // Filter out Antarctica
    const filteredFeatures = geoData.features.filter(f => f.properties.CONTINENT !== "Antarctica");

    // Set up the projection
    const projection = d3.geoNaturalEarth1()
      .fitSize([width, height], { type: "FeatureCollection", features: filteredFeatures  });

    // Create the path generator
    const path = d3.geoPath().projection(projection);

    // Draw the map
    const regionalPaths = svg.selectAll("path")
      .data(filteredFeatures)
      .join("path")
      .attr("class", "continent")
      .attr("d", path)
      .attr("fill", "#E6F0FA") // Light blue fill
      .attr("stroke", "#999") // Grey border
      .attr("stroke-width", 0.5);

    return { projection, regionalPaths }; // Return group, projection, and paths for zoom handling
};