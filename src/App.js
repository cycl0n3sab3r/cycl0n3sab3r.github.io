import React, { useState, useEffect, useMemo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { geoMercator } from 'd3-geo';
import { ScatterChart, Scatter, LineChart, Line, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { X, Info } from 'lucide-react';
import './App.css';

const geoUrl = "/countries-50m.json";

const projection = geoMercator()
  .center([50, 60])
  .scale(145)
  .translate([600, 200]);

const AnalysisView = ({ selectedCountry, selectedButton }) => {
  if (selectedButton === 'button2') {
    return (
      <div style={{ padding: '50px 100px', height: '100%', overflowY: 'auto' }}>
        <h2 style={{ fontFamily: "'DM Serif Text', serif", fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          Comparative Analysis: New Zealand and United Kingdom
        </h2>
        <h3>Vaccine Press Releases</h3>
        <p style={{ fontFamily: "'Raleway', sans-serif" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc id aliquam tincidunt, nunc nunc tincidunt urna, id tincidunt nunc nunc id aliquam. Nullam auctor, nunc id aliquam tincidunt, nunc nunc tincidunt urna, id tincidunt nunc nunc id aliquam.
        </p>
        <h3>Vaccinations per Day</h3>
        <p style={{ fontFamily: "'Raleway', sans-serif" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc id aliquam tincidunt, nunc nunc tincidunt urna, id tincidunt nunc nunc id aliquam. Nullam auctor, nunc id aliquam tincidunt, nunc nunc tincidunt urna, id tincidunt nunc nunc id aliquam.
        </p>
        <h3>National Government Trust</h3>
        <p style={{ fontFamily: "'Raleway', sans-serif" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc id aliquam tincidunt, nunc nunc tincidunt urna, id tincidunt nunc nunc id aliquam. Nullam auctor, nunc id aliquam tincidunt, nunc nunc tincidunt urna, id tincidunt nunc nunc id aliquam.
        </p>
        <h3>Key Takeaways</h3>
        <p style={{ fontFamily: "'Raleway', sans-serif" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc id aliquam tincidunt, nunc nunc tincidunt urna, id tincidunt nunc nunc id aliquam. Nullam auctor, nunc id aliquam tincidunt, nunc nunc tincidunt urna, id tincidunt nunc nunc id aliquam.
        </p>
      </div>
    );
  } else if (selectedCountry === 'New Zealand') {
    return (
      <div style={{ padding: '50px 100px', height: '100%', overflowY: 'auto' }}>
        <h2 style={{ fontFamily: "'DM Serif Text', serif", fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          Analysis for {selectedCountry}
        </h2>
        <h3>Vaccine Press Releases</h3>
        <p style={{ fontFamily: "'Raleway', sans-serif" }}>
            The majority of data points on the readability axis fall below 50, indicating that a significant portion of the vaccine press releases analysed were considered difficult to understand based on the Flesch reading ease test. In terms of call-to-action levels, 26 press releases had a strong rating, 56 had a moderate rating, 13 had a weak rating, and 103 had none, meaning approximately half of all vaccine announcements between 10/11/2020 and 11/03/2023 contained a call-to-action.
        </p>
        <h3>Vaccinations per Day</h3>
        <p style={{ fontFamily: "'Raleway', sans-serif" }}>
            The COVID-19 vaccination rollout in New Zealand began in early 2021, specifically on the 14th of February. The number of daily vaccines gradually increased until a spike in August 2021. In late July, vaccination opened for the general public, commencing in stages. By early September, all individuals aged 12 and older could be vaccinated. There were periods of high vaccination rates, particularly around specific dates (August and October 2021, early 2022). The August peak likely corresponds to vaccinations opening in stages to the general public. The October peak corresponds to a nationwide push to increase vaccination rates. The broad peak in early 2022 likely corresponds to the Omicron outbreak prompting booster uptake.
        </p>
        <h3>National Government Trust</h3>
        <p style={{ fontFamily: "'Raleway', sans-serif" }}>
            New Zealand typically ranks higher than the OECD average in terms of trust in the national government. The plot does show, however, that the average trust in the national government by Kiwis has declined from 62.86% to 45.86% between 2021 and 2023.
        </p>
      </div>
    );
  } else if (selectedCountry === 'United Kingdom') {
    return (
      <div style={{ padding: '50px 100px', height: '100%', overflowY: 'auto' }}>
        <h2 style={{ fontFamily: "'DM Serif Text', serif", fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          Analysis for {selectedCountry}
        </h2>
        <p style={{ fontFamily: "'Raleway', sans-serif" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, 
          nunc id aliquam tincidunt, nunc nunc tincidunt urna, id tincidunt nunc 
          nunc id aliquam. Nullam auctor, nunc id aliquam tincidunt, nunc nunc 
          tincidunt urna, id tincidunt nunc nunc id aliquam.
        </p>
        <p style={{ fontFamily: "'Raleway', sans-serif" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, 
          nunc id aliquam tincidunt, nunc nunc tincidunt urna, id tincidunt nunc 
          nunc id aliquam. Nullam auctor, nunc id aliquam tincidunt, nunc nunc 
          tincidunt urna, id tincidunt nunc nunc id aliquam.
        </p>
        <p style={{ fontFamily: "'Raleway', sans-serif" }}>
          The United Kingdom typically ranks the same or slightly lower than the OECD average in terms of trust in the national government. The plot shows a slight increase between 2021 and 2022 on the plot from 34.70 to 39.48%, before declining to 26.65% in 2023.
        </p>
      </div>
    );
  } else {
    return (
      <div style={{ padding: '50px 100px', height: '100%', overflowY: 'auto' }}>
        <h2 style={{ fontFamily: "'DM Serif Text', serif", fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          Analysis for {selectedCountry}
        </h2>
        <p style={{ fontFamily: "'Raleway', sans-serif" }}>
          No analysis available yet.
        </p>
      </div>
    );
  }
};


const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
        <p>Date: {new Date(data.date).toLocaleDateString()}</p>
        <p>Readability score: {data.readabilityScore.toFixed(2)}</p>
        <p>Call-to-action: {data.callToAction}</p>
      </div>
    );
  }
  return null;
};

const VaccinationTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
        <p>Date: {new Date(data.date).toLocaleDateString()}</p>
        <p>Vaccinations: {data.vaccinations.toFixed(2)} </p>
      </div>
    );
  }
  return null;
};

// Function to determine marker size based on call-to-action level
  const getCallToActionValue = (callToAction) => {
    if (callToAction.includes('Strong')) return 100;
    if (callToAction.includes('Moderate')) return 75;
    if (callToAction.includes('Weak')) return 50;
    return 20; // Default value for 'No Call to Action' or unclassified
  };

  const InfoHover = ({ content, source }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div style={{ display: 'inline-block', position: 'relative', fontFamily: "'Raleway', sans-serif", fontWeight: 'normal'}}>
        <Info
          size={16}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ marginLeft: '5px', cursor: 'pointer' }}
        />
        {isHovered && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: 1000,
            width: '400px',
            fontSize: '14px',
          }}>
            <p>{content}</p>
            <p>Source: {source}</p>
          </div>
        )}
      </div>
    );
  };




function App() {
  // State variables
  const [selectedButton, setSelectedButton] = useState('button1');
  const [viewMode, setViewMode] = useState('map');
  const [policyData, setPolicyData] = useState([]);
  const [vaccinationData, setVaccinationData] = useState([]);
  const [dateRange, setDateRange] = useState([0, 1]);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("New Zealand");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [processedPolicyData, setProcessedPolicyData] = useState([]);
  // const [trustData, setTrustData] = useState([]);
  const [noDataMessage, setNoDataMessage] = useState(null);
  const [ukPolicyData, setUkPolicyData] = useState([]);
  const [trustDateRange, setTrustDateRange] = useState([new Date('2020-01-01').getTime(), new Date('2023-06-30').getTime()]);
  const [callToActionData, setCallToActionData] = useState({
    "New Zealand": {},
    "United Kingdom": {}
  });
  const [govTrustData, setGovTrustData] = useState({
    "New Zealand": [],
    "United Kingdom": []
  });
  const [comparisonData, setComparisonData] = useState({
    "New Zealand": [],
    "United Kingdom": []
  });

  const [sampleData, setSampleData] = useState([
    { date: new Date('2023-01-01').getTime(), value: 30 },
    { date: new Date('2023-06-01').getTime(), value: 70 }
  ]);

  const handleCountryClick = (countryName) => {
    if (selectedButton === 'button1') {
      setSelectedCountry(countryName);
      if (countryName !== "New Zealand" && countryName !== "United Kingdom") {
        setNoDataMessage(`No data available for ${countryName}`);
      } else {
        setNoDataMessage(null);
      }
    }
  };

  const processComparisonData = (data) => {
    return data.map(item => ({
      date: item.date,
      readabilityScore: item.readabilityScore,
      callToActionValue: item.callToActionValue
    }));
  };


  // Update the government trust data processing
  const processGovTrustData = (lines) => {
    return lines.map(line => {
      const [year, value] = line.split('\t');
      const date = new Date(`${year}-01-01`).getTime();
      return { date, value: parseFloat(value) };
    });
  };


  const handleMarkerClick = (event, index) => {
    console.log("Selected Marker Index:", index);
    if (selectedCountry === "New Zealand" && policyData[index]) {
      setSelectedMarker(policyData[index]);
    } else if (selectedCountry === "United Kingdom" && ukPolicyData[index]) {
      setSelectedMarker(ukPolicyData[index]);
    }
  };

  const closePopup = () => {
    setSelectedMarker(null);
  };

  const movingAverageData = useMemo(() => {
    if (policyData.length === 0) return [];
    
    const windowSize = 7; // 7-day moving average
    const sortedData = [...policyData].sort((a, b) => a.date - b.date);
    
    return sortedData.map((item, index, array) => {
      const startIndex = Math.max(0, index - windowSize + 1);
      const windowSlice = array.slice(startIndex, index + 1);
      const sum = windowSlice.reduce((acc, curr) => acc + curr.readabilityScore, 0);
      const average = sum / windowSlice.length;
      console.log(average)
      return {
        date: item.date,
        movingAverage: average
      };
    });
  }, [policyData]);


  const legendItems = [
      { class: 'highlight-complex-word', label: 'Complex Word' },
      { class: 'highlight-passive', label: 'Passive Voice' },
      { class: 'highlight-long-sentence', label: 'Long Sentence' },
    ];

  useEffect(() => {
    setComparisonData({
      "New Zealand": processComparisonData(policyData),
      "United Kingdom": processComparisonData(ukPolicyData)
    });
  }, [policyData, ukPolicyData]);



  useEffect(() => {
    Promise.all([
      // NZ data
      fetch('/vaccine_policies.json').then(response => response.json()),
      fetch('/call_to_action.txt').then(response => response.text()),
      fetch('/vaccines_nz_pop.txt').then(response => response.text()),
      // fetch('/public_service_trust.txt').then(response => response.text())
      fetch('/gov_trust_nz.txt').then(response => response.text()),

      // UK data
      fetch('/uk_vaccine_policies.json').then(response => response.json()),
      fetch('/call_to_action_uk.txt').then(response => response.text()),
      fetch('/vaccines_uk_pop.txt').then(response => response.text()),
      fetch('/gov_trust_uk.txt').then(response => response.text()),

    ])
    .then(([policyJson, callToActionText, vaccineNzText, govTrustNzText, ukPolicyJson, ukCallToActionText, vaccineUkText, govTrustUkText]) => {
      
      // Process NZ call to action data
      const nzCallToActionMap = processCallToActionData(callToActionText);
      
      // Process UK call to action data
      const ukCallToActionMap = processCallToActionData(ukCallToActionText);

      setCallToActionData({
        "New Zealand": nzCallToActionMap,
        "United Kingdom": ukCallToActionMap
      });

      // Process NZ policy data
      const formattedPolicyData = processPolicyData(policyJson, nzCallToActionMap);
      setPolicyData(formattedPolicyData);

      // Process UK policy data
      const formattedUkPolicyData = processPolicyData(ukPolicyJson, ukCallToActionMap);
      setUkPolicyData(formattedUkPolicyData);


      // Process NZ vaccination data
      const vaccineNzLines = vaccineNzText.trim().split('\n').slice(1);
      const formattedVaccineNzData = processVaccinationData(vaccineNzLines);

      // Process UK vaccination data
      const vaccineUkLines = vaccineUkText.trim().split('\n').slice(1);
      const formattedVaccineUkData = processVaccinationData(vaccineUkLines);

      setVaccinationData({
        "New Zealand": formattedVaccineNzData,
        "United Kingdom": formattedVaccineUkData
      });
    
      // Process trust data
      // const trustLines = trustText.trim().split('\n').slice(1);
      // const processedTrustData = trustLines.map(line => {
      //   const [dateStr, value] = line.split('\t');
      //   const [month, year] = dateStr.split(' ');
      //   const date = new Date(`${month} 1, ${year}`).getTime();
      //   return { date, value: parseFloat(value) * 100 }; // Convert to percentage
      // });
      // setTrustData(processedTrustData);

      // Process NZ government trust data
      const nzGovTrustLines = govTrustNzText.trim().split('\n').slice(1);
      const processedNzGovTrustData = processGovTrustData(nzGovTrustLines);

      // Process UK government trust data
      const ukGovTrustLines = govTrustUkText.trim().split('\n').slice(1);
      const processedUkGovTrustData = processGovTrustData(ukGovTrustLines);


      setGovTrustData({
        "New Zealand": processedNzGovTrustData,
        "United Kingdom": processedUkGovTrustData
      });

    })
    .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Helper function to process call to action data
  const processCallToActionData = (callToActionText) => {
    const callToActionLines = callToActionText.trim().split('\n').slice(1);
    const callToActionMap = {};
    callToActionLines.forEach(line => {
      const [title, label, explanation] = line.split('\t');
      callToActionMap[title] = { label, explanation };
    });
    return callToActionMap;
  };

  // Helper function to process policy data
  const processPolicyData = (policyJson, callToActionMap) => {
    return policyJson.map((entry) => {
      const callToAction = callToActionMap[entry.title] || { label: 'Unknown', explanation: 'No data available' };

      const textMetricPairs = entry.analysis.reduce((acc, item) => {
        acc[item.text] = item.metric;
        return acc;
      }, {});

      const processedContent = processContent(entry.content, textMetricPairs);

      return {
        date: new Date(entry.date).getTime(),
        readabilityScore: entry['Reading Ease'],
        jargonPercentage: entry['Complex Word Frequency'] * 100,
        avgSentenceLength: entry['Average Sentence Length'],
        passiveVoicePercentage: entry['Passive Voice Frequency'] * 100,
        content: processedContent,
        title: entry['title'],
        callToAction: callToAction.label,
        callToActionExplanation: callToAction.explanation,
        callToActionValue: getCallToActionValue(callToAction.label),
      };
    });
  };

  // Helper function to process vaccination data
  const processVaccinationData = (lines) => {
    return lines.map(line => {
      const [dateStr, vaccinations] = line.trim().split(/\s+/);
      if (!dateStr || !vaccinations) {
        console.error('Invalid line format:', line);
        return null;
      }

      const [day, month, year] = dateStr.split('/');
      const parsedDate = new Date(`${year}-${month}-${day}`);
      if (isNaN(parsedDate.getTime())) {
        console.error('Invalid date:', dateStr);
        return null;
      }

      return {
        date: parsedDate.getTime(),
        vaccinations: parseFloat(vaccinations) // Parse as float instead of int
      };
    }).filter(data => data !== null);
  };


  useEffect(() => {
    if (policyData.length > 0) {
      const policyDates = policyData.map(d => d.date);
      const minDate = Math.min(...policyDates);
      const maxDate = Math.max(...policyDates);
      setDateRange([minDate, maxDate]);
    }
  }, [policyData]);

  const processContent = (content, textMetricPairs) => {
    let processedContent = content;
    for (const [text, metric] of Object.entries(textMetricPairs)) {
      const spanClass = getSpanClass(metric);
      const wrappedText = `<span class="${spanClass}">${text}</span>`;
      processedContent = processedContent.replace(text, wrappedText);
    }
    return processedContent;
  };

  const getSpanClass = (metric) => {
    switch (metric) {
      case 'Passive Voice':
        return 'highlight-passive';
      case 'Long Sentence':
        return 'highlight-long-sentence';
      case 'Complex Word':
        return 'highlight-complex-word';
      default:
        return '';
    }
  };

  const fixedStartDate = new Date('2020-11-10').getTime();
  const fixedEndDate = new Date('2023-06-14').getTime();

  const filteredPolicyData = useMemo(() => {
    if (selectedCountry === "New Zealand") {
      return policyData;
    } else if (selectedCountry === "United Kingdom") {
      return ukPolicyData;
    }
    return [];
  }, [selectedCountry, policyData, ukPolicyData]);

  const filteredVaccinationData = useMemo(() => {
    if ((selectedCountry === "New Zealand" || selectedCountry === "United Kingdom") && vaccinationData[selectedCountry]) {
      return vaccinationData[selectedCountry].filter(d => d.date >= dateRange[0] && d.date <= dateRange[1]);
    }
    return [];
  }, [selectedCountry, vaccinationData, dateRange]);

  // const filteredTrustData = useMemo(() => {
  //   if (selectedCountry !== "New Zealand") return [];
  //   return trustData.filter(d => d.date >= fixedStartDate && d.date <= fixedEndDate);
  // }, [selectedCountry, trustData, fixedStartDate, fixedEndDate]);

  const filteredGovTrustData = useMemo(() => {
    if (selectedCountry === "New Zealand" || selectedCountry === "United Kingdom") {
      return govTrustData[selectedCountry];
    }
    return [];
  }, [selectedCountry, govTrustData]);


  const renderVaccinationChart = () => {
    if (selectedButton === 'button1') {
      return (
        <LineChart
          data={filteredVaccinationData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            name="Date" 
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
            type="number"
            domain={dateRange}
            label={{ value: 'Date', position: 'insideBottom', offset: -10 }}
          />
          <YAxis 
            dataKey="vaccinations" 
            name="Vaccinations" 
            label={{ value: 'Doses (w.r.t. pop.)', angle: -90, position: 'insideLeft', offset: -15, style: {textAnchor: 'middle'} }}
          />
          <Tooltip content={<VaccinationTooltip />} />
          <Line 
            type="monotone" 
            dataKey="vaccinations" 
            stroke="#F53"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      );
    } else {
      // Render line chart for compare countries view
      const combinedData = [];
      const nzData = vaccinationData["New Zealand"] || [];
      const ukData = vaccinationData["United Kingdom"] || [];

      for (let d = dateRange[0]; d <= dateRange[1]; d += 86400000) { // 86400000 ms = 1 day
        const nzPoint = nzData.find(item => item.date === d);
        const ukPoint = ukData.find(item => item.date === d);
        combinedData.push({
          date: d,
          nzVaccinations: nzPoint ? nzPoint.vaccinations : null,
          ukVaccinations: ukPoint ? ukPoint.vaccinations : null,
        });
      }

      return (
        <LineChart
          data={combinedData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            name="Date" 
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
            type="number"
            domain={dateRange}
            label={{ value: 'Date', position: 'insideBottom', offset: -10 }}
          />
          <YAxis 
            name="Vaccinations" 
            tickFormatter={(value) => value.toFixed(2)}
            label={{ value: 'Doses (population adjusted)', angle: -90, position: 'insideLeft', offset: -15, style: {textAnchor: 'middle'} }}
          />
          <Tooltip 
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
            formatter={(value, name) => [value ? value.toFixed(2) : 'N/A', name]}
          />
          <Line 
            type="monotone" 
            dataKey="nzVaccinations" 
            stroke="#F53"
            strokeWidth={2}
            dot={false}
            name="NZ Vaccinations"
            connectNulls={true}
          />
          <Line 
            type="monotone" 
            dataKey="ukVaccinations"  
            stroke="#3399ff"
            strokeWidth={2}
            dot={false}
            name="UK Vaccinations"
            connectNulls={true}
          />
        </LineChart>
      );
    }
  };

  const renderVaccineReleasesChart = () => {
    if (selectedButton === 'button1') {
      // Render scatter plot for individual country view
      return (
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            name="Date" 
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
            type="number"
            domain={dateRange}
            label={{ value: 'Date', position: 'insideBottom', offset: -10 }}
          />
          <YAxis 
            dataKey="readabilityScore" 
            name="Readability" 
            domain={[0, 100]}
            label={{ value: 'Readability', angle: -90, position: 'insideLeft', offset: -12, style: {textAnchor: 'middle'} }}
          />
          <ZAxis 
            dataKey="callToActionValue" 
            range={[20, 100]}
            name="Call to Action Strength"
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter 
            data={filteredPolicyData}
            fill="#49CEDC"
            shape="circle"
            fillOpacity={1}
            stroke="none"
            onClick={handleMarkerClick}
          />
        </ScatterChart>
      );
    } else {
      // Render line chart for compare countries view
      const sortedNZData = [...comparisonData["New Zealand"]].sort((a, b) => a.date - b.date);
      const sortedUKData = [...comparisonData["United Kingdom"]].sort((a, b) => a.date - b.date);

      // Find the overall date range
      const allDates = [...sortedNZData, ...sortedUKData].map(d => d.date);
      const minDate = Math.min(...allDates);
      const maxDate = Math.max(...allDates);

      // Create a combined dataset with all dates
      const combinedData = [];
      for (let d = minDate; d <= maxDate; d += 86400000) { // 86400000 ms = 1 day
        const nzPoint = sortedNZData.find(item => item.date === d);
        const ukPoint = sortedUKData.find(item => item.date === d);
        combinedData.push({
          date: d,
          nzReadability: nzPoint ? nzPoint.readabilityScore : null,
          ukReadability: ukPoint ? ukPoint.readabilityScore : null,
        });
      }




      return (
        <LineChart data={combinedData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            name="Date" 
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
            type="number"
            domain={[minDate, maxDate]}
            label={{ value: 'Date', position: 'insideBottom', offset: -10 }}
          />
          <YAxis 
            name="Score" 
            domain={[0, 100]}
            label={{ value: 'Readability', angle: -90, position: 'insideLeft', offset: -12, style: {textAnchor: 'middle'} }}
          />
          <Tooltip 
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
            formatter={(value, name) => [value ? value.toFixed(2) : 'N/A', name]}
          />
          <Line 
            type="monotone" 
            dataKey="nzReadability" 
            stroke="#F53"
            strokeWidth={2}
            dot={false}
            name="NZ Readability"
            connectNulls={true}
          />
          <Line 
            type="monotone" 
            dataKey="ukReadability"  
            stroke="#3399ff"
            strokeWidth={2}
            dot={false}
            name="UK Readability"
            connectNulls={true}
          />
        </LineChart>
      );
    }
  };

  const renderTrustChart = () => {
    const dataEndDate = new Date('2023-03-31').getTime(); // Assuming data ends at the end of Q1 2023
    const displayEndDate = new Date('2023-01-01').getTime(); // Display axis until end of 2023

    if (selectedButton === 'button1') {
      // Render line chart for individual country view
      return (
        <LineChart
          data={filteredGovTrustData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            type="number"
            domain={[new Date('2020-01-01').getTime(), displayEndDate]}
            tickFormatter={(timestamp) => new Date(timestamp).getFullYear()}
            ticks={[
              new Date('2020-01-01').getTime(),
              new Date('2021-01-01').getTime(),
              new Date('2022-01-01').getTime(),
              new Date('2023-01-01').getTime()
            ]}
            label={{ value: 'Year', position: 'insideBottom', offset: -10 }}
          />
          <YAxis 
            domain={[0, 100]}
            label={{ value: 'Trust (%)', angle: -90, position: 'insideLeft', offset: -12, style: {textAnchor: 'middle'} }}
          />
          <Tooltip 
            labelFormatter={(label) => new Date(label).getFullYear()}
            formatter={(value) => [`${value.toFixed(2)}%`, 'Trust']}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#49CEDC" 
            strokeWidth={2} 
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      );
    } else {
      // Render line chart for compare countries view
      const nzData = govTrustData["New Zealand"] || [];
      const ukData = govTrustData["United Kingdom"] || [];

      const combinedData = nzData.map(nzPoint => {
        const ukPoint = ukData.find(uk => uk.date === nzPoint.date);
        return {
          date: nzPoint.date,
          nzTrust: nzPoint.value,
          ukTrust: ukPoint ? ukPoint.value : null,
        };
      });

      return (
        <LineChart
          data={combinedData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            type="number"
            domain={[new Date('2020-01-01').getTime(), displayEndDate]}
            tickFormatter={(timestamp) => new Date(timestamp).getFullYear()}
            ticks={[
              new Date('2020-01-01').getTime(),
              new Date('2021-01-01').getTime(),
              new Date('2022-01-01').getTime(),
              new Date('2023-01-01').getTime()
            ]}
            label={{ value: 'Year', position: 'insideBottom', offset: -10 }}
          />
          <YAxis 
            domain={[0, 100]}
            label={{ value: 'Trust (%)', angle: -90, position: 'insideLeft', offset: -12, style: {textAnchor: 'middle'} }}
          />
          <Tooltip 
            labelFormatter={(label) => new Date(label).getFullYear()}
            formatter={(value, name) => [value ? `${value.toFixed(2)}%` : 'N/A', name]}
          />
          <Line 
            type="monotone" 
            dataKey="nzTrust" 
            stroke="#F53"
            strokeWidth={2}
            name="NZ Trust"
            connectNulls={true}
            dot={false}
            isAnimationActive={false}
          />
          <Line 
            type="monotone" 
            dataKey="ukTrust"  
            stroke="#3399ff"
            strokeWidth={2}
            name="UK Trust"
            connectNulls={true}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      );
    }
  };
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', padding: '0 20px 0 40px' }}>
      <div style={{ width: '100%', textAlign: 'center', marginBottom: '20px' }}>
        <h1>
          How COVID-19 Vaccine Government Announcements Varied by Country
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '200px', marginTop: '15px' }}>
          <div>
            <h2>Toggle view:</h2>
            <div style={{ marginTop: '10px' }}>
              <button
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: '#49CEDC',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontFamily: "'Raleway', sans-serif",
                }}
                onClick={() => setViewMode(viewMode === 'map' ? 'analysis' : 'map')}
              >
                {viewMode === 'map' ? 'Analysis' : 'Map'}
              </button>
            </div>
          </div>
          <div>
            <h2>Analysis Type:</h2>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: selectedButton === 'button1' ? '#F53' : '#e0e0e0',
                  color: selectedButton === 'button1' ? '#fff' : '#000',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontFamily: "'Raleway', sans-serif",
                }}
                onClick={() => setSelectedButton('button1')}
              >
                Individual country
              </button>
              <button
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: selectedButton === 'button2' ? '#F53' : '#e0e0e0',
                  color: selectedButton === 'button2' ? '#fff' : '#000',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontFamily: "'Raleway', sans-serif",
                }}
                onClick={() => setSelectedButton('button2')}
              >
                Compare countries
              </button>
            </div>
            
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <div style={{ width: '50%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {viewMode === 'map' ? (
            <>
          {noDataMessage && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                zIndex: 2,
              }}
            >
              {noDataMessage}
            </div>
          )}
          <div
            style={{
              position: 'absolute',
              top: '0px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              padding: '1px 10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              zIndex: 1,
              display: hoveredCountry ? 'block' : 'none'
            }}
          >
            <p>{hoveredCountry}</p>
          </div>
          <svg width="100%" height="80%">
            <defs>
              <clipPath id="clip">
                <rect x="0" y="0" width="100%" height="100%" />
              </clipPath>
            </defs>
            <g style={{ clipPath: 'url(#clip)' }}>
              <ComposableMap projection={projection} width={1000} height={600}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map(geo => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => setHoveredCountry(geo.properties.name)}
                        onMouseLeave={() => setHoveredCountry(null)}
                        onClick={() => handleCountryClick(geo.properties.name)}
                        style={{
                          default: {
                            fill: geo.properties.name === selectedCountry 
                              ? "#F53"  //red
                              : (geo.properties.name === "New Zealand" || geo.properties.name === "United Kingdom")
                                ? "#3399FF"
                                : "#8E8E8E",
                            outline: "none"
                          },
                          hover: {
                            fill: "#49CEDC",
                            outline: "none"
                          },
                          pressed: {
                            fill: "#F53",
                            outline: "none"
                          }
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ComposableMap>
            </g>
          </svg>
          <div style={{ padding: '20px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '40px', }}>
            <h3 style={{ fontFamily: "'DM Serif Text', serif", margin: 0 }}>
              {selectedButton === 'button1' ? (
                <>Selected country: <span style={{ color: '#F53' }}>{selectedCountry}</span></>
              ) : (
                <>Selected countries: <span style={{ color: '#F53' }}>New Zealand, United Kingdom</span></>
              )}
            </h3>
            <h3 style={{ fontFamily: "'DM Serif Text', serif", margin: 0 }}>
              Available countries: <span style={{ color: '#3399FF' }}>New Zealand, United Kingdom</span>
            </h3>
          
          </div>
          </>
          ) : (
            <AnalysisView selectedCountry={selectedCountry} selectedButton={selectedButton} />
          )}
        </div>
        <div style={{ width: '45%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '30%', padding: '0px' }}>
            <h2 style={{ fontFamily: "'DM Serif Text', serif", fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
              Vaccine press releases {selectedCountry !== "New Zealand" && selectedCountry !== "United Kingdom" && "(Not available)"}
              <InfoHover 
                content={selectedButton === 'button1' 
                  ? "This plot shows vaccine-related press releases from the selected country's government over time. Each blue marker represents one press release. You can hover and click these markers to view more detailed information about a given press release. The position of the marker on the y-axis indicates the readability score of the release, which is a measure of how easy it is to read, with 100 being the easiest (calculated using Flesch Reading Ease). The size of each marker represents the call-to-action level, which indicates how strongly the release urges the public to take specific actions, like getting vaccinated, (this score has been assessed by a large language model using a set prompt)."
                  : "This plot compares the readability scores and call-to-action levels of vaccine-related press releases from New Zealand and the United Kingdom over time. Solid lines represent readability scores, while dashed lines represent call-to-action levels. Red lines are for New Zealand, and blue lines are for the United Kingdom."}
                source="NLTK and textstat Python libraries; ChatGPT-4 API"
              />
            </h2>
            <ResponsiveContainer width="100%" height="80%">
              {renderVaccineReleasesChart()}
            </ResponsiveContainer>

            {selectedMarker && selectedButton === 'button1' && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              width: '80%',
              maxHeight: '80%',
              overflowY: 'auto',
              zIndex: 1000
            }}>
              <button onClick={closePopup} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} />
              </button>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, marginRight: '0px' }}>
                  <h3>{selectedMarker.title || 'Untitled'}</h3>
                  <div 
                    style={{ maxHeight: '400px', overflowY: 'auto', fontFamily: "'Raleway', sans-serif" }}
                    dangerouslySetInnerHTML={{ __html: selectedMarker.content || 'No content available' }}
                  />
                </div>
                <div style={{ flex: 1, marginLeft: '10px' }}>
                  <h3>Metrics</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
                    <thead>
                      <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Readability (/100)</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Jargon</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Average sentence length</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Passive voice</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{selectedMarker.readabilityScore ? selectedMarker.readabilityScore.toFixed(2) : 'N/A'}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{selectedMarker.jargonPercentage ? (selectedMarker.jargonPercentage).toFixed(2) + '%' : 'N/A'}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{selectedMarker.avgSentenceLength ? selectedMarker.avgSentenceLength.toFixed(2) + ' words' : 'N/A'}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{selectedMarker.passiveVoicePercentage ? (selectedMarker.passiveVoicePercentage).toFixed(2) + '%' : 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                                    
                  <h3>Legend</h3>
                  <div style={{ marginTop: '10px' }}>
                    {legendItems.map((item, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <div 
                          style={{ 
                            width: '20px', 
                            height: '20px', 
                            marginRight: '10px',
                            border: '1px solid #ccc'
                          }} 
                          className={item.class} 
                        />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <p><strong>Call to action:</strong> {selectedMarker.callToAction ? (selectedMarker.callToAction) : 'N/A'}</p>
                  <p style={{ fontFamily: "'Raleway', sans-serif" }}>
                    <strong>Explanation:</strong> {selectedMarker.callToActionExplanation || 'No explanation available'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
          <div style={{ height: '30%', padding: '0px' }}>
            <h2 style={{ fontFamily: "'DM Serif Text', serif", fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
              Vaccinations per day (population adjusted) {selectedCountry !== "New Zealand" && selectedCountry !== "United Kingdom" && selectedButton === 'button1' && "(Not available)"}
              <InfoHover 
                content={selectedButton === 'button1'
                  ? "This graph shows the daily number of COVID-19 vaccines administered in the selected country, adjusted for population density, based on official numbers provided by governments and health ministries."
                  : "This graph compares the daily number of COVID-19 vaccines administered in New Zealand and the United Kingdom, adjusted for population density, based on official numbers provided by governments and health ministries."}
                source="Our World in Data (2024); World Health Organisation (2024)"
              />
            </h2>
          <ResponsiveContainer width="100%" height="80%">
            {renderVaccinationChart()}
          </ResponsiveContainer>
        </div>
          <div style={{ height: '30%', padding: '10px' }}>
           <h2 style={{ fontFamily: "'DM Serif Text', serif", fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
          National government trust {selectedButton === 'button1' && selectedCountry !== "New Zealand" && selectedCountry !== "United Kingdom" && "(Not available)"}
          <InfoHover 
            content={selectedButton === 'button1'
              ? "This plot shows the trust in national government by year for the selected country, based on the OECD Trust surveys on the share of people who report having confidence in the national government."
              : "This plot compares the trust in national government by year for New Zealand and the United Kingdom, based on the OECD Trust surveys on the share of people who report having confidence in the national government."}
            source="OECD Trust Survey Data"
          />
        </h2>
        <ResponsiveContainer width="100%" height="80%">
          {renderTrustChart()}
        </ResponsiveContainer>
      </div>
        </div>
      </div>
    </div>
  );
}

export default App;
