import { faker } from '@faker-js/faker';

// =====================================================
// US STATE CODES
// =====================================================

export const EStateCodeIso2 = {
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  DistrictOfColumbia: 'DC',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  NewHampshire: 'NH',
  NewJersey: 'NJ',
  NewMexico: 'NM',
  NewYork: 'NY',
  NorthCarolina: 'NC',
  NorthDakota: 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  RhodeIsland: 'RI',
  SouthCarolina: 'SC',
  SouthDakota: 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  WestVirginia: 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
};


// =====================================================
// STATE → AUTOMATION ZIP CODES
// =====================================================

const stateZipCodes = {
  AL: ['35203', '36104'],
  AK: ['99501', '99701'],
  AZ: ['85001', '86001'],
  AR: ['72201', '72701'],
  CA: ['90001', '94102'],
  CO: ['80202', '80901'],
  CT: ['06101', '06510'],
  DE: ['19801', '19901'],
  DC: ['20001'],
  FL: ['33101', '32801'],
  GA: ['30301', '30901'],
  HI: ['96801'],
  ID: ['83701', '83301'],
  IL: ['60601', '62701'],
  IN: ['46201', '46801'],
  IA: ['50301', '52240'],
  KS: ['66101', '67201'],
  KY: ['40201', '40501'],
  LA: ['70112', '70801'],
  ME: ['04101', '04401'],
  MD: ['21201', '21401'],
  MA: ['02108', '02201'],
  MI: ['48201', '48901'],
  MN: ['55401', '55101'],
  MS: ['39201', '39501'],
  MO: ['63101', '64101'],
  MT: ['59101', '59601'],
  NE: ['68101', '68501'],
  NV: ['89101', '89501'],
  NH: ['03101', '03301'],
  NJ: ['07101', '08601'],
  NM: ['87101', '87501'],
  NY: ['10001', '12201'],
  NC: ['27601', '28201'],
  ND: ['58102', '58501'],
  OH: ['43201', '44101'],
  OK: ['73101', '74101'],
  OR: ['97201', '97301'],
  PA: ['19101', '15201'],
  RI: ['02901'],
  SC: ['29201', '29401'],
  SD: ['57101', '57501'],
  TN: ['37201', '38101'],
  TX: ['75201', '77001'],
  UT: ['84101', '84601'],
  VT: ['05401', '05601'],
  VA: ['23219', '22201'],
  WA: ['98101', '99201'],
  WV: ['25301', '25701'],
  WI: ['53201', '53701'],
  WY: ['82001', '83001'],
};


// =====================================================
// INDUSTRIES
// =====================================================

export const industries = [
  'Agriculture, Forestry, Fishing and Hunting',
  'Mining, Quarrying, and Oil and Gas Extraction',
  'Utilities',
  'Construction',
  'Manufacturing',
  'Wholesale Trade',
  'Retail Trade',
  'Transportation and Warehousing',
  'Information',
  'Finance and Insurance',
  'Real Estate and Rental and Leasing',
  'Professional, Scientific, and Technical Services',
  'Management of Companies and Enterprises',
  'Administrative and Support and Waste Management and Remediation Services',
  'Educational Services',
  'Health Care and Social Assistance',
  'Arts, Entertainment, and Recreation',
  'Accommodation and Food Services',
  'Other Services (except Public Administration)',
  'Public Administration',
];


// =====================================================
// RANDOM STATE
// =====================================================

export const generateRandomState = () => {
  return faker.helpers.arrayElement(
    Object.values(EStateCodeIso2)
  );
};


// =====================================================
// ZIP CODE BASED ON STATE
// =====================================================

export const generateZipCodeForState = (stateCode) => {

  const zipCodes = stateZipCodes[stateCode];

  if (!zipCodes) {
    throw new Error(
      `No ZIP code configured for state: ${stateCode}`
    );
  }

  return faker.helpers.arrayElement(zipCodes);
};


// =====================================================
// RANDOM INDUSTRY
// =====================================================

export const generateRandomIndustry = () => {
  return faker.helpers.arrayElement(industries);
};


// =====================================================
// OTHER RANDOM DATA
// =====================================================

export const generateRandomOrgName = () => {
  return `${faker.company.name()} ${faker.string.alphanumeric(5)}`;
};


export const generateRandomWebsite = () => {
  return `https://${faker.internet.domainName()}`;
};


export const generateRandomTaxId = () => {
  return faker.string.numeric(9);
};


export const generateRandomAddress = () => {
  return faker.location.streetAddress();
};


export const generateRandomCity = () => {
  return faker.location.city();
};


export const generateRandomEmail = () => {
  return faker.internet.email();
};