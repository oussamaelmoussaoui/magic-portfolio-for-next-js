import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "EL MOUSSAOUI",
  lastName: "Oussama",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Web Developer",
  avatar: "/images/photo_finale.jpg",
  location: "Africa/Casablanca", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "French", "Spanish", "Arabic"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/oussamaelmoussaoui",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/el-moussaoui-oussama-0a4a9524b/",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:oelmoussawi@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Web developer and builder</>,
  subline: (
    <>
      I'm EL MOUSSAOUI Oussama, a Data Science & Cloud Computing engineer student and a web developer at <InlineCode>ENSAO</InlineCode>, 
      where I craft intuitive <br /> user experiences. After hours, I build my own projects.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  
  tableOfContent: {
    display: true,
    subItems: false,
  },
  
  avatar: {
    display: true,
  },
  
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Oussama is an Oujda-based web developer and data science and cloud computing
        engineer student with a passion for transforming complex challenges
        into simple, elegant web solutions. My work spans digital interfaces, interactive
        experiences, and the convergence of design and technology.
      </>
    ),
  },

  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "The School of Applied Sciences Oujda (ENSA Oujda)",
        timeframe: "2022 - 2027",
        description: <>Studying Data Science & Cloud Computing engineering.</>,
      },
      {
        name: "Othmane Ibn Affane High School",
        timeframe: "2019 - 2022",
        description: <>Studied Maths science option A (Science Maths -A).</>,
      },
      {
        name: "1 Million Arabe Coders",
        timeframe: "2019 - 2020",
        description: <>Completed a full-stack web development course.</>,
      }
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
            Building good looking Stores using <InlineCode>Shopify</InlineCode> with free and premium themes
            that responds on the brand's needs.
          </>,
          <>
            Setup and managed multiple Shopify stores, optimizing product listings and
            improving conversion rates through A/B testing and user feedback.
          </>,
          <>
            Payment integration and shipping setup for the stores, ensuring a smooth
            customer experience from browsing to checkout.
          </>
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-20.png",
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
        description: 
        <>
          The basics of any website! So of course I know them by heart.
        </>,
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
        description: 
        <>
          First programming language to master for any web developer.
        </>,
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
        description: 
        <>
          We mostly need a framework for building server-rendered React applications, So <InlineCode> Next.js </InlineCode> is the greatest choice.
        </>,
        images: [],
      },
      {
        title: "Python",
        description: 
        <>
          Python is a versatile programming language used for web development, data analysis, artificial intelligence, and more.
          So here is a weather app That I built using <InlineCode>Flask</InlineCode> and <InlineCode>OpenWeatherMap API</InlineCode>.
        </>,
        images: [],
      },
      {
        title: "SQL : MySQL",
        description: 
        <>
          Being a Data Scientist requires a strong foundation in SQL for data manipulation and analysis. Here is an academic project that I built using <InlineCode>MySQL</InlineCode>.
        </>,
        images: [],
      },
      {
        title: "JAVA OOP",
        description: 
        <>
          Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects". Here are some projects that I built using <InlineCode>JAVA</InlineCode>.
        </>,
        images: [],
      },
      {
        title: "Shopify",
        description: 
        <>
          Building e-commerce solutions with Shopify. 
        </>,
        images: [],
      },

    ],
  },
};

const blog = {
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Work",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "My photo gallery",
  description: `A photo collection by ${person.name}`,
  // Images from https://pexels.com
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-09.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-11.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-12.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-13.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-14.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
