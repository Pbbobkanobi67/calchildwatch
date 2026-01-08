/**
 * Minnesota state configuration for DaycareWatch
 */
const minnesotaConfig = {
  id: 'minnesota',
  name: 'Minnesota',
  abbreviation: 'MN',

  // Branding
  tagline: 'Minnesota Childcare Transparency',
  color: '#003865', // Minnesota blue

  // Data sources
  dataSources: {
    licensing: {
      name: 'DHS Licensing Information Lookup',
      url: 'https://licensinglookup.dhs.state.mn.us/',
      agency: 'Minnesota Department of Human Services',
      description: 'Licensed provider data from Minnesota DHS'
    },
    subsidies: {
      name: 'Child Care Assistance Program (CCAP)',
      agencies: ['DHS'],
      description: 'CCAP payment records (requires MGDPA request)'
    }
  },

  // Public records law
  publicRecordsLaw: {
    name: 'Minnesota Government Data Practices Act (MGDPA)',
    shortName: 'MGDPA',
    statute: 'Minnesota Statutes Chapter 13',
    responseDeadline: '10 business days',
    templatePath: '/docs/MGDPA_TEMPLATES.md'
  },

  // Stats for display
  stats: {
    totalCounties: 87,
    annualSubsidies: '$300M+',
    pilotCounty: 'Hennepin'
  },

  // Footer links
  footerLinks: [
    {
      name: 'MN DHS Licensing',
      url: 'https://mn.gov/dhs/general-public/licensing/'
    },
    {
      name: 'MN Dept of Human Services',
      url: 'https://mn.gov/dhs/'
    },
    {
      name: 'MN DCYF',
      url: 'https://dcyf.mn.gov/'
    }
  ]
};

export default minnesotaConfig;
