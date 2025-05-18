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
  
  // Custom function to format numbers with spaces and 3 decimal places
 export function formatNumber(value) {
    // Remove commas from the input string
    const cleanValue = value.replace(/,/g, '');
    
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