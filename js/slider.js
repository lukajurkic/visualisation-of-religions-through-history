export function initializeSlider(slider, yearDisplay) {
    slider.on("input", function () {
      yearDisplay.text("Year: " + this.value);
    });
  }
  