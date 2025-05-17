export async function initializeMap(g, svg, width, height, zoom, resetBtn, viewState) {
  const geojsonFile = viewState === "continents" ? "data/world_map_continents.geojson" : "data/world_map.geo.json";
  const data = await d3.json(geojsonFile);
  const infoBox = d3.select("#info-box");

  // Filter out Antarctica in continents view
  const filteredFeatures = viewState === "continents"
    ? data.features.filter(f => f.properties.CONTINENT !== "Antarctica")
    : data.features;

  const projection = d3.geoNaturalEarth1();
  projection.fitSize([width, height], { type: "FeatureCollection", features: filteredFeatures }); // Automatically scale and center
  const path = d3.geoPath().projection(projection);

  g.selectAll("path")
    .data(filteredFeatures)
    .join("path")
    .attr("class", viewState === "continents" ? "continent" : "country")
    .attr("d", path)
    .on("mouseover", function (event, d) {
      d3.select(this).attr("fill", "orange");
      // Update the info-box with the country or continent name on hover
      const name = d.properties.name || d.properties.CONTINENT || "Unknown";
      infoBox.text(name);
    })
    .on("mouseout", function () {
      d3.select(this).attr("fill", "#eee");
      // Reset the info-box text on mouseout
      infoBox.text("Select a country");
    })
    .on("click", function (event, d) {
      console.log(d.properties);
      event.stopPropagation();
      const name = d.properties.name || d.properties.CONTINENT || "Unknown"; // Adjust property name as needed
      infoBox.text(name);

      if (viewState === "countries") {
        // Country view: zoom to country
        const [[x0, y0], [x1, y1]] = path.bounds(d);
        const dx = x1 - x0;
        const dy = y1 - y0;
        const x = (x0 + x1) / 2;
        const y = (y0 + y1) / 2;
        const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height)));
        const translate = [width / 2 - scale * x, height / 2 - scale * y];

        svg.transition()
          .duration(750)
          .call(
            zoom.transform,
            d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
          );

        resetBtn.style("display", "inline-block");
      } else {
        // Continent view: no zoom, just show name
        resetBtn.style("display", "none");
      }
    });
}