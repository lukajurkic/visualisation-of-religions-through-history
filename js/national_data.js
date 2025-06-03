import { columnMapping, formatNumber } from './utils.js'; // REMOVED getCountryCode AND getDisplayName IMPORTS - GROK

let nationalData = [];
let infoBox, slider;

export async function initNationalData(data, infoBoxElement, sliderElement) {
  nationalData = data;
  infoBox = infoBoxElement;
  slider = sliderElement;
  window.nationalData = { hasDataForCountry }; // Ensure this is set for utils.js
}

export function hasDataForCountry(countryCode, year) {
  if (!nationalData || nationalData.length === 0) {
    console.log(`No national data available for ${countryCode} in ${year}`);
    return false;
  }
  const hasData = nationalData.some(d => d.name === countryCode && d.year === year.toString());
  console.log(`Checking data for ${countryCode} in ${year}: ${hasData}`);
  return hasData;
}

export function displayNationalData(countryCode, displayName) {
  if (!nationalData || nationalData.length === 0) {
    infoBox.text(`National data not available for ${displayName}`);
    return;
  }

  const year = slider.node().value;
  const dataForCountry = nationalData.filter(d => d.name === countryCode && d.year === year);

  if (dataForCountry.length === 0) {
    infoBox.text(`No data available for ${displayName} in ${year}`);
    return;
  }

  const row = dataForCountry[0];
  let html = `<h4>${displayName} (${year})</h4>
             <table style="font-size: 12px;">
               <tr><th>Religion</th><th>Value</th></tr>`;

  const entries = Object.entries(row).filter(([key]) => key !== "year" && key !== "state" && key !== "name" && key !== "Version");
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

  infoBox.html(html);
}