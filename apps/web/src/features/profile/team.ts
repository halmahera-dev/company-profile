import akmalPhoto from "../../../public/members/akmal.webp";
import ariqPhoto from "../../../public/members/ariq.webp";
import falifPhoto from "../../../public/members/falif.webp";
import nadyaPhoto from "../../../public/members/nadya.webp";
import zakiPhoto from "../../../public/members/zaki.webp";

export const awards = {
  lidm: { place: "1st Place", event: "LIDM 2024" },
  llama: { place: "3rd Place", event: "Meta Llama Hackathon 2024" },
  gemastik: { place: "3rd Place", event: "Gemastik 2024" },
} as const;

export const members = [
  {
    name: "Nadya",
    title: "Product & Business Lead",
    photo: nadyaPhoto,
    bio: "Turns a vague problem into a product someone will pay for. Owns the pitch, the plan, and the numbers.",
    awards: [awards.lidm, awards.llama],
  },
  {
    name: "Ariq",
    title: "Product Design Engineer",
    photo: ariqPhoto,
    bio: "Designs the interface and builds it too. Cares about the details most people only feel.",
    awards: [awards.lidm, awards.llama],
  },
  {
    name: "Zaki",
    title: "Research Lead",
    photo: zakiPhoto,
    bio: "Reads the papers so the product does not guess. Checks that every model does what we claim.",
    awards: [awards.gemastik],
  },
  {
    name: "Akmal",
    title: "AI & Software Engineer",
    photo: akmalPhoto,
    bio: "Builds the AI pipelines and the backend under them. Happiest when a demo runs on the first try.",
    awards: [awards.gemastik],
  },
  {
    name: "Falif",
    title: "Data Engineer",
    photo: falifPhoto,
    bio: "Cleans, moves, and shapes the data every model depends on. Makes messy sources usable.",
    awards: [awards.gemastik],
  },
];
