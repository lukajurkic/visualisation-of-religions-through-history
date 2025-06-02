export function initializeSlider(slider, yearDisplay, minYear, maxYear) {

  const styles = window.getComputedStyle(slider.node());
  const thumbWidth = parseFloat(styles.getPropertyValue('--thumb-width')) || 16;
  const leftOffset = thumbWidth;
  const rightOffset = thumbWidth;

  const sliderInput = slider
    .attr("type", "range")
    .attr("min", minYear)
    .attr("max", maxYear)
    .attr("value", maxYear)
    .attr("step", 5);

  yearDisplay.text(`Year: ${minYear}`);

  const parent = d3.select(slider.node().parentNode);
  const wrapper = parent.append("div")
    .attr("class", "slider-wrapper");

  sliderInput.node().parentNode.removeChild(sliderInput.node());
  wrapper.node().appendChild(sliderInput.node());

  const labelSvg = wrapper
    .append("svg")
    .attr("width", "100%")
    .attr("height", 30)
    .style("display", "block");

  function updateLabels() {
    const sliderNode = slider.node();
    const sliderWidth = sliderNode.getBoundingClientRect().width;
    const labelScale = d3.scaleLinear()
      .domain([minYear, maxYear])
      .range([leftOffset, sliderWidth - rightOffset]);

    labelSvg.selectAll(".year-label").remove();

    const years = d3.range(minYear, maxYear + 1, 5); // 1945, 1950, ..., 2010
    labelSvg.selectAll(".year-label")
      .data(years)
      .enter()
      .append("text")
      .attr("class", "year-label")
      .attr("x", d => labelScale(d))
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#333")
      .text(d => d);
  }

  updateLabels();

  window.addEventListener("resize", updateLabels);

  slider.on("input", function() {
    const year = this.value;
    yearDisplay.text(`Year: ${year}`);
    updateLabels();
  });
}