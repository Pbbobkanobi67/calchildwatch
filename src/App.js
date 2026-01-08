import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Search, AlertTriangle, Building2, DollarSign, Users, MapPin, ExternalLink, Filter, ChevronDown, ChevronRight, Info, ArrowLeft } from 'lucide-react';
import './App.css';

// Import state configurations
import { getState, getAllStates } from './states';
import StateSelector from './components/StateSelector';

// California counties with population data for context
const CALIFORNIA_COUNTIES = [
  { name: "Alameda", population: 1682353 },
  { name: "Alpine", population: 1204 },
  { name: "Amador", population: 40474 },
  { name: "Butte", population: 211632 },
  { name: "Calaveras", population: 45292 },
  { name: "Colusa", population: 21917 },
  { name: "Contra Costa", population: 1165927 },
  { name: "Del Norte", population: 27743 },
  { name: "El Dorado", population: 193221 },
  { name: "Fresno", population: 1008654 },
  { name: "Glenn", population: 28917 },
  { name: "Humboldt", population: 136310 },
  { name: "Imperial", population: 179702 },
  { name: "Inyo", population: 19016 },
  { name: "Kern", population: 909235 },
  { name: "Kings", population: 153443 },
  { name: "Lake", population: 68163 },
  { name: "Lassen", population: 32730 },
  { name: "Los Angeles", population: 9829544 },
  { name: "Madera", population: 160089 },
  { name: "Marin", population: 262321 },
  { name: "Mariposa", population: 17131 },
  { name: "Mendocino", population: 91305 },
  { name: "Merced", population: 286461 },
  { name: "Modoc", population: 8700 },
  { name: "Mono", population: 13195 },
  { name: "Monterey", population: 439035 },
  { name: "Napa", population: 138019 },
  { name: "Nevada", population: 102241 },
  { name: "Orange", population: 3186989 },
  { name: "Placer", population: 412300 },
  { name: "Plumas", population: 19790 },
  { name: "Riverside", population: 2458395 },
  { name: "Sacramento", population: 1585055 },
  { name: "San Benito", population: 66677 },
  { name: "San Bernardino", population: 2194710 },
  { name: "San Diego", population: 3298634 },
  { name: "San Francisco", population: 873965 },
  { name: "San Joaquin", population: 789410 },
  { name: "San Luis Obispo", population: 283111 },
  { name: "San Mateo", population: 764442 },
  { name: "Santa Barbara", population: 446527 },
  { name: "Santa Clara", population: 1936259 },
  { name: "Santa Cruz", population: 267792 },
  { name: "Shasta", population: 182155 },
  { name: "Sierra", population: 3236 },
  { name: "Siskiyou", population: 44076 },
  { name: "Solano", population: 453491 },
  { name: "Sonoma", population: 488863 },
  { name: "Stanislaus", population: 552999 },
  { name: "Sutter", population: 99063 },
  { name: "Tehama", population: 65829 },
  { name: "Trinity", population: 16060 },
  { name: "Tulare", population: 477054 },
  { name: "Tuolumne", population: 55620 },
  { name: "Ventura", population: 843843 },
  { name: "Yolo", population: 216403 },
  { name: "Yuba", population: 81575 }
];

// Sample facility data for San Diego County (our pilot)
// This would be populated from CCLD database scraping
const SAMPLE_FACILITIES = [
  {
    id: "370812345",
    name: "Sunshine Learning Center",
    type: "Child Care Center",
    address: "1234 Main St, San Diego, CA 92101",
    capacity: 75,
    status: "Active",
    lastInspection: "2025-11-15",
    violations: 2,
    subsidyPayments: null, // Awaiting CPRA data
    enrolledChildren: null, // Awaiting CPRA data
    flagged: false
  },
  {
    id: "370812346",
    name: "Little Stars Daycare",
    type: "Child Care Center",
    address: "5678 Ocean Blvd, San Diego, CA 92109",
    capacity: 120,
    status: "Active",
    lastInspection: "2025-10-22",
    violations: 0,
    subsidyPayments: null,
    enrolledChildren: null,
    flagged: false
  },
  {
    id: "370812347",
    name: "ABC Family Child Care",
    type: "Family Child Care Home - Large",
    address: "9012 Park Ave, Chula Vista, CA 91910",
    capacity: 14,
    status: "Active",
    lastInspection: "2025-09-30",
    violations: 1,
    subsidyPayments: null,
    enrolledChildren: null,
    flagged: false
  },
  {
    id: "370812348",
    name: "Happy Kids Academy",
    type: "Child Care Center",
    address: "3456 University Ave, San Diego, CA 92104",
    capacity: 99,
    status: "Active",
    lastInspection: "2025-08-14",
    violations: 5,
    subsidyPayments: null,
    enrolledChildren: null,
    flagged: true,
    flagReason: "High violation count, inspection overdue"
  },
  {
    id: "370812349",
    name: "Bright Future Preschool",
    type: "Child Care Center",
    address: "7890 El Cajon Blvd, San Diego, CA 92115",
    capacity: 60,
    status: "Active",
    lastInspection: "2025-12-01",
    violations: 0,
    subsidyPayments: null,
    enrolledChildren: null,
    flagged: false
  }
];

// Data status for each county
const getCountyDataStatus = (countyName) => {
  if (countyName === "San Diego") {
    return {
      licensingData: true,
      subsidyData: false,
      lastUpdated: "2025-12-28",
      facilitiesCount: 2847,
      note: "Pilot county - subsidy CPRA request pending"
    };
  }
  return {
    licensingData: false,
    subsidyData: false,
    lastUpdated: null,
    facilitiesCount: null,
    note: "Data collection pending"
  };
};

function App() {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [facilitySearch, setFacilitySearch] = useState("");
  const [showFlagged, setShowFlagged] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Get current state data if a state is selected
  const stateData = selectedState ? getState(selectedState) : null;
  const currentCounties = stateData ? stateData.counties : CALIFORNIA_COUNTIES;

  const filteredCounties = useMemo(() => {
    return currentCounties.filter(county =>
      county.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, currentCounties]);

  const filteredFacilities = useMemo(() => {
    let facilities = SAMPLE_FACILITIES;
    if (facilitySearch) {
      facilities = facilities.filter(f =>
        f.name.toLowerCase().includes(facilitySearch.toLowerCase()) ||
        f.address.toLowerCase().includes(facilitySearch.toLowerCase())
      );
    }
    if (showFlagged) {
      facilities = facilities.filter(f => f.flagged);
    }
    return facilities;
  }, [facilitySearch, showFlagged]);

  // Use state-specific data status function, or fallback to California's
  const countyStatus = selectedCounty && stateData
    ? stateData.getDataStatus(selectedCounty.name)
    : selectedCounty
      ? getCountyDataStatus(selectedCounty.name)
      : null;

  // Summary stats
  const totalCapacity = SAMPLE_FACILITIES.reduce((sum, f) => sum + f.capacity, 0);
  const flaggedCount = SAMPLE_FACILITIES.filter(f => f.flagged).length;

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <Building2 size={28} />
            </div>
            <div className="logo-text">
              <h1>DaycareWatch</h1>
              <span className="tagline">National Childcare Subsidy Transparency</span>
            </div>
          </div>
          <nav className="nav">
            <a href="#about" className="nav-link">About</a>
            <a href="#methodology" className="nav-link">Methodology</a>
            <a href="https://github.com" className="nav-link" target="_blank" rel="noopener noreferrer">
              GitHub <ExternalLink size={14} />
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section - shown when no county is selected */}
      {!selectedCounty && (
        <section className="hero">
          <div className="hero-content">
            <h2>Where do childcare subsidies actually go?</h2>
            <p>
              An open-source investigation cross-referencing public licensing data
              with subsidy payments across multiple states.
            </p>
            {stateData ? (
              <div className="hero-stats">
                <div className="stat-card">
                  <span className="stat-number">{stateData.config.stats.totalCounties}</span>
                  <span className="stat-label">Counties</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">{stateData.config.stats.annualSubsidies}</span>
                  <span className="stat-label">Annual Subsidies</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">{stateData.config.stats.pilotCounty}</span>
                  <span className="stat-label">Pilot County</span>
                </div>
              </div>
            ) : (
              <div className="hero-stats">
                <div className="stat-card">
                  <span className="stat-number">2</span>
                  <span className="stat-label">States</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">145</span>
                  <span className="stat-label">Counties</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">$1.3B+</span>
                  <span className="stat-label">Annual Subsidies</span>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <main className="main">
        {/* State Selection View - shown when no state is selected */}
        {!selectedState ? (
          <StateSelector
            states={getAllStates()}
            onSelectState={setSelectedState}
          />
        ) : !selectedCounty ? (
          /* County Selection View - shown when state selected but no county */
          <section className="county-section">
            <button
              className="back-button"
              onClick={() => {
                setSelectedState(null);
                setSearchTerm('');
              }}
            >
              <ArrowLeft size={16} /> Back to States
            </button>

            <div className="section-header">
              <h3>Select a County in {stateData.config.name}</h3>
              <div className="search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search counties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="county-grid">
              {filteredCounties.map(county => {
                const status = stateData.getDataStatus(county.name);
                return (
                  <button
                    key={county.name}
                    className={`county-card ${status.licensingData ? 'has-data' : ''}`}
                    onClick={() => setSelectedCounty(county)}
                  >
                    <div className="county-name">{county.name}</div>
                    <div className="county-pop">Pop: {county.population.toLocaleString()}</div>
                    {status.licensingData ? (
                      <div className="county-status active">
                        <span className="status-dot"></span>
                        {status.facilitiesCount} facilities
                      </div>
                    ) : (
                      <div className="county-status pending">
                        Pending
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Project Status */}
            <div className="project-status">
              <h3>Project Status</h3>
              <div className="status-timeline">
                <div className="timeline-item completed">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <strong>Phase 1: Infrastructure</strong>
                    <p>App framework, data models, visualization components</p>
                  </div>
                </div>
                <div className="timeline-item in-progress">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <strong>Phase 2: San Diego Pilot</strong>
                    <p>Scraping CCLD data, filing CPRA requests for subsidy payments</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <strong>Phase 3: Statewide Expansion</strong>
                    <p>Roll out to remaining 57 counties</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <strong>Phase 4: Anomaly Detection</strong>
                    <p>Automated flagging of payment/capacity mismatches</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          /* County Detail View */
          <section className="county-detail">
            <button className="back-button" onClick={() => setSelectedCounty(null)}>
              <ArrowLeft size={16} /> Back to {stateData.config.name} Counties
            </button>

            <div className="county-header">
              <div className="county-title">
                <h2>{selectedCounty.name} County, {stateData.config.abbreviation}</h2>
                <span className="county-population">
                  Population: {selectedCounty.population.toLocaleString()}
                </span>
              </div>
              <div className="data-status">
                <div className={`status-badge ${countyStatus.licensingData ? 'active' : 'pending'}`}>
                  <span className="badge-dot"></span>
                  Licensing Data: {countyStatus.licensingData ? 'Available' : 'Pending'}
                </div>
                <div className={`status-badge ${countyStatus.subsidyData ? 'active' : 'pending'}`}>
                  <span className="badge-dot"></span>
                  Subsidy Data: {countyStatus.subsidyData ? 'Available' : `${stateData.config.publicRecordsLaw.shortName} Pending`}
                </div>
              </div>
            </div>

            {countyStatus.licensingData ? (
              <>
                {/* Stats Cards */}
                <div className="stats-grid">
                  <div className="stat-card-large">
                    <Building2 className="stat-icon" />
                    <div className="stat-info">
                      <span className="stat-value">{countyStatus.facilitiesCount}</span>
                      <span className="stat-title">Licensed Facilities</span>
                    </div>
                  </div>
                  <div className="stat-card-large">
                    <Users className="stat-icon" />
                    <div className="stat-info">
                      <span className="stat-value">{totalCapacity.toLocaleString()}</span>
                      <span className="stat-title">Sample Capacity</span>
                    </div>
                  </div>
                  <div className="stat-card-large">
                    <DollarSign className="stat-icon" />
                    <div className="stat-info">
                      <span className="stat-value awaiting">—</span>
                      <span className="stat-title">Total Subsidies (Awaiting CPRA)</span>
                    </div>
                  </div>
                  <div className="stat-card-large warning">
                    <AlertTriangle className="stat-icon" />
                    <div className="stat-info">
                      <span className="stat-value">{flaggedCount}</span>
                      <span className="stat-title">Flagged for Review</span>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="tabs">
                  <button
                    className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button
                    className={`tab ${activeTab === 'facilities' ? 'active' : ''}`}
                    onClick={() => setActiveTab('facilities')}
                  >
                    Facilities
                  </button>
                  <button
                    className={`tab ${activeTab === 'anomalies' ? 'active' : ''}`}
                    onClick={() => setActiveTab('anomalies')}
                  >
                    Anomalies
                  </button>
                </div>

                {activeTab === 'overview' && (
                  <div className="tab-content">
                    <div className="charts-grid">
                      <div className="chart-card">
                        <h4>Facility Types</h4>
                        <ResponsiveContainer width="100%" height={250}>
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Child Care Centers', value: 1245 },
                                { name: 'Large Family Care', value: 892 },
                                { name: 'Small Family Care', value: 710 }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={90}
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              <Cell fill="#1a365d" />
                              <Cell fill="#2c5282" />
                              <Cell fill="#4299e1" />
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="chart-card">
                        <h4>Violations by Type (Sample)</h4>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={[
                            { type: 'Safety', count: 45 },
                            { type: 'Staff Training', count: 32 },
                            { type: 'Documentation', count: 28 },
                            { type: 'Cleanliness', count: 19 },
                            { type: 'Equipment', count: 12 }
                          ]}>
                            <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#c53030" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="info-box">
                      <Info size={20} />
                      <div>
                        <strong>Data Note:</strong> Subsidy payment data requires a California Public Records Act (CPRA) 
                        request to the California Department of Social Services and San Diego County agencies. 
                        Request filed: Pending. Expected response: 10-30 days.
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'facilities' && (
                  <div className="tab-content">
                    <div className="facilities-header">
                      <div className="search-box">
                        <Search size={18} />
                        <input
                          type="text"
                          placeholder="Search facilities..."
                          value={facilitySearch}
                          onChange={(e) => setFacilitySearch(e.target.value)}
                        />
                      </div>
                      <label className="filter-checkbox">
                        <input
                          type="checkbox"
                          checked={showFlagged}
                          onChange={(e) => setShowFlagged(e.target.checked)}
                        />
                        Show flagged only
                      </label>
                    </div>

                    <div className="facilities-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Facility Name</th>
                            <th>Type</th>
                            <th>Capacity</th>
                            <th>Last Inspection</th>
                            <th>Violations</th>
                            <th>Subsidy $</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredFacilities.map(facility => (
                            <tr key={facility.id} className={facility.flagged ? 'flagged-row' : ''}>
                              <td>
                                <div className="facility-name">
                                  {facility.flagged && <AlertTriangle size={16} className="flag-icon" />}
                                  <div>
                                    <strong>{facility.name}</strong>
                                    <span className="facility-address">{facility.address}</span>
                                  </div>
                                </div>
                              </td>
                              <td>{facility.type}</td>
                              <td>{facility.capacity}</td>
                              <td>{facility.lastInspection}</td>
                              <td className={facility.violations > 3 ? 'high-violations' : ''}>
                                {facility.violations}
                              </td>
                              <td className="awaiting-data">Pending CPRA</td>
                              <td>
                                <span className={`status-pill ${facility.status.toLowerCase()}`}>
                                  {facility.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <p className="table-note">
                      Showing sample data. Full dataset of {countyStatus.facilitiesCount} facilities 
                      will be loaded from CCLD database.
                    </p>
                  </div>
                )}

                {activeTab === 'anomalies' && (
                  <div className="tab-content">
                    <div className="anomaly-section">
                      <h4>Anomaly Detection</h4>
                      <p>
                        This section will flag facilities with potential discrepancies between 
                        subsidy payments received and actual operational capacity/activity.
                      </p>

                      <div className="anomaly-criteria">
                        <h5>Detection Criteria (when subsidy data available):</h5>
                        <ul>
                          <li>High subsidy payments relative to licensed capacity</li>
                          <li>Payments received during periods of license suspension</li>
                          <li>Facilities with no recent inspections receiving payments</li>
                          <li>Significant payment increases without capacity changes</li>
                          <li>Multiple facilities at same address</li>
                        </ul>
                      </div>

                      <div className="current-flags">
                        <h5>Current Flags (Licensing Data Only):</h5>
                        {SAMPLE_FACILITIES.filter(f => f.flagged).map(facility => (
                          <div key={facility.id} className="flag-card">
                            <AlertTriangle className="flag-icon-large" />
                            <div>
                              <strong>{facility.name}</strong>
                              <p>{facility.flagReason}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="no-data-message">
                <Building2 size={48} />
                <h3>Data Collection Pending</h3>
                <p>
                  We're working on collecting licensing and subsidy data for {selectedCounty.name} County.
                  San Diego County is our pilot—help us expand by contributing to the project!
                </p>
                <a href="https://github.com" className="contribute-button" target="_blank" rel="noopener noreferrer">
                  Contribute on GitHub
                </a>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>DaycareWatch</h4>
            <p>
              An open-source project bringing transparency to childcare
              subsidy systems through public records.
            </p>
          </div>
          <div className="footer-section">
            <h4>Data Sources</h4>
            <ul>
              <li><a href="https://www.ccld.dss.ca.gov/carefacilitysearch/" target="_blank" rel="noopener noreferrer">CA Community Care Licensing</a></li>
              <li><a href="https://www.cdss.ca.gov/" target="_blank" rel="noopener noreferrer">CA Dept of Social Services</a></li>
              <li><a href="https://www.cde.ca.gov/sp/cd/" target="_blank" rel="noopener noreferrer">CA Dept of Education</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Get Involved</h4>
            <ul>
              <li><a href="#">Submit a Tip</a></li>
              <li><a href="#">File a CPRA Request</a></li>
              <li><a href="#">Contribute Code</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Built with public records. Open source. No affiliation with any government agency.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
