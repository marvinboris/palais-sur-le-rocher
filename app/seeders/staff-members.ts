import { StaffMember } from "../models";
import { StaffMemberInterface } from "../models/staff-member";

const staffMembers: StaffMemberInterface[] = [
  {
    name: "Rev. MBISSOKO Daniel",
    title: "Pasteur principal",
    description: "Description par défaut",
    photo: "tony-eight-media-iy34kwDyJ4E-unsplash.jpg",
    isActive: true,
    principal: true,
  },
  {
    name: "Mme MBISSOKO Mirabel",
    title: "Première dame & prophétesse",
    description: "Description par défaut",
    photo: "tony-eight-media-iy34kwDyJ4E-unsplash.jpg",
    isActive: true,
    principal: true,
  },
  {
    name: "TSIMI Thomas",
    title: "Pasteur",
    description: "Description par défaut",
    photo: "tony-eight-media-iy34kwDyJ4E-unsplash.jpg",
    isActive: true,
    principal: false,
  },
  {
    name: "MILLA Raphaëlla",
    title: "Prophétesse",
    description: "Description par défaut",
    photo: "tony-eight-media-iy34kwDyJ4E-unsplash.jpg",
    isActive: true,
    principal: false,
  },
  {
    name: "NYOKO Valery",
    title: "Evangéliste",
    description: "Description par défaut",
    photo: "tony-eight-media-iy34kwDyJ4E-unsplash.jpg",
    isActive: true,
    principal: false,
  },
  {
    name: "MONKAM Fabrice",
    title: "Pasteur",
    description: "Description par défaut",
    photo: "tony-eight-media-iy34kwDyJ4E-unsplash.jpg",
    isActive: true,
    principal: false,
  },
  {
    name: "KINGUE Aristide",
    title: "Docteur",
    description: "Description par défaut",
    photo: "tony-eight-media-iy34kwDyJ4E-unsplash.jpg",
    isActive: true,
    principal: false,
  },
];

export default async function staffMembersSeed() {
  await StaffMember.insertMany(staffMembers);
}
