// Demonstration-only roster. Replace these entries with approved, real executive details before launch.
// Every executive position is intended to map to the existing "editor" access role once identity matching is configured.
const mockExecutive = (number, title, vision) => ({
  id: `mock-executive-${String(number).padStart(2, '0')}`,
  name: `Mock Executive Member ${String(number).padStart(2, '0')}`,
  title,
  matricNumber: `MOCK-2026-${String(number).padStart(4, '0')}`,
  avatar: `https://api.dicebear.com/9.x/initials/svg?seed=FOSSA%20Executive%20${number}`,
  vision,
  about: 'Demonstration profile only. This is placeholder data and does not represent an appointed FOSSA officer.',
  socials: [],
  email: `executive${number}@example.invalid`,
  accessRole: 'editor',
  isMock: true
});

export const executivesData = [
  mockExecutive(1, 'President', 'Represent students, lead the executive team, and support a welcoming faculty community.'),
  mockExecutive(2, 'Vice President', 'Support the president and coordinate executive responsibilities.'),
  mockExecutive(3, 'General Secretary', 'Maintain meeting records, correspondence, and official documentation.'),
  mockExecutive(4, 'Assistant General Secretary', 'Support records, communication, and administrative coordination.'),
  mockExecutive(5, 'Financial Secretary', 'Maintain transparent records of funds received and financial activity.'),
  mockExecutive(6, 'Treasurer', 'Support responsible budgeting and stewardship of association funds.'),
  mockExecutive(7, 'Public Relations Officer', 'Share verified announcements and communicate FOSSA activities.'),
  mockExecutive(8, 'Welfare Director', 'Help coordinate student welfare support and feedback.'),
  mockExecutive(9, 'Social Director', 'Coordinate student engagement and faculty social activities.')
];
