export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "React Summit 2025",
    image: "/images/event1.png",
    slug: "react-summit-2025",
    location: "Amsterdam, Netherlands",
    date: "June 3-4, 2025",
    time: "09:00 AM",
  },
  {
    title: "Web3 Developer Conference",
    image: "/images/event2.png",
    slug: "web3-dev-conf",
    location: "San Francisco, CA",
    date: "July 15-17, 2025",
    time: "10:00 AM",
  },
  {
    title: "Next.js Conf 2025",
    image: "/images/event3.png",
    slug: "nextjs-conf-2025",
    location: "New York, NY",
    date: "September 10-12, 2025",
    time: "08:30 AM",
  },
  {
    title: "AI & Machine Learning Summit",
    image: "/images/event4.png",
    slug: "ai-ml-summit",
    location: "Toronto, Canada",
    date: "August 20-22, 2025",
    time: "09:00 AM",
  },
  {
    title: "DevOps Days Europe",
    image: "/images/event5.png",
    slug: "devops-days-europe",
    location: "Vienna, Austria",
    date: "May 28-29, 2025",
    time: "10:00 AM",
  },
  {
    title: "JavaScript Global Bootcamp",
    image: "/images/event6.png",
    slug: "js-global-bootcamp",
    location: "Virtual / Multiple Cities",
    date: "April 15-17, 2025",
    time: "02:00 PM",
  },
];
