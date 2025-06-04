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

  slider.on("input", function() {
    const year = this.value;
    yearDisplay.text(`Year: ${year}`);
  });
}