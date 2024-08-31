import React, { useState, useEffect, useMemo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { geoMercator } from 'd3-geo';
import { ScatterChart, Scatter, LineChart, Line, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { X } from 'lucide-react';
import './App.css';

const geoUrl = "/countries-50m.json";

const projection = geoMercator()
  .center([50, 60])
  .scale(145)
  .translate([600, 200]);

const AnalysisView = ({ selectedCountry }) => {
  return (
    <div style={{ padding: '100px' }}>
      <h2 style={{ fontFamily: "'DM Serif Text', serif", fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        Analysis for {selectedCountry}
      </h2>
      <p style={{ fontFamily: "'Raleway', sans-serif" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, 
        nunc id aliquam tincidunt, nunc nunc tincidunt urna, id tincidunt nunc 
        nunc id aliquam. Nullam auctor, nunc id aliquam tincidunt, nunc nunc 
        tincidunt urna, id tincidunt nunc nunc id aliquam.
      </p>
      {/* Add more lorem ipsum paragraphs as needed */}
    </div>
  );
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
        <p>Vaccinations: {data.vaccinations}</p>
      </div>
    );
  }
  return null;
};

// Function to determine marker size based on call-to-action level
  const getCallToActionValue = (callToAction) => {
    if (callToAction.includes('Strong')) return 200;
    if (callToAction.includes('Moderate')) return 150;
    if (callToAction.includes('Weak')) return 100;
    return 50; // Default value for 'No Call to Action' or unclassified
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
  const [trustData, setTrustData] = useState([]);
  const [noDataMessage, setNoDataMessage] = useState(null);
  const [callToActionData, setCallToActionData] = useState({});


  const [sampleData, setSampleData] = useState([
    { date: new Date('2023-01-01').getTime(), value: 30 },
    { date: new Date('2023-06-01').getTime(), value: 70 }
  ]);

  const handleCountryClick = (countryName) => {
    if (selectedButton === 'button1') {
      setSelectedCountry(countryName);
      if (countryName !== "New Zealand") {
        setNoDataMessage(`No data available for ${countryName}`);
      } else {
        setNoDataMessage(null);
      }
    }
  };




  const handleMarkerClick = (event, index) => {
    console.log("Selected Marker Index:", index);
    if (policyData[index]) {
      setSelectedMarker(policyData[index]);
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
    Promise.all([
      // NZ data
      fetch('/vaccine_policies.json').then(response => response.json()),
      fetch('/call_to_action.txt').then(response => response.text()),
      fetch('/vaccines_nz.txt').then(response => response.text()),
      fetch('/public_service_trust.txt').then(response => response.text())

      // US data
    ])
    .then(([policyJson, callToActionText, vaccineText, trustText]) => {
      // Process policy data and call to action data
      const callToActionLines = callToActionText.trim().split('\n').slice(1);
      const callToActionMap = {};
      callToActionLines.forEach(line => {
        const [title, label, explanation] = line.split('\t');
        callToActionMap[title] = { label, explanation };
      });
      setCallToActionData(callToActionMap);
      const formattedPolicyData = policyJson.map((entry) => {
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
          content: processedContent, // Replace original content with processed content
          title: entry['title'],
          callToAction: callToAction.label,
          callToActionExplanation: callToAction.explanation,
          callToActionValue: getCallToActionValue(callToAction.label),
        };
      });
      setPolicyData(formattedPolicyData);


      // Process vaccination data
      const vaccineLines = vaccineText.trim().split('\n').slice(1);
      const formattedVaccineData = vaccineLines.map(line => {
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
          vaccinations: parseInt(vaccinations, 10)
        };
      }).filter(data => data !== null);
      setVaccinationData(formattedVaccineData);
    
      // Process trust data
      const trustLines = trustText.trim().split('\n').slice(1);
      const processedTrustData = trustLines.map(line => {
        const [dateStr, value] = line.split('\t');
        const [month, year] = dateStr.split(' ');
        const date = new Date(`${month} 1, ${year}`).getTime();
        return { date, value: parseFloat(value) * 100 }; // Convert to percentage
      });
      setTrustData(processedTrustData);
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (policyData.length > 0 && vaccinationData.length > 0) {
      const allDates = [...policyData.map(d => d.date), ...vaccinationData.map(d => d.date)];
      const minDate = Math.min(...allDates);
      const maxDate = Math.max(...allDates);
      setDateRange([minDate, maxDate]);
    }
  }, [policyData, vaccinationData]);

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
    return selectedCountry === "New Zealand" ? policyData : [];
  }, [selectedCountry, policyData]);

  const filteredVaccinationData = useMemo(() => {
    return selectedCountry === "New Zealand" ? vaccinationData : [];
  }, [selectedCountry, vaccinationData]);

  const filteredTrustData = useMemo(() => {
    if (selectedCountry !== "New Zealand") return [];
    return trustData.filter(d => d.date >= fixedStartDate && d.date <= fixedEndDate);
  }, [selectedCountry, trustData, fixedStartDate, fixedEndDate]);

  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
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
        <div style={{ width: '50%', height: '100%', position: 'relative' }}>
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
          <svg width="100%" height="100%">
            <defs>
              <clipPath id="clip">
                <rect x="0" y="0" width="100%" height="80%" />
              </clipPath>
            </defs>
            <ComposableMap projection={projection} width={1000} height={600} style={{ clipPath: 'url(#clip)' }}>
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
                          fill: geo.properties.name === selectedCountry ? "#49CEDC" : "#8E8E8E",
                          outline: "none"
                        },
                        hover: {
                          fill: "#F53", //red
                          outline: "none"
                        },
                        pressed: {
                          fill: "#E42",
                          outline: "none"
                        }
                      }}
                    />
                  ))
                }
              </Geographies>
            </ComposableMap>
          </svg>
          </>
          ) : (
            <AnalysisView selectedCountry={selectedCountry} />
          )}
        </div>
        <div style={{ width: '45%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '30%', padding: '0px' }}>
            <h2 style={{ fontFamily: "'DM Serif Text', serif", fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
              Vaccine press releases {selectedCountry !== "New Zealand" && "(Not available)"}</h2>
              <ResponsiveContainer width="100%" height="80%">
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
                  name="Readability Score" 
                  domain={[0, 100]}
                  label={{ value: 'Readability', angle: -90, position: 'insideLeft', offset: -12, style: {textAnchor: 'middle'} }}
                />
                <ZAxis 
                  dataKey="callToActionValue" 
                  range={[50, 200]}
                  name="Call to Action Strength"
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter 
                  data={filteredPolicyData}
                  fill="#49CEDC"
                  shape="circle"
                  fillOpacity={1}
                  // eslint-disable-next-line react/style-prop-object
                  stroke="none"
                  onClick={handleMarkerClick}
                />
              </ScatterChart>
            </ResponsiveContainer>

            {selectedMarker && (
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
              Vaccinations per day {selectedCountry !== "New Zealand" && "(Not available)"}
            </h2>
            <ResponsiveContainer width="100%" height="80%">
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
                  label={{ value: '# Vaccines', angle: -90, position: 'insideLeft', offset: -15, style: {textAnchor: 'middle'} }}
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
            </ResponsiveContainer>
          </div>
          <div style={{ height: '30%', padding: '10px' }}>
            <h2 style={{ fontFamily: "'DM Serif Text', serif", fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
              Public service trust {selectedCountry !== "New Zealand" && "(Not available)"}
            </h2>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart
                data={filteredTrustData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date"
                  type="number"
                  domain={[fixedStartDate, fixedEndDate]}
                  tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
                  label={{ value: 'Date', position: 'insideBottom', offset: -10 }}
                />
                <YAxis 
                  domain={[0, 100]}
                  label={{ value: 'Trust (%)', angle: -90, position: 'insideLeft', offset: -12, style: {textAnchor: 'middle'} }}
                />
                <Tooltip 
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  formatter={(value) => [`${value.toFixed(2)}%`, 'Trust']}
                />
                <Line type="monotone" dataKey="value" stroke="#49CEDC" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
