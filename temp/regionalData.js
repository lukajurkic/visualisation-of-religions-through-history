// regionalData.js
import { columnMapping, formatNumber } from './utils.js';

let regionalData = [];
let infoBox, slider;

export async function initRegionalData(data, infoBoxElement, sliderElement) {
  regionalData = data;
  infoBox = infoBoxElement;
  slider = sliderElement;
}

export function displayRegionalData(regions, displayName) {
  if (!regionalData || regionalData.length === 0) {
    infoBox.text(`Regional data not available for ${displayName}`);
    return;
  }

  const year = slider.node().value;
  let html = '';

  const regionList = Array.isArray(regions) ? regions : [regions];

  for (const region of regionList) {
    const dataForRegion = regionalData.filter(d => d.region === region && d.year === year);

    if (dataForRegion.length === 0) {
      html += `<p>No data available for ${region} in ${year}</p>`;
      continue;
    }

    const row = dataForRegion[0];
    html += `<h4>${region}</h4>
             <table style="font-size: 12px;">
               <tr><th>Metric</th><th>Value</th></tr>`;

    const entries = Object.entries(row).filter(([key]) => key !== "year" && key !== "region" && key !== "version");
    entries.forEach(([key, value]) => {
      const numValue = parseFloat(value.replace(/,/g, ''));
      if (!isNaN(numValue) && numValue !== 0) {
        const fullName = columnMapping[key] || key;
        const displayName = fullName.includes("Total") ? `<strong>${fullName}</strong>` : fullName;
        const formattedValue = formatNumber(value);
        html += `<tr><td>${displayName}</td><td>${formattedValue}</td></tr>`;
      }
    });

    html += '</table>';
  }

  if (html === '') {
    infoBox.text(`No data available for ${displayName} in ${year}`);
  } else {
    infoBox.html(html);
  }
}