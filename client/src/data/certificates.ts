import { Certificate } from '../types';

export const technicalCertificates: Certificate[] = [
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
  },
  {
    id: 5,
    title: "Python For Beginner",
    issuer: "Rai School Of Engineering ",
    date: "Acedemic year 2023-24 ",
    image_url: "https://res.cloudinary.com/dybzmpwaq/image/upload/v1772098317/PYTHON_FOR_BEGINNER_yfxddm.jpg"
  },
  {
    id: 6,
    title: "Engineer's Day Poster Presentation",
    issuer: "Rai School of Engineering",
    date: "15th September 2023",
    image_url: "https://res.cloudinary.com/dybzmpwaq/image/upload/v1772098316/ENGINEERS_DAY_qust2r.jpg"
  }
];

export const otherCertificates: Certificate[] = [
   {
    id: 7,
    title: "Gujarat Youth Parliament",
    issuer: "Swami Vivekanand Gujarat Rajya Yuva Board",
    date: "9th March 2024",
    image_url: "https://res.cloudinary.com/dybzmpwaq/image/upload/v1772098321/YP_STATE_LEVEL_l0fz6a.jpg"
  },
  {
    id: 8,
    title: "Science Day ",
    issuer: "Rai School of Sciences",
    date: "28th Febryary 2024",
    image_url: "https://res.cloudinary.com/dybzmpwaq/image/upload/v1772098318/SCIENCE_DAY_yj98mv.jpg"
  },
  {
    id: 9,
    title: "Techwar - Debate Competition ",
    issuer: "Rai School of Engineering ",
    date: "28th September 2024",
    image_url: "https://res.cloudinary.com/dybzmpwaq/image/upload/v1772098225/TECHWAR_DEBATE_e9wzxl.jpg"
  },
  {
    id: 10,
    title: "Youth Parliament Rai University",
    issuer: "IQAC,Rai University Ahmedabad",
    date: "12th August 2024",
    image_url: "https://res.cloudinary.com/dybzmpwaq/image/upload/v1772098319/YP_RAI_mev5ck.jpg"
  },
  {
    id: 11,
    title: "TechWar -Letter of Appreciation",
    issuer: "Rai School of Engineering ",
    date: "28th September 2024",
    image_url: "https://res.cloudinary.com/dybzmpwaq/image/upload/v1772098320/TECHWAR_LOA_vobv6f.jpg"
  },
  {
    id: 12,
    title: "International Day ,Rai University -LOA",
    issuer: "IQAC,Rai University Ahmedabad",
    date: "12th August 2024",
    image_url: "https://res.cloudinary.com/dybzmpwaq/image/upload/v1772098317/LOA_YP_RAI_ayh5kn.jpg"
  },
  {
    id: 13,
    title: "Run Bhoomi , Rai University - LOA",
    issuer: "Warrior Club,Rai University Ahmedabad",
    date: " 1st December ,2023",
    image_url: "https://res.cloudinary.com/dybzmpwaq/image/upload/v1772098316/LOA_RUN_BHOOMI_o34sp0.jpg"
  },
  {
    id: 14,
    title: "RSE Digilat NewsLetter",
    issuer: "Rai School of Engineering ",
    date: " Acedemic Year 2024-2025",
    image_url: "https://res.cloudinary.com/dybzmpwaq/image/upload/v1772098317/RSE_DIGITAL_NEWSLETTER_ysdxov.jpg"
  }
];

export const certificates: Certificate[] = [...technicalCertificates, ...otherCertificates];

export default certificates;
