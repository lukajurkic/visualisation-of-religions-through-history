export async function displayCountriesMap(svg, width, height, infoBox) {
  const zoomGroup = svg.append("g");

  try {
    const geoData = await d3.json("data/world_map.geo.json");

    const projection = d3.geoNaturalEarth1()
      .fitSize([width, height], { type: "FeatureCollection", features: geoData.features });

    const path = d3.geoPath().projection(projection);

    const nationalPaths = zoomGroup.selectAll("path")
      .data(geoData.features)
      .join("path")
      .attr("class", "country")
      .attr("d", path)
      .attr("fill", "#E6F0FA")
      .attr("stroke", "#999")
      .attr("stroke-width", 0.5)
      .on("mouseover", function (d) {
        infoBox.text(d.properties.name || "Unknown Country");
      })
      .on("mouseout", function (d) {
        infoBox.text("Select a country");
      });
    return { zoomGroup, projection, nationalPaths };
  } catch (error) {
    console.error("Error loading GeoJSON for countries map:", error);
    throw error;
  }
}