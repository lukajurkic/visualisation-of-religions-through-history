// button.js
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

document.getElementById("year-slider").addEventListener("input", () => {
  document.getElementById("selected-year").textContent = `Year: ${document.getElementById("year-slider").value}`;
});

document.getElementById("show-data-btn").addEventListener("click", (event) => {
  event.stopPropagation();
  const year = document.getElementById("year-slider").value;
  const popup = d3.select("#popup");
  const container = d3.select(".container");

  const row = data.find(d => +d["year"] === +year);
  let html = '<button class="close-btn">X</button>';
  if (!row) {
    html += `<strong>No data available for ${year}</strong>`;
  } else {
    const entries = Object.entries(row).filter(([key]) => key !== "year");
    html += `<strong>Data for Year ${year}</strong>
             <table>
               <tr>
                 <th>Metric</th>
                 <th>Value</th>
               </tr>`;
    entries.forEach(([key, value]) => {
      const formattedValue = isNaN(value.replace(/,/g, '')) ? value : parseInt(value.replace(/,/g, '')).toLocaleString();
      html += `<tr>
                 <td>${key}</td>
                 <td>${formattedValue}</td>
               </tr>`;
    });
    html += `</table>`;
  }

  popup.html(html)
    .style("display", "block");
  container.classed("blurred", true);

  // Add close button event
  d3.select("#popup .close-btn").on("click", () => {
    popup.style("display", "none");
    container.classed("blurred", false);
  });
});