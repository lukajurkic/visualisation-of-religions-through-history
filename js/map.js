export async function initializeMap(g, svg, width, height, zoom, resetBtn) {
  

  const data = await d3.json("data/world_map.geo.json");
  const infoBox = d3.select("#info-box");

  const projection = d3.geoNaturalEarth1();
  projection.fitSize([width, height], data); // Automatically scale and center the map
  const path = d3.geoPath().projection(projection);

  g.selectAll("path")
    .data(data.features)
    .join("path")
    .attr("class", "country")
    .attr("d", path)
    .on("mouseover", function () {
      d3.select(this).attr("fill", "orange");
    })
    .on("mouseout", function () {
      d3.select(this).attr("fill", "#eee");
    })
    .on("click", function (event, d) {
      event.stopPropagation();

      infoBox.text(d.properties.name);

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
    });
}
