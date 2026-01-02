# CalChildWatch

**California Childcare Transparency Project**

An open-source investigation cross-referencing public childcare licensing data with subsidy payments across all 58 California counties.

🔍 Inspired by Nick Shirley's Minnesota daycare investigation

## Live Demo

Coming soon: `calchildwatch.vercel.app`

## Features

- **County-by-county drill-down** - View licensing data for each of California's 58 counties
- **Facility database** - Licensed childcare centers and family care homes from CCLD
- **Anomaly detection** - Flag facilities with discrepancies between payments and capacity
- **Public data only** - All information sourced from public records

## Data Sources

1. **California Community Care Licensing (CCLD)**
   - https://www.ccld.dss.ca.gov/carefacilitysearch/
   - Licensed facility names, addresses, capacity, inspection history, violations

2. **Subsidy Payment Data** (via CPRA requests)
   - California Department of Social Services (CDSS)
   - California Department of Education (CDE)
   - County Alternative Payment Programs

## Project Roadmap

- [x] Phase 1: App infrastructure and visualization components
- [ ] Phase 2: San Diego County pilot (licensing data + CPRA requests)
- [ ] Phase 3: Statewide expansion
- [ ] Phase 4: Automated anomaly detection

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/calchildwatch.git
cd calchildwatch

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Deployment to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Deploy (automatic builds on push)

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Filing CPRA Requests

To obtain subsidy payment data, file California Public Records Act requests with:

### State Level
- **California Department of Social Services**
  - Email: publicrecords@dss.ca.gov
  - Request: CalWORKs childcare payment data by provider

- **California Department of Education**
  - Email: pra@cde.ca.gov
  - Request: State Preschool Program and CCTR payment data by contractor

### San Diego County
- **YMCA Childcare Resource Service**: 619-521-3055
- **Child Development Associates**: 619-427-4411

### Sample CPRA Request Language

```
Dear [Agency Name]:

Pursuant to the California Public Records Act (Government Code §7920.000 et seq.), 
I request access to inspect and obtain copies of the following records:

1. Payment amounts disbursed to each licensed childcare provider participating in 
   [PROGRAM NAME] for fiscal years 2022-2023, 2023-2024, and 2024-2025.

2. The facility license number, name, and address associated with each payment.

3. Any enrollment or attendance data submitted by providers to justify payments.

Please provide records in electronic format (CSV, Excel, or database export preferred).

If any records are exempt from disclosure, please identify the specific exemption 
and provide all non-exempt portions.

Thank you,
[Your Name]
```

## Contributing

We need help with:

- **Data collection**: Filing CPRA requests for your county
- **Development**: React, data visualization, backend
- **Journalism**: Investigating flagged anomalies
- **Legal**: Understanding public records exemptions

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Tech Stack

- React 18
- Recharts (data visualization)
- Lucide React (icons)
- CSS (custom, no framework)

## License

MIT License - See [LICENSE](LICENSE)

## Disclaimer

This project is an independent civic transparency effort. It is not affiliated with, endorsed by, or connected to any government agency. All data is obtained from public records. Anomaly flags are for investigative purposes only and do not constitute accusations of wrongdoing.

## Contact

- GitHub Issues for bugs/features
- Twitter/X: Tag @nickshirley with findings

---

*"Sunlight is said to be the best of disinfectants."* — Louis Brandeis
