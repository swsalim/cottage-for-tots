export const areaList = {
  north: { name: 'North' },
  east: { name: 'East' },
  west: { name: 'West' },
  central: { name: 'Central' },
  'north-east': { name: 'North-East' },
};

export const townList = {
  'ang-mo-kio': { name: 'Ang Mo Kio' },
  bedok: { name: 'Bedok' },
  bishan: { name: 'Bishan' },
  'bukit-batok': { name: 'Bukit Batok' },
  'bukit-merah': { name: 'Bukit Merah' },
  'bukit-panjang': { name: 'Bukit Panjang' },
  'bukit-timah': { name: 'Bukit Timah' },
  'central-town': { name: 'Central' },
  'choa-chu-kang': { name: 'Choa Chu Kang' },
  clementi: { name: 'Clementi' },
  geylang: { name: 'Geylang' },
  hougang: { name: 'Hougang' },
  'jurong-east': { name: 'Jurong East' },
  'jurong-west': { name: 'Jurong West' },
  'kallang-whampoa': { name: 'Kallang / Whampoa' },
  'marine-parade': { name: 'Marine Parade' },
  'pasir-ris': { name: 'Pasir Ris' },
  punggol: { name: 'Punggol' },
  queenstown: { name: 'Queenstown' },
  sembawang: { name: 'Sembawang' },
  sengkang: { name: 'Sengkang' },
  serangoon: { name: 'Serangoon' },
  tampines: { name: 'Tampines' },
  tengah: { name: 'Tengah' },
  'toa-payoh': { name: 'Toa Payoh' },
  woodlands: { name: 'Woodlands' },
  yishun: { name: 'Yishun' },
};

export const townListArr = [
  { name: 'Ang Mo Kio' },
  { name: 'Bedok' },
  { name: 'Bishan' },
  { name: 'Bukit Batok' },
  { name: 'Bukit Merah' },
  { name: 'Bukit Panjang' },
  { name: 'Bukit Timah' },
  { name: 'Central' },
  { name: 'Choa Chu Kang' },
  { name: 'Clementi' },
  { name: 'Geylang' },
  { name: 'Hougang' },
  { name: 'Jurong East' },
  { name: 'Jurong West' },
  { name: 'Kallang / Whampoa' },
  { name: 'Marine Parade' },
  { name: 'Pasir Ris' },
  { name: 'Punggol' },
  { name: 'Queenstown' },
  { name: 'Sembawang' },
  { name: 'Sengkang' },
  { name: 'Serangoon' },
  { name: 'Tampines' },
  { name: 'Tengah' },
  { name: 'Toa Payoh' },
  { name: 'Woodlands' },
  { name: 'Yishun' },
];

export const categoryList = {
  '24-hour-clinic': {
    name: '24-Hour Clinic',
    slug: '24-hour-clinic',
    short_label: '24-hr',
    is_active: true,
  },
  'general-practitioner': {
    name: 'General Practitioner',
    slug: 'general-practitioner',
    short_label: 'gp',
    is_active: true,
  },
  'accident-and-emergency': {
    name: 'Accident & Emergency',
    slug: 'accident-and-emergency',
    short_label: 'a&e',
    is_active: true,
  },
  hospital: {
    name: 'Hospitals',
    slug: 'hospital',
    short_label: 'hospital',
    is_active: true,
  },
  paediatric: {
    name: 'Paediatric',
    slug: 'paediatric',
    short_label: 'paediatric',
    is_active: true,
  },
  aesthetic: {
    name: 'Aesthetic',
    slug: 'aesthetic',
    short_label: 'aesthetic',
    is_active: false,
  },
  dental: {
    name: 'Dental',
    slug: 'dental',
    short_label: 'dental',
    is_active: true,
  },
  'womens-health-clinic': {
    name: "Women's Health Clinic",
    slug: 'womens-health-clinic',
    short_label: "women's",
    is_active: false,
  },
  'chinese-physician': {
    name: 'chinese-physician',
    slug: 'chinese-physician',
    short_label: 'tcm',
    is_active: false,
  },
};

export const navSpecialities = {
  title: 'Health Professionals',
  items: [
    {
      name: 'General Practitioners',
      href: '/physician/general-practitioner',
    },
    {
      name: 'Paediatrics',
      href: '/physician/paediatric',
    },
    {
      name: 'Dentists',
      href: '/physician/dentist',
    },
    {
      name: 'View All Proffessionals',
      href: '/physician',
    },
  ],
};

export const navCategories = {
  title: 'Health Providers',
  items: [
    {
      name: '24-Hour Clinic',
      href: '/24-hour-clinic',
    },
    {
      name: 'Accident & Emergency',
      href: '/accident-and-emergency',
    },
    {
      name: 'General Practitioner',
      href: '/general-practitioner',
    },
    {
      name: 'Paediatric',
      href: '/paediatric',
    },
    {
      name: 'Hospital',
      href: '/hospital',
    },
    {
      name: 'Dental',
      href: '/dental',
    },
    {
      name: 'View All Providers',
      href: '/browse',
    },
  ],
};

export const validAreas = Object.keys(areaList);
export const validTowns = Object.keys(townList);
export const validCategories = Object.keys(categoryList);
