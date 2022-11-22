import { Category, Publication } from "../models";
import { PublicationInterface } from "../models/publication";

const publications: PublicationInterface[] = [
    { title: "Prendre possession de la bénédiction disponible", photo: "wei-cheng-wu-R7lSwItK0LE-unsplash.jpg", description: "Description par défaut", body: "Contenu par défaut", isActive: true },
]

export default async function publicationsSeed() {
    const category = await Category.findOne()
    for await (const publication of publications) {
        Publication.create({ ...publication, category })
    }
}