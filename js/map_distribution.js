export async function displayMapDistribution(svg, width, height) {
    const geoData = await d3.json("data/world_map.geo.json");

    try {
        const projectionDistribution = d3.geoNaturalEarth1()
        .fitSize([width, height], { type: "FeatureCollection", features: geoData.features });

        const path = d3.geoPath().projection(projectionDistribution);

        const distributionPahts = svg.selectAll("path")
        .data(geoData.features)
        .join("path")
        .attr("class", "continent")
        .attr("d", path)
        .attr("fill", "#E6F0FA") // Light blue fill
        .attr("stroke", "#999") // Grey border
        .attr("stroke-width", 0.5);

        return { projectionDistribution, distributionPahts };
    } catch (error) {
        console.error("Failed to load GeoJSON:", error);
        throw error;
    }s
    
}