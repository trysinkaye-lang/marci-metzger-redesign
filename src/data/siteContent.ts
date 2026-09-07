// Preserve original homepage wording; see docs/content-inventory.md before editing.
export const siteContent = {
  brand: 'Marci Metzger - The Ridge Realty Group',
  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'Listings', href: '#property-search' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: { title: 'Pahrump Realtor', action: 'Call Now', eyebrow: 'Pahrump, Nevada' },
  about: { title: 'Marci Metzger', subtitle: 'Realtor for Nearly 3 Decades' },
  performance: {
    title: 'Get It Sold', subtitle: 'Top Residential Sales Last 5 Years',
    result: 'We helped nearly 90 clients in 2021, and closed 28.5 million in sales!',
    description: 'Our team works hard everyday to grow and learn, so that we may continue to excel in our market. Our clients deserve our best, & we want to make sure our best is better every year.',
  },
  seller: { title: "Don't Just List it...", description: 'Get it SOLD! We exhaust every avenue to ensure our listings are at the fingertips of every possible buyer, getting you top dollar for your home.' },
  buyer: { title: 'Guide to Buyers', description: 'Nobody knows the market like we do. Enjoy having a pro at your service. Market analysis, upgrades lists, contractors on speed dial, & more!' },
  search: {
    title: 'Find Your Dream Home', subtitle: 'Search Listings', action: 'Search Now',
    unavailable: 'Search preview only. Live search is available on the original listing site; these preview fields are not submitted.',
    sourceHref: 'https://marcimetzger.com/listings',
    sortOptions: [
      { value: 'newest', label: 'Newest' }, { value: 'oldest', label: 'Oldest' },
      { value: 'pra', label: 'Least Expensive to Most' }, { value: 'prd', label: 'Most Expensive to Least' },
      { value: 'bda', label: 'Bedrooms (Low to High)' }, { value: 'bdd', label: 'Bedrooms (High to Low)' },
      { value: 'tba', label: 'Bathrooms (Low to High)' }, { value: 'tbd', label: 'Bathrooms (High to Low)' },
    ],
  },
  gallery: { title: 'Photo Gallery' },
  services: {
    title: 'Our Services',
    items: [
      { id: 'real-estate', title: 'Real Estate Done Right', description: "Nervous about your property adventure? Don’t be. Whether you're getting ready to buy or sell your residence, looking at investment properties, or just curious about the markets, our team ensures you get the best experience possible!", image: '/images/real-estate-service.jpg' },
      { id: 'commercial-residential', title: 'Commercial & Residential', description: "Large or small, condo or mansion, we can find it and get at the price that's right. Fixer-uppers? Luxury? We can help with all of it! We live, work, and play in this community. Happy to help you find where to put you hard-earned dollars.", image: '/images/commercial-residential.jpg' },
      { id: 'expertise', title: 'Rely on Expertise', description: 'If you have questions about affordability, credit, and loan options, trust us to connect you with the right people to get the answers you need in a timely fashion. We make sure you feel confident and educated every step of the way.', image: '/images/expertise.jpg' },
    ],
  },
  affiliations: [
    { image: '/images/ridge-logo.png', label: 'The Ridge Realty Group' }, { image: '/images/equal-housing-logo.png', label: 'Equal Housing Opportunity' },
    { image: '/images/realtor-logo.jpg', label: 'Realtor' }, { image: '/images/chamber-logo.jpg', label: 'Pahrump Valley Chamber of Commerce' },
  ],
  contact: {
    title: 'Call or Visit', formTitle: 'Send Message', brand: 'Marci Metzger - THE RIDGE REALTY GROUP',
    address: ['3190 HW-160, Suite F,', 'Pahrump, Nevada 89048,', 'United States'],
    phone: '(206) 919-6886', phoneHref: 'tel:+12069196886', hoursTitle: 'Office Hours', days: 'Open daily', hours: '8:00 am - 7:00 pm',
    appointments: 'Appointments outside office hours available upon request. Just call!', directionsLabel: 'Get directions',
    directionsHref: 'https://www.google.com/maps/dir/?api=1&destination=3190%20HW-160%2C%20Suite%20F%2C%20Pahrump%2C%20Nevada%2089048',
    unavailable: 'This form is a preview. Online messaging is not connected; please call Marci to get in touch.',
  },
  socialLinks: [
    { label: 'Facebook', href: 'https://www.facebook.com/MarciHomes/' }, { label: 'Instagram', href: 'https://www.instagram.com/marcimetzger_theridge/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/marci-metzger-30642496/' }, { label: 'Yelp', href: 'https://www.yelp.com/biz/xr3yQN_m2SgO0R_7S6p62w' },
  ],
  footer: { copyright: 'Copyright © 2026 Marci METZGER - All Rights Reserved' },
} as const
