import { Ministry } from "../models";
import { MinistryInterface } from "../models/ministry";

const ministries: MinistryInterface[] = [
    { name: "Jeunesse", body: "Contenu par défaut", slug: 'jeunesse', photo: "/images/ministries/matt-botsford-bBNabN9R_ac-unsplash.jpg", description: '"Jeunes! Rendons ministère aux jeunes!"', isActive: true },
]

export default async function ministriesSeed() {
    for await (const ministry of ministries) {
        Ministry.create(ministry)
    }
}