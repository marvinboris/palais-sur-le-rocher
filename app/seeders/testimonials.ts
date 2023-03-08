import { Testimonial } from "../models";
import { TestimonialInterface } from "../models/testimonial";

const testimonials: TestimonialInterface[] = [
  {
    name: "Boris NDOUMA",
    body: "C'est toujours une expérience profonde de communier avec mes frères et sœurs du Palais, d'y être enseigné, de louer, d'adorer l'Eternel. Je bénis Son saint nom de m'avoir appelé au travers de cette famille.",
    title: "Développeur Web",
    photo: "nbm.jpg",
  },
];

export default async function testimonialsSeed() {
  await Testimonial.insertMany(testimonials);
}
