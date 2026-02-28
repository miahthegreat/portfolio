/**
 * Resume content — single source for the /resume page and print/PDF.
 */

export interface ResumeContact {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedIn: string;
}

export interface ResumeSkill {
  name: string;
  /** 0–100 for bar display */
  level: number;
}

export interface ResumeLink {
  label: string;
  href: string;
}

export interface ResumeJob {
  title: string;
  company: string;
  location?: string;
  dates: string;
  bullets?: string[];
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  location: string;
}

export interface ResumeData {
  contact: ResumeContact;
  summary: string;
  skills: ResumeSkill[];
  links: ResumeLink[];
  experience: ResumeJob[];
  education: ResumeEducation;
}

export const resumeData: ResumeData = {
  contact: {
    name: "Jeremiah Schmid",
    title: "Strategic Business Planning Manager",
    location: "Stamford, CT, USA, 06902",
    email: "jjschmid85@gmail.com",
    phone: "716 445 6283",
    linkedIn: "https://linkedin.com/in/jeremiah-schmid",
  },
  summary:
    "Strategic Business Planning Manager & Analyst with 3+ years of experience delivering automated reporting and actionable insights using SQL, Tableau, SSRS, and Python. Leverages deep expertise in report development, scenario modeling, and KPI-driven dashboards to improve forecasting consistency, reduce data retrieval times, and enhance operational decision-making. Strong leader and collaborator who mentors peers, bridges technical and non-technical teams, and drives process improvements to support strategic planning and execution.",
  skills: [
    { name: "SQL", level: 85 },
    { name: "SSRS", level: 85 },
    { name: "Python", level: 72 },
    { name: "Tableau", level: 85 },
    { name: "TypeScript", level: 78 },
    { name: "JavaScript", level: 80 },
    { name: "React", level: 76 },
    { name: "Next.js", level: 74 },
    { name: "HTML / CSS", level: 82 },
    { name: "Tailwind CSS", level: 75 },
    { name: "Node.js", level: 74 },
    { name: "REST APIs", level: 78 },
    { name: "Prisma / ORM", level: 70 },
    { name: "Git", level: 82 },
    { name: "Microsoft Office Suite", level: 80 },
    { name: "Project Management", level: 72 },
    { name: "Time Management", level: 70 },
    { name: "Report Development", level: 85 },
    { name: "Data Analysis", level: 80 },
    { name: "Team Leadership", level: 72 },
    { name: "Business Strategy", level: 70 },
  ],
  links: [
    { label: "My Portfolio", href: "/" },
    { label: "LinkedIn", href: "https://linkedin.com/in/jeremiah-schmid" },
  ],
  experience: [
    {
      title: "Strategic Business Planning Manager",
      company: "Charter Communications",
      location: "Stamford",
      dates: "Mar 2025 - Present",
      bullets: [
        "Spearhead cross-functional scenario modeling to test strategic options, enabling leadership to select resilient plans and reduce execution uncertainty.",
        "Analyzed internal performance gaps and redesigned planning workflows, producing measurable improvements in forecasting consistency and decision clarity.",
        "Implemented standardized KPI dashboards to surface risks and progress, improving transparency and supporting timely corrective actions.",
        "Mentored peers on scenario analysis and communication techniques, strengthening team capability and ensuring consistent execution during peak cycles.",
      ],
    },
    {
      title: "Sr. Data Analyst",
      company: "Charter Communications",
      location: "Stamford, CT",
      dates: "Dec 2023 - Mar 2025",
      bullets: [
        "Analyzed large datasets to uncover actionable insights, driving data-informed decisions that enhanced operational efficiency.",
        "Streamlined reporting processes, reducing data retrieval times significantly and improving stakeholder access to critical metrics.",
        "Maintained comprehensive documentation of data processes to ensure compliance and facilitate knowledge transfer across teams.",
        "Fostered effective communication between technical and non-technical teams, ensuring alignment on project goals and enhancing overall productivity.",
        "Conducted in-depth analyses of complex datasets, delivering actionable insights that drove strategic initiatives and improved operational efficiency.",
      ],
    },
    {
      title: "Data Analyst",
      company: "Charter Communications",
      location: "Stamford, CT",
      dates: "Oct 2022 - Dec 2023",
      bullets: [
        "Analyzed data discrepancies in reporting processes, implementing solutions that enhanced accuracy and reliability for stakeholders.",
        "Streamlined SQL report generation, resulting in substantial improvements in data retrieval speed and enhanced decision-making capabilities.",
        "Developed automated reporting systems using SSRS, Tableau, & Python, reducing manual effort and increasing efficiency across multiple departments.",
        "Fostered collaboration with cross-functional teams to address reporting issues, leading to noticeable gains in user satisfaction and data clarity.",
        "Maintained a proactive approach to project management, ensuring timely delivery of reports and aligning team efforts towards common goals.",
      ],
    },
    {
      title: "Supervisor, Community Solutions",
      company: "Charter Communications",
      location: "Buffalo, NY",
      dates: "Dec 2021 - Oct 2022",
    },
    {
      title: "Managed Wi-Fi Lead, Community Solutions",
      company: "Charter Communications",
      location: "Buffalo, NY",
      dates: "Mar 2021 - Dec 2021",
    },
    {
      title: "Repair Lead, Community Solutions",
      company: "Charter Communications",
      location: "Buffalo, NY",
      dates: "Nov 2020 - Mar 2021",
    },
    {
      title: "Managed WiFi Representative",
      company: "Charter Communications",
      location: "Buffalo, NY",
      dates: "Mar 2020 - Nov 2020",
    },
    {
      title: "SMB Customer Service Representative",
      company: "Charter Communications",
      location: "Buffalo, NY",
      dates: "Feb 2019 - Mar 2020",
    },
    {
      title: "Social Media Lead",
      company: "Charter Communications",
      location: "Buffalo, NY",
      dates: "Jan 2017 - Aug 2018",
    },
    {
      title: "Social Media Representative",
      company: "Time Warner Cable",
      location: "Buffalo, NY",
      dates: "2015 - 2016",
    },
    {
      title: "Residential Tier 3 Technical Support",
      company: "Time Warner Cable",
      dates: "2013 - 2014",
    },
    {
      title: "SMB Chat Support Representative",
      company: "Time Warner Cable",
      dates: "2011 - 2012",
    },
    {
      title: "Residential National Help Desk Representative",
      company: "Time Warner Cable",
      dates: "2006 - 2010",
    },
  ],
  education: {
    degree: "High School Diploma, Computer Science",
    institution: "Hutchinson Central Technical High School",
    location: "Buffalo, NY",
  },
};
