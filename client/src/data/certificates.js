// Static certificates data for the portfolio
// No backend required - data is stored statically

export const technicalCertificates = [
  {
    id: 1,
    title: "NEW INDIA VIBRANT HACKATHON-2023",
    issuer: "SSIP GUJARAT",
    date: "4th November 2023",
    image_url: "https://res.cloudinary.com/dybzmpwaq/image/upload/v1772098318/SSIP_HACKATHON_pitmbe.jpg"
  },
  {
    id: 2,
    title: "3-days Long National Level Hackathon ",
    issuer: "Gateway Education And ImaginXP collegeDekho",
    date: "25th April 2025",
    image_url: "https://res.cloudinary.com/dybzmpwaq/image/upload/v1772098317/Gateway_hackathon_dkbgns.jpg"
  },
  {
    id: 3,
    title: "TechHack State Level Hackathon",
    issuer: "Rai University Ahmedabad",
    date: "9th October 2025",
    image_url: "https://res.cloudinary.com/dybzmpwaq/image/upload/v1772098317/RAI_HACKATHON_sc8jmx.jpg"
  },
  {
    id: 4,
    title: "Data Analysis With Power BI",
    issuer: "Rai School Of Engineering ",
    date: "Acedemic year 2024-25 Even Semester",
    image_url: "https://res.cloudinary.com/dybzmpwaq/image/upload/v1772098316/PowerBI_z4f1rc.jpg"
  }
];

export const otherCertificates = [
  {
    id: 5,
    title: "MongoDB Fundamentals",
    issuer: "MongoDB University",
    date: "September 2023",
    image_url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800"
  },
  {
    id: 6,
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "August 2023",
    image_url: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800"
  }
];

// Keep backward compatibility
export const certificates = [...technicalCertificates, ...otherCertificates];

export default certificates;
