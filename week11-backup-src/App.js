import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { geoMercator } from 'd3-geo';
import { ScatterChart, Scatter, LineChart, Line, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';


const geoUrl = "/countries-50m.json";

const projection = geoMercator()
  .center([50, 60])
  .scale(100)
  .translate([500, 225]);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
        <p>Date: {new Date(data.date).toLocaleDateString()}</p>
        <p>Readability Score: {data.readabilityScore.toFixed(2)}</p>
        <p>Jargon Percentage: {data.jargonPercentage.toFixed(2)}%</p>
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

function App() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [policyData, setPolicyData] = useState([]);
  const [vaccinationData, setVaccinationData] = useState([]);
  const [dateRange, setDateRange] = useState([0, 1]);
  const [hoveredCountry, setHoveredCountry] = useState(null);

  useEffect(() => {
    // Fetch policy data
    fetch('/vaccine_policies.json')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(entry => ({
          date: new Date(entry.date).getTime(),
          readabilityScore: entry['Reading Ease'],
          jargonPercentage: entry['Complex Word Frequency'] * 100
        }));
        setPolicyData(formattedData);
      })
      .catch(error => console.error('Error fetching policy data:', error));

    // Fetch vaccine data
    fetch('/vaccines_nz.txt')
      .then(response => response.text())
      .then(text => {
        const lines = text.trim().split('\n').slice(1); // Skip header
        const formattedData = lines.map(line => {
          const [dateStr, vaccinations] = line.trim().split(/\s+/); // Use regex to handle multiple spaces
          if (!dateStr || !vaccinations) {
            console.error('Invalid line format:', line);
            return null;
          }

          const [day, month, year] = dateStr.split('/');
          // Check if date parsing is correct
          const parsedDate = new Date(`${year}-${month}-${day}`);
          if (isNaN(parsedDate.getTime())) {
            console.error('Invalid date:', dateStr);
            return null;
          }

          return {
            date: parsedDate.getTime(),
            vaccinations: parseInt(vaccinations, 10)
          };
        }).filter(data => data !== null); // Filter out any invalid data

        setVaccinationData(formattedData);
      })
      .catch(error => console.error('Error fetching vaccine data:', error));
  }, []);

  useEffect(() => {
    if (policyData.length > 0 && vaccinationData.length > 0) {
      const allDates = [...policyData.map(d => d.date), ...vaccinationData.map(d => d.date)];
      const minDate = Math.min(...allDates);
      const maxDate = Math.max(...allDates);
      setDateRange([minDate, maxDate]);
    }
  }, [policyData, vaccinationData]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <div style={{ width: '100%', textAlign: 'center', marginBottom: '20px' }}>
        <h1>
          How COVID-19 Vaccine Government Announcements Varied by Country
        </h1>
        <h2>
          Analysis type:
        </h2>
        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            style={{
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: selectedButton === 'button1' ? '#49CEDC' : '#e0e0e0',
              color: selectedButton === 'button1' ? '#fff' : '#000',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedButton('button1')}
          >
            Individual country
          </button>
          <button
            style={{
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: selectedButton === 'button2' ? '#49CEDC' : '#e0e0e0',
              color: selectedButton === 'button2' ? '#fff' : '#000',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedButton('button2')}
          >
            Compare countries
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <div style={{ width: '50%', height: '100%' }}>
          <svg width="100%" height="100%">
            <defs>
              <clipPath id="clip">
                <rect x="0" y="0" width="100%" height="75%" />
              </clipPath>
            </defs>
            <ComposableMap projection={projection} style={{ clipPath: 'url(#clip)' }}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: geo.properties.name === "New Zealand" ? "#49CEDC" : "#8E8E8E",
                          outline: "none"
                        },
                        hover: {
                          fill: "#F53",
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
        </div>
        <div style={{ width: '45%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '50%', padding: '10px' }}>
            <h2 style={{ fontFamily: "'DM Serif Text', serif", fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Vaccine policy readability</h2>
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
                  label={{ value: 'Readability', angle: -90, position: 'insideLeft', offset: 0 }}
                />
                <ZAxis 
                  dataKey="jargonPercentage" 
                  range={[1, 200]}
                  name="Jargon Percentage"
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter 
                  name="Policy Readability" 
                  data={policyData} 
                  fill="#3ACFD4"
                  shape="circle"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div style={{ height: '50%', padding: '10px' }}>
            <h2 style={{ fontFamily: "'DM Serif Text', serif", fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Daily vaccinations</h2>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={vaccinationData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
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
                  name="Daily Vaccinations"
                  label={{ value: 'Vaccinations', angle: -90, position: 'insideLeft', offset: 0 }}
                />
                <Tooltip content={<VaccinationTooltip />} />
                <Line type="monotone" dataKey="vaccinations" stroke="#FF6565" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;