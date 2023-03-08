import { Category } from "../models";
import { CategoryInterface } from "../models/category";

const categories: CategoryInterface[] = [
  { name: "Programme de prière, Atmosphère de gloire", isActive: true },
];

export default async function categoriesSeed() {
  await Category.insertMany(categories);
}
