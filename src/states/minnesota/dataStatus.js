/**
 * Data status for Minnesota counties
 */

// Counties with available data
const COUNTIES_WITH_DATA = {
  // Hennepin is the pilot county
  // 'Hennepin': {
  //   licensingData: true,
  //   subsidyData: false,
  //   lastUpdated: '2026-01-01',
  //   facilitiesCount: null,
  //   note: 'Pilot county - MGDPA request pending'
  // }
};

/**
 * Get data status for a Minnesota county
 * @param {string} countyName - Name of the county
 * @returns {Object} Data status object
 */
export const getMinnesotaDataStatus = (countyName) => {
  if (COUNTIES_WITH_DATA[countyName]) {
    return COUNTIES_WITH_DATA[countyName];
  }

  // Hennepin is pilot - show as "in progress"
  if (countyName === 'Hennepin') {
    return {
      licensingData: false,
      subsidyData: false,
      lastUpdated: null,
      facilitiesCount: null,
      note: 'Pilot county - data collection in progress'
    };
  }

  return {
    licensingData: false,
    subsidyData: false,
    lastUpdated: null,
    facilitiesCount: null,
    note: 'Data collection pending'
  };
};

export default getMinnesotaDataStatus;
