import { columnMapping, getCountryCode, formatNumber, getDisplayName } from './utils.js';

const reverseColumnMapping = Object.entries(columnMapping).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {});

const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip-distribution") // UNIQUE CLASS TO AVOID CONFLICTS
    .style("position", "absolute")
    .style("background", "#fff")
    .style("border", "1px solid #999")
    .style("padding", "5px")
    .style("border-radius", "3px")
    .style("pointer-events", "none")
    .style("opacity", 0)
    .style("font-family", "Arial, sans-serif")
    .style("font-size", "12px");

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
    const minNonZeroPopulation = d3.min(populations.filter(p => p > 0)) || (maxPopulation * 0.01);
    if (!maxPopulation || maxPopulation <= 0) {
        console.warn("NO VALID POPULATION DATA FOR:", selectedReligion, year);
        return;
    }

    const colorScale = d3.scaleLinear()
        .domain([minNonZeroPopulation, maxPopulation])
        .range(["#87CEEB", "#00008B"]);

    const countryPaths = d3.select("#map-countries-distribution").selectAll("path");

    countryPaths.each(function(d) {
        const path = d3.select(this);
        const countryName = d.properties.name || "Unknown Country";
        const countryCode = getCountryCode(countryName, year);
        const dataEntry = countryData.find(cd => cd.countryCode === countryCode);

        if (dataEntry) {
            if (dataEntry.population > 0) {
                path.style("fill", colorScale(dataEntry.population));
            } else {
                path.style("fill", "#ffffff");
            }
            path.on("mouseover", function(event) {
                const populationText = dataEntry.population > 0 ? formatNumber(dataEntry.population) : "0";
                tooltip
                    .style("opacity", 1)
                    .html(`${getDisplayName(countryName, year)}<br>${selectedReligion}: ${populationText}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 10) + "px");
            })
            .on("mouseout", function() {
                tooltip.style("opacity", 0);
            });
        } else {
            path.style("fill", "#ffffff");
            path.on("mouseover", function(event) {
                tooltip
                    .style("opacity", 1)
                    .html(`${getDisplayName(countryName, year)}<br>${selectedReligion}: No data`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 10) + "px");
            })
            .on("mouseout", function() {
                tooltip.style("opacity", 0);
            });
        }
    });
}