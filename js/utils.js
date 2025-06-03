export const columnMapping = {
    chrstprot: "Christianity Protestants",
    chrstcat: "Christianity Roman Catholics",
    chrstorth: "Christianity Eastern Orthodox",
    chrstang: "Christianity Anglican",
    chrstothr: "Christianity Others",
    chrstgen: "Christianity Total",
    judorth: "Judaism Orthodox",
    jdcons: "Judaism Conservatives",
    judref: "Judaism Reform",
    judothr: "Judaism Others",
    judgen: "Judaism Total",
    islmsun: "Islam Sunni",
    islmshi: "Islam Shia",
    islmibd: "Islam Ibadi",
    islmnat: "Islam Nation of Islam",
    islmalw: "Islam Alawite",
    islmahm: "Islam Ahmadiyya",
    islmothr: "Islam Other",
    islmgen: "Islam Total",
    budmah: "Buddhism Mahayana",
    budthr: "Buddhism Theravada",
    budothr: "Buddhism Other",
    budgen: "Buddhism Total",
    zorogen: "Zoroastrian Total",
    hindgen: "Hindu Total",
    sikhgen: "Sikh Total",
    shntgen: "Shinto Total",
    bahgen: "Baha'i Total",
    taogen: "Taoism Total",
    jaingen: "Jain Total",
    confgen: "Confucianism Total",
    syncgen: "Syncretic Religions Total",
    anmgen: "Animist Religions Total",
    nonrelig: "Non Religious Total",
    othrgen: "Other Religions Total",
    sumrelig: "Percent Religions Adherents",
    pop: "Total population in independent states",
    worldpop: "Total world population",
    chrstprotpct: "Christianity Protestants Percentage",
    chrstcatpct: "Christianity Roman Catholics Percentage",
    chrstorthpct: "Christianity Eastern Orthodox Percentage",
    chrstangpct: "Christianity Anglican Percentage",
    chrstothrpct: "Christianity Others Percentage",
    chrstgenpct: "Christianity Total Percentage",
    judorthpct: "Judaism Orthodox Percentage",
    judconspct: "Judaism Conservatives Percentage",
    judrefpct: "Judaism Reform Percentage",
    judothrpct: "Judaism Others Percentage",
    judgenpct: "Judaism Total Percentage",
    islmsunpct: "Islam Sunni Percentage",
    islmshipct: "Islam Shia Percentage",
    islmibdpct: "Islam Ibadi Percentage",
    islmnatpct: "Islam Nation of Islam Percentage",
    islmalwpct: "Islam Alawite Percentage",
    islmahmpct: "Islam Ahmadiyya Percentage",
    islmothrpct: "Islam Other Percentage",
    islmgenpct: "Islam Total Percentage",
    budmahpct: "Buddhism Mahayana Percentage",
    budthrpct: "Buddhism Theravada Percentage",
    budothrpct: "Buddhism Other Percentage",
    budgenpct: "Buddhism Total Percentage",
    zorogenpct: "Zoroastrian Percentage",
    hindgenpct: "Hindu Percentage",
    sikhgenpct: "Sikh Percentage",
    shntgenpct: "Shinto Percentage",
    bahgenpct: "Baha'i Percentage",
    taogenpct: "Taoism Percentage",
    jaingenpct: "Jain Percentage",
    confgenpct: "Confucianism Percentage",
    syncgenpct: "Syncretic Religions Percentage",
    anmgenpct: "Animist Religions Percentage",
    nonreligpct: "Non Religious Percentage",
    othrgenpct: "Other Religions Percentage",
    sumreligpct: "Percent Religions Adherents",
    ptctotal: "Percent of total population",
    totalpct: "Total Population Percentage",
    totregpct: "Total World population"
  };
export const religionKeysOrdered = [
  "chrstprot",
  "chrstcat",
  "chrstorth",
  "chrstang",
  "chrstothr",
  "chrstgen",
  "judorth",
  "jdcons",
  "judref",
  "judothr",
  "judgen",
  "islmsun",
  "islmshi",
  "islmibd",
  "islmnat",
  "islmalw",
  "islmahm",
  "islmothr",
  "islmgen",
  "budmah",
  "budthr",
  "budothr",
  "budgen",
  "zorogen",
  "hindgen",
  "sikhgen",
  "shntgen",
  "bahgen",
  "taogen",
  "jaingen",
  "confgen",
  "syncgen",
  "anmgen",
  "nonrelig",
  "othrgen" // final key
];
export const religionList = ["Select religion", ...religionKeysOrdered.map(key => columnMapping[key])];
export const regionMap = {
  "North America": "West. Hem",
  "South America": "West. Hem",
  "Asia": ["Asia", "Mideast"],
  "Australia": null,
  "Oceania": null,
};
export const countryCodeMap = {
  "Afghanistan": "AFG",
  "Albania": "ALB",
  "Algeria": "ALG",
  "Andorra": "AND",
  "Angola": "ANG",
  "Argentina": "ARG",
  "Armenia": "ARM",
  "Australia": "AUL",
  "Austria": "AUS",
  "Azerbaijan": "AZE",
  "Bahamas": "BAH",
  "Bahrain": "AAB",
  "Bangladesh": "BNG",
  "Barbados": "BAR",
  "Belarus": "BLR",
  "Belgium": "BEL",
  "Belize": "BLZ",
  "Benin": "BEN",
  "Bhutan": "BHU",
  "Bolivia": "BOL",
  "Bosnia and Herzegovina": "BOS",
  "Botswana": "BOT",
  "Brazil": "BRA",
  "Brunei": "BRU",
  "Bulgaria": "BUL",
  "Burkina Faso": "BFO",
  "Burundi": "BUI",
  "Cambodia": "CAM",
  "Cameroon": "CAO",
  "Canada": "CAN",
  "Cape Verde": "CAP",
  "Central African Rep.": "CEN",
  "Chad": "CHA",
  "Chile": "CHL",
  "China": "CHN",
  "Colombia": "COL",
  "Comoros": "COM",
  "Congo": "CON",
  "Dem. Rep. Congo": "DRC",
  "Costa Rica": "COS",
  "Croatia": "CRO",
  "Cuba": "CUB",
  "Cyprus": "CYP",
  "Czechia": "CZE",
  "Czechoslovakia": "CZR",
  "Denmark": "DEN",
  "Djibouti": "DJI",
  "Dominica": "DMA",
  "Dominican Rep.": "DOM",
  "East Timor": "ETM",
  "Ecuador": "ECU",
  "Egypt": "EGY",
  "El Salvador": "SAL",
  "Eq. Guinea": "EQG",
  "Eritrea": "ERI",
  "Estonia": "EST",
  "Eswatini": "SWZ",
  "Ethiopia": "ETH",
  "Fiji": "FIJ",
  "Finland": "FIN",
  "France": "FRN",
  "Gabon": "GAB",
  "Gambia": "GAM",
  "Georgia": "GRG",
  "Germany (East)": "GDR",
  "Germany (West)": "GFR",
  "Ghana": "GHA",
  "Greece": "GRC",
  "Grenada": "GRN",
  "Guatemala": "GUA",
  "Guinea": "GUI",
  "Guinea-Bissau": "GNB",
  "Guyana": "GUY",
  "Haiti": "HAI",
  "Honduras": "HON",
  "Hungary": "HUN",
  "Iceland": "ICE",
  "India": "IND",
  "Indonesia": "INS",
  "Iran": "IRN",
  "Iraq": "IRQ",
  "Ireland": "IRE",
  "Israel": "ISR",
  "Italy": "ITA",
  "Jamaica": "JAM",
  "Japan": "JPN",
  "Jordan": "JOR",
  "Kazakhstan": "KZK",
  "Kenya": "KEN",
  "Kiribati": "KIR",
  "Kosovo": "KOS",
  "Kuwait": "KUW",
  "Kyrgyzstan": "KYR",
  "Laos": "LAO",
  "Latvia": "LAT",
  "Lebanon": "LEB",
  "Lesotho": "LES",
  "Liberia": "LIB",
  "Libya": "MSI",
  "Liechtenstein": "LIE",
  "Lithuania": "LIT",
  "Luxembourg": "LUX",
  "Madagascar": "MAD",
  "Malawi": "MAW",
  "Malaysia": "MAS",
  "Maldives": "MLD",
  "Mali": "MLI",
  "Malta": "MLT",
  "Marshall Islands": "MAA",
  "Mauritania": "MAG",
  "Mexico": "MEX",
  "Moldova": "MNC",
  "Monaco": "MON",
  "Mongolia": "MNG",
  "Montenegro": "MOR",
  "Morocco": "MOR",
  "Mozambique": "MZM",
  "Myanmar": "MYA",
  "Namibia": "NAM",
  "Nauru": "NAU",
  "Nepal": "NEP",
  "Netherlands": "NTH",
  "New Zealand": "NEW",
  "Nicaragua": "NIC",
  "Niger": "NIG",
  "Nigeria": "NIR",
  "North Korea": "PRK",
  "North Macedonia": "SNM",
  "Norway": "NOR",
  "Oman": "OMA",
  "Pakistan": "PAK",
  "Palestine": "PAL",
  "Panama": "PAN",
  "Papua New Guinea": "PNG",
  "Paraguay": "PAR",
  "Peru": "PER",
  "Philippines": "PHI",
  "Poland": "POL",
  "Portugal": "POR",
  "Qatar": "QAT",
  "Romania": "ROM",
  "Russia": "RUS",
  "Rwanda": "RWA",
  "Saint Kitts and Nevis": "SKN",
  "Saint Lucia": "SLU",
  "Saint Vincent and the Grenadines": "SVG",
  "Samoa": "WSM",
  "San Marino": "SNM",
  "Sao Tome and Principe": "STP",
  "Saudi Arabia": "SAU",
  "Senegal": "SEN",
  "Serbia": "SRB",
  "Seychelles": "SEY",
  "Sierra Leone": "SIE",
  "Singapore": "SIN",
  "Slovakia": "SLO",
  "Slovenia": "SLO",
  "Solomon Is.": "SOL",
  "Somalia": "SOM",
  "South Africa": "SAF",
  "South Korea": "ROK",
  "S. Sudan": "SUD",
  "Spain": "SPN",
  "Sri Lanka": "SRI",
  "Sudan": "SUD",
  "Suriname": "SUR",
  "Sweden": "SWD",
  "Switzerland": "SWZ",
  "Syria": "SYR",
  "Tajikistan": "TAJ",
  "Tanzania": "TAZ",
  "Thailand": "THI",
  "Togo": "TOG",
  "Tonga": "TON",
  "Trinidad and Tobago": "TRI",
  "Tunisia": "TUN",
  "Turkey": "TUR",
  "Turkmenistan": "TKM",
  "Tuvalu": "TUV",
  "Uganda": "UGA",
  "Ukraine": "UKR",
  "United Arab Emirates": "UAE",
  "United Kingdom": "UKG",
  "United States of America": "USA",
  "Uruguay": "URU",
  "Uzbekistan": "UZB",
  "Vanuatu": "VAN",
  "Vatican City": "VAT",
  "Venezuela": "VEN",
  "Vietnam": "DRV",
  "Vietnam (South)": "RVN",
  "Yemen": "YEM",
  "Yemen Arab Republic": "YAR",
  "Yemen People's Republic": "YPR",
  "Yugoslavia": "YUG",
  "Zambia": "ZAM",
  "Zimbabwe": "ZIM"
};

export const historicalCountryMap = {
  "Slovakia": { historicalCode: "CSK", dissolutionYear: 1992 },
  "Czech Republic": { historicalCode: "CSK", dissolutionYear: 1992 },
  "Serbia": { historicalCode: "YUG", dissolutionYear: 1991 },
  "Croatia": { historicalCode: "YUG", dissolutionYear: 1991 },
  "Bosnia and Herzegovina": { historicalCode: "YUG", dissolutionYear: 1991 },
  "Montenegro": { historicalCode: "YUG", dissolutionYear: 1991 },
  "Slovenia": { historicalCode: "YUG", dissolutionYear: 1991 },
  "Macedonia": { historicalCode: "YUG", dissolutionYear: 1991 },
  "Germany": { historicalCode: "DEW", dissolutionYear: 1990 }, // West Germany
  // Add more mappings (e.g., East Germany "GDR") as needed
};

export function getCountryCode(name, year) {
  const modernCode = countryCodeMap[name] || name;
  const historical = historicalCountryMap[name];

  if (!historical) {
    // console.log(`No historical mapping for ${name}, using modern code: ${modernCode}`);
    return modernCode;
  }

  if (year < historical.dissolutionYear) {
    // console.log(`Year ${year} < dissolution ${historical.dissolutionYear} for ${name}, using historical code: ${historical.historicalCode}`);
    return historical.historicalCode;
  }

  // At or after dissolution, check for modern data first
  const modernDataExists = window.nationalData && window.nationalData.hasDataForCountry(modernCode, year);
  // console.log(`Checking modern data for ${modernCode} in ${year}: ${modernDataExists}`);

  if (modernDataExists) {
    // console.log(`Modern data exists for ${modernCode} in ${year}, using modern code`);
    return modernCode;
  }

  // Fallback to historical data if modern data isn't available
  const historicalDataExists = window.nationalData && window.nationalData.hasDataForCountry(historical.historicalCode, year);
  // console.log(`Checking historical data for ${historical.historicalCode} in ${year}: ${historicalDataExists}`);

  if (historicalDataExists) {
    // console.log(`No modern data, using historical code ${historical.historicalCode} for ${name} in ${year}`);
    return historical.historicalCode;
  }

  // console.log(`No data available for ${name} in ${year}, defaulting to modern code: ${modernCode}`);
  return modernCode;
}

export function getDisplayName(name, year) {
  const historical = historicalCountryMap[name];
  if (!historical) {
    return name;
  }

  if (year < historical.dissolutionYear) {
    return `${name} (ex. ${historicalCodeToName(historical.historicalCode)})`;
  }

  const modernCode = countryCodeMap[name] || name;
  const modernDataExists = window.nationalData && window.nationalData.hasDataForCountry(modernCode, year);
  const historicalDataExists = window.nationalData && window.nationalData.hasDataForCountry(historical.historicalCode, year);

  if (historicalDataExists && !modernDataExists) {
    return `${name} (ex. ${historicalCodeToName(historical.historicalCode)})`;
  }

  return name;
}

// Helper function to map historical codes to names (expand as needed)
function historicalCodeToName(code) {
  const historicalNames = {
    "CSK": "Czechoslovakia",
    "YUG": "Yugoslavia",
    "DEW": "West Germany",
    "GDR": "East Germany",
  };
  return historicalNames[code] || code;
}
  
  // Custom function to format numbers with spaces and 3 decimal places
 export function formatNumber(value) {
    // Remove commas from the input string
    let cleanValue = value;
    if (value.includes(',')) {
      try{
        cleanValue = value.replace(/,/g, '');
      } catch(error) {
        return value;
      }
    }
    // Check if the cleaned value is a number
    const num = parseFloat(cleanValue);
    if (isNaN(num)) {
      return value; // Return raw value if not a number (e.g., "N/A")
    }
  
    // Check if the number has a decimal part (e.g., "12.345")
    const hasDecimal = cleanValue.includes('.');
    
    if (hasDecimal) {
      // Format to 3 decimal places
      const formattedDecimal = num.toFixed(3);
      // Split into integer and decimal parts
      const [integerPart, decimalPart] = formattedDecimal.split('.');
      // Add spaces to integer part (e.g., "1234567" → "1 234 567")
      const spacedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return `${spacedInteger}.${decimalPart}`;
    } else {
      // For integers, add spaces as thousand separators
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
  }

  export function drawBarChart({
  svg,
  data,
  tooltip,
  margin,
  width,
  height,
  xLabel = "",
  yLabel = "Population"
}) {
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // X and Y scales
  const x = d3.scaleBand()
    .domain(data.map(d => d.label))
    .range([margin.left, chartWidth + margin.left])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([chartHeight + margin.top, margin.top]);

  // Colors
  const colorScale = d3.scaleSequential()
    .domain([0, data.length - 1])
    .interpolator(t => d3.interpolateBlues(0.3 + t * 0.7));

  const colorMap = {};
  data.forEach((d, i) => {
    colorMap[d.label] = colorScale(i);
  });

  const chart = svg.append("g");

  chart.selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.label))
    .attr("y", d => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => chartHeight + margin.top - y(d.value))
    .attr("fill", d => colorMap[d.label])
    .attr("data-original-fill", d => colorMap[d.label])
    .on("mouseover", function (event, d) {
      d3.select(this).attr("fill", "orange");
      tooltip
        .style("opacity", 1)
        .html(`${d.label}: ${d.value.toLocaleString()}`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px");
    })
    .on("mouseout", function () {
      const original = d3.select(this).attr("data-original-fill");
      d3.select(this).attr("fill", original);
      tooltip.style("opacity", 0);
    });

  // Axes
  chart.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${chartHeight + margin.top})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-45)");

  chart.append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).tickFormat(d3.format(".2s")))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "-3em")
    .attr("text-anchor", "end")
    .text(yLabel);
}
