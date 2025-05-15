// Update year display when slider changes

document.getElementById("year-slider").addEventListener("input", () => {
    document.getElementById("year-value").textContent = document.getElementById("year-slider").value;
  });
  
  // Load CSV data
let data = [];
try {
  data = await d3.csv("data/WRP_global.csv");
  console.log(data);
  data.forEach(row => {
    console.log(row.year, row.chrstprot, row.chrstcat);
  });
} catch (error) {
  console.error("Error loading CSV:", error);
}

// Update year display when slider changes
document.getElementById("year-slider").addEventListener("input", () => {
  document.getElementById("year-value").textContent = document.getElementById("year-slider").value;
});

// Handle button click to show data
document.getElementById("show-data-btn").addEventListener("click", (event) => {
  event.stopPropagation();
  const year = document.getElementById("year-slider").value;
  const popup = d3.select("#popup");

  const row = data.find(d => +d["year"] === +year);
  if (!row) {
    popup.html(`<strong>No data available for ${year}</strong>`)
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY + 10) + "px")
      .style("display", "block");
    return;
  }

  // Get all entries except "year"
  const entries = Object.entries(row).filter(([key]) => key !== "year");

  // Create HTML for popup with a table
  let html = `<strong>Data for Year ${year}</strong>
              <table>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>`;
  entries.forEach(([key, value]) => {
    // Format large numbers (remove commas for display)
    const formattedValue = isNaN(value.replace(/,/g, '')) ? value : parseInt(value.replace(/,/g, '')).toLocaleString();
    html += `<tr>
               <td>${key}</td>
               <td>${formattedValue}</td>
             </tr>`;
  });
  html += `</table>`;

  popup.html(html)
    .style("left", Math.min(event.pageX + 10, window.innerWidth - 420) + "px") // Keep within viewport
    .style("top", Math.min(event.pageY + 10, window.innerHeight - 320) + "px") // Keep within viewport
    .style("display", "block");
});

// Hide popup when clicking outside
document.addEventListener("click", (e) => {
  const popup = document.getElementById("popup");
  if (!e.target.closest("#show-data-btn") && !e.target.closest("#popup")) {
    popup.style.display = "none";
  }
});
