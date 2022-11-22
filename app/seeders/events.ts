import { Event } from "../models";
import { EventInterface } from "../models/event";

const events: EventInterface[] = [
    { photo: "aaron-burden-cmIqkMPfpMQ-unsplash.jpg", title: "Titre par défaut 1", description: "Description par défaut", body: "Contenu par défaut", isActive: true },
    { photo: "cathy-mu-UWFjqxYWAmA-unsplash.jpg", title: "Titre par défaut 2", description: "Description par défaut", body: "Contenu par défaut", isActive: true },
    { photo: "ben-white-W8Qqn1PmQH0-unsplash.jpg", title: "Titre par défaut 3", description: "Description par défaut", body: "Contenu par défaut", isActive: true },
    { photo: "aaron-burden-9zsHNt5OpqE-unsplash.jpg", title: "Titre par défaut 4", description: "Description par défaut", body: "Contenu par défaut", isActive: true },
]

export default async function eventsSeed() {
    for await (const event of events) {
        Event.create(event)
    }
}