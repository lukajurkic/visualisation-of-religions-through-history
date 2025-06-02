export function initializeSlider(slider, yearDisplay, minYear, maxYear) {

  const styles = window.getComputedStyle(slider.node());
  const thumbWidth = parseFloat(styles.getPropertyValue('--thumb-width')) || 16;
  const leftOffset = thumbWidth;
  const rightOffset = thumbWidth;

  // SET SLIDER ATTRIBUTES
  const sliderInput = slider
    .attr("type", "range")
    .attr("min", minYear)
    .attr("max", maxYear)
    .attr("value", minYear) // START AT MIN YEAR
    .attr("step", 5); // KEEP STEP AS 5

  // INITIALIZE YEAR DISPLAY
  yearDisplay.text(`Year: ${minYear}`);

  // CREATE WRAPPER FOR SLIDER AND LABELS
  const parent = d3.select(slider.node().parentNode);
  const wrapper = parent.append("div")
    .attr("class", "slider-wrapper");

  // MOVE SLIDER TO WRAPPER
  sliderInput.node().parentNode.removeChild(sliderInput.node());
  wrapper.node().appendChild(sliderInput.node());

  // CREATE SVG FOR LABELS INSIDE WRAPPER
  const labelSvg = wrapper
    .append("svg")
    .attr("width", "100%")
    .attr("height", 30)
    .style("display", "block");

  // FUNCTION TO UPDATE LABELS
  function updateLabels() {
    const sliderNode = slider.node();
    const sliderWidth = sliderNode.getBoundingClientRect().width;
    const labelScale = d3.scaleLinear()
      .domain([minYear, maxYear])
      .range([leftOffset, sliderWidth - rightOffset]);

    // REMOVE EXISTING LABELS
    labelSvg.selectAll(".year-label").remove();

    // ADD YEAR LABELS EVERY 5 YEARS
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

  // INITIAL CALL TO SET LABELS
  updateLabels();

  // UPDATE LABELS ON WINDOW RESIZE
  window.addEventListener("resize", updateLabels);

  // UPDATE LABELS ON SLIDER INPUT (TO HANDLE DYNAMIC WIDTH CHANGES)
  slider.on("input", function() {
    const year = this.value;
    yearDisplay.text(`Year: ${year}`);
    updateLabels(); // RECALCULATE LABELS ON INPUT
  });
}