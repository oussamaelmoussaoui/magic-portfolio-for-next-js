import { person } from "@/app/resources/content";
import { InlineCode, logo } from "@/once-ui/components";

const home_page = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  hero_sec: {
    sec_title: <>From concept to real impact.</>,
    sec_description: (
      <>
        Engineering student transforming data into decisions.
        <br />
        Building real-world projects with measurable impact.
      </>
    ),
  },
  work_sec: {
    sec_title: "Featured projects",
    sec_description: <>A selection of my latest projects, highlighting my skills and expertise.</>,
    cta: "View all work",
  },
  about_sec: {
    sec_title: "Who am I?",
    sec_description: (
      <>
        I'm Oussama, a Data Science & Cloud Computing engineering student based in Oujda, with a
        passion for web development.
        <br />I enjoy learning, experimenting, and building projects that create real impact.
      </>
    ),
    cta: "About me",
  },
  skills_sec: {
    sec_title: "Skills and Technologies",
    sec_description: (
      <>
        To deliver high-quality results, I carefully choose the right technologies and tools for
        each project.
      </>
    ),
    cta: "view all skills",
  },
  activities_sec: {
    sec_title: "Beyond Code",
    sec_description: (
      <>Leadership, teamwork, and initiative — key elements behind every successful project.</>
    ),
    cta: "View activities",
  },
  blog_sec: {
    sec_title: "Latest Articles",
    sec_description: <>Thoughts, tutorials, and insights on engineering, data, and technology.</>,
  },
};

const about_page = {
  label: "About me",
  title: `About ${person.name} — Data Science Engineer & Web Developer`,
  description: `Learn more about ${person.name}, an engineering student in Data Science & Cloud Computing at ENSA Oujda, web developer, and active club leader.`,

  tableOfContent: {
    display: true,
    subItems: false,
  },

  avatar: {
    display: true,
  },

  calendar: {
    display: false,
    link: "https://cal.com",
  },

  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I’m Oussama, an engineering student in Data Science & Cloud Computing based in Oujda, with a
        strong focus on building impactful, real-world digital solutions.
        <br />
        <br />
        My work sits at the intersection of data, software engineering, and web development, where I
        enjoy turning complex problems into clean, efficient, and scalable systems. I value clarity,
        performance, and purpose in everything I build.
      </>
    ),
  },

  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "National School of Applied Sciences, Oujda (ENSA Oujda)",
        timeframe: "2022 – 2027",
        description: (
          <>
            Engineering degree in Data Science & Cloud Computing, focusing on data analysis,
            software engineering, databases, and distributed systems.
          </>
        ),
      },
      {
        name: "Othmane Ibn Affane High School",
        timeframe: "2019 – 2022",
        description: (
          <>
            Mathematics and sciences track (Science Maths – A), building a strong foundation in
            analytical thinking and problem-solving.
          </>
        ),
      },
      {
        name: "1 Million Arab Coders",
        timeframe: "2019 – 2020",
        description: (
          <>
            Completed a full-stack web development program, gaining hands-on experience with modern
            web technologies and project-based learning.
          </>
        ),
      },
    ],
  },

  activities: {
    display: true,
    title: "Beyond the Classroom",
    career: [
      {
        role: "Treasurer",
        club: "ADE – Student Association",
        year: "2024 – Present",
        logo: "/images/clubs/logo-sportif-black.png",
        link: "https://www.instagram.com/p/DHrWyH1M_4i/?img_index=2",
      },
      {
        role: "Head of Events Direction Unit",
        club: "DSCC Club (Data Science & Cloud Computing)",
        year: "2024 – 2025",
        logo: "/images/clubs/dscc.PNG",
        link: "https://www.instagram.com/p/DOotMz2AnoX/?img_index=2",
      },
      {
        role: "Vice President",
        club: "ENSAO Sports Club",
        year: "2024 – 2025",
        logo: "/images/clubs/logo-sportif-black.png",
        link: "https://www.instagram.com/p/DAZGSToN1EF/?img_index=3",
      },
      {
        role: "Head of Sponsorship Unit",
        club: "Minds & Machines",
        year: "2024 – 2025",
        logo: "/images/clubs/minds and machines.png",
        link: null,
      },
      {
        role: "Head of Media Unit",
        club: "ENSAO Sports Club",
        year: "2023 – 2024",
        logo: "/images/clubs/logo-sportif-black.png",
        link: null,
      },
    ],
  },

  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "DeltaBrands LLC",
        timeframe: "2023 - 2024",
        role: "Store Creator & Manager",
        achievements: [
          <>
            Designed and built conversion-focused Shopify stores using both free and premium themes,
            tailored to brand identity and business goals.
          </>,
          <>
            Managed multiple e-commerce stores, optimizing product structure, user experience, and
            conversion rates through testing and analytics.
          </>,
          <>
            Implemented secure payment gateways and shipping configurations, ensuring a seamless
            end-to-end customer journey.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-20.png",
            alt: "Shopify Store",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-12.png",
            alt: "Shopify Store",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-07.png",
            alt: "Shopify Store",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },

  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "HTML/CSS",
        description: <>The basics of any website! So of course I know them by heart.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-05.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-06.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Javascript / GSAP",
        description: <>First programming language to master for any web developer.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-07.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: (
          <>
            We mostly need a framework for building server-rendered React applications, So{" "}
            <InlineCode> Next.js </InlineCode> is the greatest choice.
          </>
        ),
        images: [],
      },
      {
        title: "Python",
        description: (
          <>
            Python is a versatile programming language used for web development, data analysis,
            artificial intelligence, and more. So here is a weather app That I built using{" "}
            <InlineCode>Flask</InlineCode> and <InlineCode>OpenWeatherMap API</InlineCode>.
          </>
        ),
        images: [],
      },
      {
        title: "SQL : MySQL",
        description: (
          <>
            Being a Data Scientist requires a strong foundation in SQL for data manipulation and
            analysis. Here is an academic project that I built using <InlineCode>MySQL</InlineCode>.
          </>
        ),
        images: [],
      },
      {
        title: "JAVA OOP",
        description: (
          <>
            Object-Oriented Programming (OOP) is a programming paradigm based on the concept of
            "objects". Here are some projects that I built using <InlineCode>JAVA</InlineCode>.
          </>
        ),
        images: [],
      },
      {
        title: "Shopify",
        description: <>Building e-commerce solutions with Shopify.</>,
        images: [],
      },
    ],
  },
};

const work_page = {
  label: "Work",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

export { home_page, about_page, work_page };
