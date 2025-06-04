export async function displayCountriesMap(svg, width, height) {
  const zoomGroup = svg.append("g");

  try {
    const geoData = await d3.json("data/world_map.geo.json");

    const projection = d3.geoNaturalEarth1()
      .fitSize([width, height], { type: "FeatureCollection", features: geoData.features });

    const path = d3.geoPath().projection(projection);

    const nationalPaths = zoomGroup.selectAll("path")
      .data(geoData.features)
      .join("path")
      .attr("class", "map")
      .attr("d", path);
    return { zoomGroup, projection, nationalPaths };
  } catch (error) {
    console.error("Error loading GeoJSON for countries map:", error);
    throw error;
  }
}