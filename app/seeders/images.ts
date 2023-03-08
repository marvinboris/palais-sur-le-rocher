import { Image } from "../models";
import { ImageInterface } from "../models/image";

const images: ImageInterface[] = [
  { photo: "aaron-burden-cmIqkMPfpMQ-unsplash.jpg" },
  { photo: "bruno-van-der-kraan-v2HgNzRDfII-unsplash.jpg" },
  { photo: "cathy-mu-UWFjqxYWAmA-unsplash.jpg" },
  { photo: "marek-piwnicki-k6ncmbh6pHk-unsplash.jpg" },
  { photo: "ben-white-W8Qqn1PmQH0-unsplash.jpg" },
  { photo: "matt-botsford-bBNabN9R_ac-unsplash.jpg" },
  { photo: "aaron-burden-9zsHNt5OpqE-unsplash.jpg" },
  { photo: "aaron-burden-H8s0PF2rcQs-unsplash.jpg" },
  { photo: "tony-eight-media-iy34kwDyJ4E-unsplash.jpg" },
  { photo: "aaron-burden-6jYoil2GhVk-unsplash.jpg" },
  { photo: "jeremy-yap-eCEj-BR91xQ-unsplash.jpg" },
  { photo: "wei-cheng-wu-R7lSwItK0LE-unsplash.jpg" },
];

export default async function imagesSeed() {
  await Image.insertMany(images);
}
