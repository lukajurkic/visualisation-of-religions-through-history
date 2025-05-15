export function initializeZoom(svg, g, resetBtn, width, height) {
  const infoBox = d3.select("#info-box");
  const zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on("zoom", (event) => {
      g.attr("transform", event.transform);
    });

  svg.call(zoom);

  resetBtn.on("click", () => {
    svg.transition()
      .duration(750)
      .call(zoom.transform, d3.zoomIdentity);
    resetBtn.style("display", "none");
    infoBox.text("Select a country");
  });

  return zoom;
}
