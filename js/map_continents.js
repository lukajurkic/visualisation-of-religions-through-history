export async function displayContinentsMap(svg, width, height) {
  // Load GeoJSON data 
  let geoData;
  try {
    geoData = await d3.json("data/world_map_continents.geojson");
  } catch (error) {
    console.error("Failed to load GeoJSON:", error);
    throw error;
  }
    const filteredFeatures = geoData.features.filter(f => f.properties.CONTINENT !== "Antarctica");

    const projection = d3.geoNaturalEarth1()
      .fitSize([width, height], { type: "FeatureCollection", features: filteredFeatures  });

    const path = d3.geoPath().projection(projection);

    const regionalPaths = svg.selectAll("path")
      .data(filteredFeatures, d => d.properties.CONTINENT)
      .join("path")
      .attr("class", "map")
      .attr("d", path);

    return { projection, regionalPaths };
};