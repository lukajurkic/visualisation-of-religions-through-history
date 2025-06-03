import { columnMapping, getCountryCode } from './utils.js';

const reverseColumnMapping = Object.entries(columnMapping).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {});

export function updateCountryColors(nationalData, selectedReligion, year) {
    const column = reverseColumnMapping[selectedReligion];
    if (!column) {
        console.error("INVALID RELIGION SELECTED:", selectedReligion);
        return;
    }

    const yearStr = year.toString();
    const dataForYear = nationalData.filter(d => d.year === yearStr);
    if (!dataForYear || dataForYear.length === 0) {
        console.error("NO DATA FOR YEAR:", year);
        return;
    }

    const countryData = dataForYear.map(d => {
        const countryCode = d.name;
        const population = Number(d[column]) || 0; 
        const mappedCountryCode = getCountryCode(countryCode, year);
        return { countryCode: mappedCountryCode, population };
    }).filter(d => d.countryCode);

    const populations = countryData.map(d => d.population).filter(p => p > 0);
    const maxPopulation = d3.max(populations);
    const minPopulation = d3.min(populations);
    if (!maxPopulation || maxPopulation <= 0) {
        console.warn("NO VALID POPULATION DATA FOR:", selectedReligion, year);
        return;
    }

    const colorScale = d3.scaleSequential(d3.interpolateBlues)
        .domain([0, maxPopulation]);

    const countryPaths = d3.select("#map-countries-distribution").selectAll("path");

    countryPaths.each(function(d) {
        const path = d3.select(this);
        const countryName = d.properties.name || "Unknown Country";
        const countryCode = getCountryCode(countryName, year);
        const dataEntry = countryData.find(cd => cd.countryCode === countryCode);

        if (dataEntry && dataEntry.population > 0) {
            path.style("fill", colorScale(dataEntry.population));
        } else {
            path.style("fill", "#ffffff");
        }
    });
}