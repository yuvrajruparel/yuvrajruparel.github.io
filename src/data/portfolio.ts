// All editable site text lives here: projects, experience, awards, skills, documents.

/** Build a URL for a file in the public folder (public/docs, public/photos, public/logos). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const profile = {
  name: "Yuvraj Ruparel",
  bioLines: ["Mechanical Engineering", "Undergraduate", "Duke University", "Durham, NC"],
  headshot: "photos/headshot.png",
};

/** About Me paragraphs. A part with `viewKey` becomes a link to the in-site viewer. */
export type TextPart = { text: string; viewKey?: string };

export const about: TextPart[][] = [
  [
    {
      text: "I'm Yuvraj Ruparel, a sophomore studying Mechanical Engineering at Duke University. I grew up in Mumbai, India, and I've always believed engineering should solve real problems people face, not just problems in textbooks.",
    },
  ],
  [
    {
      text: "I'm most interested in robotics and mechatronics, where mechanical design, electronics and software have to work together. I like building hardware that actually runs: designing the parts, wiring the electronics and writing the code that controls them. I am working on a few robotics and mechatronics related personal projects outside of classes.",
    },
  ],
  [
    {
      text: "Outside engineering, I play cricket, table tennis and basketball, I swim, and I like watching movies and listening to music.",
    },
  ],
  [
    {
      text: "I'm a WCA (World Cube Association) certified speedcuber and can solve every listed WCA event, from 2x2x2 to 7x7x7 plus the Pyraminx, Megaminx, Square-1, Skewb and Clock. I've also solved a Gigaminx (5x5 Megaminx) and a ",
    },
    { text: "17x17x17", viewKey: "cube-17x17x17" },
    { text: " online (about 9,000 moves, since buying one costs too much). I wrote a " },
    { text: "cubing guide", viewKey: "cubing-guide" },
    { text: " (click to view) with the simplest method I know for each puzzle." },
  ],
];

export type ContactItem = {
  icon: "mail" | "linkedin" | "file" | "github";
  label: string;
  href?: string;
  viewKey?: string;
};

// Shown in one row, left to right: email first.
export const contacts: ContactItem[] = [
  { icon: "mail", label: "yuvraj.ruparel@duke.edu", href: "mailto:yuvraj.ruparel@duke.edu" },
  { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/yuvraj-ruparel-a140933a0/" },
  { icon: "file", label: "Resume", viewKey: "resume" },
  { icon: "github", label: "GitHub", href: "https://github.com/yuvrajruparel" },
];

export type ProjectLink =
  | { kind: "view"; label: string; viewKey: string }
  | { kind: "external"; label: string; href: string }
  | { kind: "modal"; label: string; modal: "f1-photos" | "f1-docs" };

export type Project = {
  title: string;
  date: string;
  image: string;
  fit: "cover" | "contain";
  description: string;
  links: ProjectLink[];
};

// Display order, newest first. Adding a project at the top pushes the rest one place later in the grid.
export const projects: Project[] = [
  {
    title: "Spiderbot Mark I",
    date: "08/2026 - Present",
    image: "photos/spiderbot.png",
    fit: "contain",
    description:
      "A four-legged robot designed in Autodesk Fusion and simulated in MuJoCo. Each leg has two servos, the whole robot weighs 1.1 kg, and a Raspberry Pi 5 runs the control loop. It walks forward, backward and turns in place.",
    links: [
      { kind: "view", label: "Read the report", viewKey: "spiderbot-report" },
      { kind: "external", label: "View the code", href: "https://github.com/yuvrajruparel/Spiderbot" },
    ],
  },
  {
    title: "Sensor PCB for Duke Robotics Club",
    date: "02/2026 - Present",
    image: "photos/sensor-pcb.png",
    fit: "contain",
    description:
      "A custom KiCad board for the club's underwater robot, Crush, used in RoboSub. It combines voltage, temperature-humidity and pressure sensors, a 5.5 V to 3.3 V I2C level shifter and an Arduino Nano for real-time data logging.",
    links: [{ kind: "view", label: "See the report", viewKey: "sensor-pcb-report" }],
  },
  {
    title: "Humidifier and Dehumidifier for the Duke Phytotron",
    date: "08/2025 - 12/2025",
    image: "photos/phytotron.jpg",
    fit: "cover",
    description:
      "A humidifier and dehumidifier for the R2 growth chambers in Duke's Phytotron building, run by an ESP32 that talks to the chamber's TC2 controller. I delivered the CAD, drawings, schematics and a working prototype so staff can build the same unit for 15 more chambers.",
    links: [
      { kind: "view", label: "View the poster", viewKey: "phytotron-poster" },
      {
        kind: "external",
        label: "Browse the code",
        href: "https://github.com/yuvrajruparel/Growing_Chamber_Retrofit",
      },
    ],
  },
  {
    title: "ISS De-orbit Simulator",
    date: "09/2025 - 12/2025",
    image: "photos/iss-deorbit.png",
    fit: "contain",
    description:
      "A team project in Python that simulates the planned deorbit of the International Space Station in four stages: orbital decay, a launch vehicle reaching the station, the final burn and re-entry. It models gravity, drag and thrust and integrates them with the Runge-Kutta method in NumPy.",
    links: [
      {
        kind: "external",
        label: "Explore the code",
        href: "https://github.com/yuvrajruparel/International-Space-Station-De-orbit-Simulator",
      },
    ],
  },
  {
    title: "Automated Waste Segregation System",
    date: "04/2024 - 11/2024",
    image: "photos/waste-dustbin.jpg",
    fit: "cover",
    description:
      "An AI-powered smart dustbin that sorts dry, wet and electronic waste using a conveyor belt and sorting mechanism. It was installed in 3 housing societies in Mumbai and sorted more than 30 kg of waste in each. I co-authored the published paper.",
    links: [
      {
        kind: "external",
        label: "Published research paper",
        href: "https://pubs.sciepub.com/wjee/9/1/1/index.html#RNfigures",
      },
      { kind: "view", label: "See the presentation", viewKey: "waste-presentation" },
    ],
  },
  {
    title: "Aramco F1 in Schools",
    date: "12/2021 - 09/2023",
    image: "photos/f1-card.jpg",
    fit: "cover",
    description:
      "As team leader and lead design engineer, I took the first rookie team from India to the F1 in Schools World Finals in Singapore. I modelled and manufactured the car and wrote our engineering portfolio.",
    links: [
      { kind: "modal", label: "See photos and awards", modal: "f1-photos" },
      { kind: "modal", label: "Browse the documentation", modal: "f1-docs" },
    ],
  },
];

export const upcoming = [
  {
    title: "Prowler",
    description:
      "A drone controlled from a phone app, built around a single custom PCB. It will use an MPU6050 IMU for stabilization, motor and ESC control, a live camera feed, and a 3D-printed PLA frame.",
  },
  {
    title: "Spiderbot Mark II",
    description:
      "The next version of Spiderbot, where the legged robot learns to walk with a reinforcement learning gait instead of a hand-coded one.",
  },
];

export type Experience = {
  title: string;
  org: string;
  logo: string;
  date: string;
  bullets?: string[];
  intro?: string;
  numbered?: { name: string; explanation: string }[];
  text?: string;
};

export const experience: Experience[] = [
  {
    title: "PCB Designer, Electricals",
    org: "Duke Robotics Club",
    logo: "logos/logo-duke-robotics.jpeg",
    date: "02/2026 - Present",
    bullets: [
      "Designed a KiCad PCB that combines a custom voltage sensor, a temperature-humidity sensor and an I2C pressure sensor with a 5.5 V to 3.3 V bidirectional level shifter, plus an Arduino Nano for real-time data logging.",
      "Integrated the board into the club's autonomous underwater robot, Crush, for RoboSub.",
    ],
  },
  {
    title: "Research Intern",
    org: "University of Mumbai",
    logo: "logos/logo-mumbai-university.png",
    date: "07/2022 - 09/2024",
    intro: "Worked on 3 published research projects:",
    numbered: [
      {
        name: "Ni-BCA/CF hybrid composite",
        explanation:
          "a nickel-based material for lithium-ion battery anodes that kept 54% of its capacity at fast charging.",
      },
      {
        name: "Silver nanoparticle hydrogel",
        explanation:
          "an antimicrobial hydrogel for burn relief, made with green-synthesized silver nanoparticles, that absorbs 110% of its weight in water.",
      },
      {
        name: "Biodegradable aqua balls",
        explanation:
          "beads that hold 248 mL of water per 2 g to keep plants hydrated, and fully biodegrade within seven weeks.",
      },
    ],
  },
  {
    title: "Engineering Intern",
    org: "ThyssenKrupp, Mumbai",
    logo: "logos/logo-thyssenkrupp.png",
    date: "12/2023",
    text: "Built CAD models for elevator components, ran physical simulations on parts and wrote the simulation reports. Also cleaned and analyzed profit and revenue data.",
  },
];

// Newest first.
export const awards = [
  { name: "CREST Gold Award", description: "Biodegradable Aqua Balls.", date: "12/2024" },
  { name: "CREST Gold Award", description: "AI Powered Smart Dustbin.", date: "10/2024" },
  { name: "CREST Gold Award", description: "Ni-BCA/CF Hybrid Composite.", date: "08/2024" },
  { name: "CREST Gold Award", description: "Ag-Ni Hydrogel.", date: "05/2024" },
  {
    name: "IRIS National Fair",
    description: "Selected for the National Round as the only Chemistry research project from across India.",
    date: "02/2024",
  },
  {
    name: "F1 in Schools World Finals",
    description: "Chair of Judges Recognition of Achievement Award, sponsored by Red Bull Racing.",
    date: "09/2023",
  },
  {
    name: "Johns Hopkins CTY Honor",
    description: "Top 20% of 19,000 students from 84 countries in the 2020-2021 Talent Search.",
    date: "08/2021",
  },
];

export const skills = [
  {
    title: "CAD and Manufacturing",
    count: "6 tools",
    items: ["SolidWorks", "Autodesk Fusion", "Onshape", "CNC milling (QuickCAM Pro)", "FDM printing", "SLS printing"],
  },
  {
    title: "Simulation and Analysis",
    count: "3 tools",
    items: ["FEA and CFD (Ansys Discovery)", "MuJoCo", "Wind tunnel testing"],
  },
  {
    title: "Electronics",
    count: "6 tools",
    items: [
      "PCB design (KiCad)",
      "I2C level shifting",
      "Sensor integration (Bar30, DHT11)",
      "MCU and SBC (Arduino, ESP32, Raspberry Pi)",
      "IMU (MPU6050)",
      "Motor and ESC control",
    ],
  },
  { title: "Programming", count: "4 skills", items: ["Python", "C++", "Reinforcement learning", "Git"] },
  {
    title: "Leadership",
    count: "2 roles",
    items: ["Led F1 in Schools team (World Finals, Singapore)", "Student Council Member (ABWA)"],
  },
  {
    title: "Languages Spoken",
    count: "6 languages",
    items: ["English", "Spanish", "Hindi", "Gujarati", "Marathi", "Kutchi"],
  },
];

export const closing = {
  headline: "Looking for Summer 2027 Internship",
  subtext:
    "Available full time. Interested in design, manufacturing, mechatronics and hardware electronics roles.",
};

export const f1Awards = [
  {
    group: "World Finals",
    items: ["Chair of Judges Recognition of Achievement Award (sponsored by Red Bull Racing)"],
  },
  {
    group: "National",
    items: ["Best Scrutineering", "National Collaboration Award", "People's Choice", "Second Runners Up"],
  },
  { group: "Regional", items: ["Regional Champions", "Best Enterprise Portfolio", "Best Rookie Team"] },
];

export const f1Photos = [1, 2, 3, 4, 5].map((n) => `photos/f1-awards-0${n}.jpg`);

export const f1Docs = {
  main: [
    { label: "Design and Engineering Portfolio", viewKey: "f1-design-engineering" },
    { label: "Project Management Portfolio", viewKey: "f1-project-management" },
    { label: "Enterprise Portfolio", viewKey: "f1-enterprise" },
    { label: "Car Renderings", viewKey: "f1-car-renderings" },
  ],
  booklets: [
    { label: "Aerodynamics Simplified", viewKey: "f1-aerodynamics-simplified" },
    { label: "Infinite Planet: Sustainable Earth", viewKey: "f1-infinite-planet" },
  ],
};

export type ViewerDoc = { title: string; file: string; type: "pdf" | "image" };

/** Every document and image opened in the in-site viewer (/view/:key). */
export const documents: Record<string, ViewerDoc> = {
  "spiderbot-report": { title: "Spiderbot Mark I Report", file: "docs/Spiderbot.pdf", type: "pdf" },
  "sensor-pcb-report": { title: "Sensor PCB Report", file: "docs/sensor-pcb-report.pdf", type: "pdf" },
  "phytotron-poster": { title: "Phytotron Poster", file: "docs/phytotron-poster.png", type: "image" },
  "waste-presentation": {
    title: "Waste Segregation Presentation",
    file: "docs/waste-presentation.pdf",
    type: "pdf",
  },
  "f1-design-engineering": {
    title: "Design and Engineering Portfolio",
    file: "docs/f1-design-engineering-portfolio.pdf",
    type: "pdf",
  },
  "f1-project-management": {
    title: "Project Management Portfolio",
    file: "docs/f1-project-management-portfolio.pdf",
    type: "pdf",
  },
  "f1-enterprise": { title: "Enterprise Portfolio", file: "docs/f1-enterprise-portfolio.pdf", type: "pdf" },
  "f1-car-renderings": { title: "Car Renderings", file: "docs/f1-car-renderings.pdf", type: "pdf" },
  "f1-aerodynamics-simplified": {
    title: "Aerodynamics Simplified",
    file: "docs/f1-aerodynamics-simplified.pdf",
    type: "pdf",
  },
  "f1-infinite-planet": {
    title: "Infinite Planet: Sustainable Earth",
    file: "docs/f1-infinite-planet.pdf",
    type: "pdf",
  },
  resume: { title: "Resume", file: "docs/resume.pdf", type: "pdf" },
  "cubing-guide": { title: "Cubing Guide", file: "docs/cubing-guide.pdf", type: "pdf" },
  "cube-17x17x17": { title: "Solved 17x17x17", file: "photos/cube-17x17x17.jpg", type: "image" },
};

export type SectionId = "home" | "projects" | "upcoming" | "experience" | "awards" | "skills" | "summer-2027";

export const sectionIds: [SectionId, ...SectionId[]] = [
  "home",
  "projects",
  "upcoming",
  "experience",
  "awards",
  "skills",
  "summer-2027",
];
