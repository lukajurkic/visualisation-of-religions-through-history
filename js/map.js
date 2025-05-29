import { displayRegionalData } from './regionalData.js';
import { displayNationalData } from './nationalData.js';
import { historicalCountryMap, getCountryCode, getDisplayName, columnMapping } from './utils.js';

export async function initializeMap(g, svg, width, height, zoom, resetBtn, viewState, nationalData, regionalData) {
  let selectedContinent = null;
  let selectedCountry = null;
  let selectedReligion = null; // Track selected religion

  // Load GeoJSON data
  const geojsonFile = viewState === "continents" ? "data/world_map_continents.geojson" : "data/world_map.geo.json";
  let geoData;
  try {
    console.log("Loading GeoJSON file:", geojsonFile);
    geoData = await d3.json(geojsonFile);
    console.log("GeoJSON loaded:", geoData);
  } catch (error) {
    console.error("Failed to load GeoJSON:", error);
    throw error;
  }

  const infoBox = d3.select("#info-box");
  const year = d3.select("#year-slider").node().value;

  const filteredFeatures = viewState === "continents"
    ? geoData.features.filter(f => f.properties.CONTINENT !== "Antarctica")
    : geoData.features;

  console.log("Filtered features:", filteredFeatures);

  const projection = d3.geoNaturalEarth1();
  projection.fitSize([width, height], { type: "FeatureCollection", features: filteredFeatures });
  const path = d3.geoPath().projection(projection);

  // Define color scale (10 shades of blue + white for no data)
  const colorScale = d3.scaleLinear()
    .domain([0, 10]) // 0% to 100% divided into 10 steps
    .range([
      "#FFFFFF", // White for 0% or no data
      "#E6F0FA", // Lightest blue
      "#CCE0F5",
      "#B3D0F0",
      "#99C0EB",
      "#80B0E6",
      "#6699E1",
      "#4D89DC",
      "#3379D7",
      "#1A69D2", // Darkest blue
    ]);

  // Function to calculate total population (sum of all religion columns if no pop/ptctotal)
  function getTotalPopulation(dataEntry) {
    let total = 0;
    for (let key in dataEntry) {
      if (key.match(/^(chrst|jud|islm|bud|zor|hind|sikh|shnt|bah|tao|jain|conf|sync|anm|non|othr)/)) {
        total += +dataEntry[key] || 0;
      }
    }
    return total || 1; // Default to 1 to avoid division by zero
  }

  // Function to update map colors based on selected religion
  function updateMapColors(religionKey) {
    console.log("Updating map colors for religion:", religionKey);
    const paths = g.selectAll("path")
      .data(filteredFeatures, d => d.properties.name || d.properties.CONTINENT) // Key function for rebind
      .join("path")
      .attr("class", viewState === "continents" ? "continent" : "country")
      .attr("d", path)
      .attr("fill", d => {
        let percentage = 0;
        if (religionKey) {
          if (viewState === "continents") {
            const region = d.properties.CONTINENT;
            const regionEntry = regionalData.find(r => r.region === region && r.year === year);
            if (regionEntry) {
              const adherents = +regionEntry[religionKey] || 0;
              const totalPop = getTotalPopulation(regionEntry);
              percentage = (adherents / totalPop) * 100;
              console.log(`Region: ${region}, ${religionKey}: ${adherents} adherents, Total Pop: ${totalPop}, Percentage: ${percentage}%`);
            } else {
              console.log(`No region entry for ${region} and year ${year}`);
            }
          } else {
            const countryName = d.properties.name;
            const countryCode = getCountryCode(countryName, year);
            if (countryCode) {
              const countryEntry = nationalData.find(n => n.country_code === countryCode && n.year === year);
              if (countryEntry) {
                const adherents = +countryEntry[religionKey] || 0;
                const totalPop = getTotalPopulation(countryEntry);
                percentage = (adherents / totalPop) * 100;
                console.log(`Country: ${countryName}, ${religionKey}: ${adherents} adherents, Total Pop: ${totalPop}, Percentage: ${percentage}%`);
              } else {
                console.log(`No country entry for ${countryCode} and year ${year}`);
              }
            } else {
              console.log(`No country code for ${countryName} and year ${year}`);
            }
          }
        }
        return percentage > 0 ? colorScale(Math.min(10, Math.floor(percentage / 10))) : "#FFFFFF";
      })
      .on("mouseover", function (event, d) {
        d3.select(this).attr("fill", "orange");
        if (!selectedContinent && !selectedCountry) {
          const name = d.properties.name || d.properties.CONTINENT || "Unknown";
          infoBox.text(name);
        }
      })
      .on("mouseout", function (event, d) {
        d3.select(this).attr("fill", d => {
          let percentage = 0;
          if (religionKey) {
            if (viewState === "continents") {
              const region = d.properties.CONTINENT;
              const regionEntry = regionalData.find(r => r.region === region && r.year === year);
              if (regionEntry) {
                const adherents = +regionEntry[religionKey] || 0;
                const totalPop = getTotalPopulation(regionEntry);
                percentage = (adherents / totalPop) * 100;
              }
            } else {
              const countryName = d.properties.name;
              const countryCode = getCountryCode(countryName, year);
              if (countryCode) {
                const countryEntry = nationalData.find(n => n.country_code === countryCode && n.year === year);
                if (countryEntry) {
                  const adherents = +countryEntry[religionKey] || 0;
                  const totalPop = getTotalPopulation(countryEntry);
                  percentage = (adherents / totalPop) * 100;
                }
              }
            }
          }
          return percentage > 0 ? colorScale(Math.min(10, Math.floor(percentage / 10))) : "#FFFFFF";
        });
        if (!selectedContinent && !selectedCountry) {
          infoBox.text(viewState === "continents" ? "Select a continent" : "Select a country");
        }
      })
      .on("click", function (event, d) {
        console.log(d.properties);
        event.stopPropagation();
        let name = d.properties.name || d.properties.CONTINENT || "Unknown";

        const regionMap = {
          "North America": "West. Hem",
          "South America": "West. Hem",
          "Asia": ["Asia", "Mideast"],
          "Australia": null,
          "Oceania": null,
        };
        const regions = regionMap[name] || name;

        if (viewState === "continents") {
          selectedContinent = name;
          selectedCountry = null;
          if (regions) {
            displayRegionalData(regions, name);
          } else {
            infoBox.text(`No data available for ${name}`);
          }
          resetBtn.style("display", "none");
        } else {
          selectedContinent = null;
          selectedCountry = name;
          const countryCode = getCountryCode(name, year);
          const displayName = getDisplayName(name, year);
          if (countryCode) {
            displayNationalData(countryCode, displayName);
          } else {
            infoBox.text(`No data available for ${displayName}`);
          }

          const [[x0, y0], [x1, y1]] = path.bounds(d);
          const dx = x1 - x0;
          const dy = y1 - y0;
          const x = (x0 + x1) / 2;
          const y = (y0 + y1) / 2;
          const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height)));
          const translate = [width / 2 - scale * x, height / 2 - scale * y];

          svg.transition()
            .duration(750)
            .call(
              zoom.transform,
              d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
            );

          resetBtn.style("display", "inline-block");
        }
      });

    console.log("Paths updated with colors:", paths.size(), "elements");
  }

  // Initial map rendering with no religion selected (white)
  updateMapColors(null);

  // Expose updateMapColors for external use
  return { updateMapColors };
}