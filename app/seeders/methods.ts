import { Method } from "../models";
import { MethodInterface } from "../models/method";

const methods: MethodInterface[] = [
    { name: "Mobile Money", description: "Faire un paiement par Orange Money ou MTN Mobile Money (Cameroun)", isActive: true },
    { name: "Carte bancaire", description: "Faire un paiement par VISA ou MasterCard", isActive: true },
]

export default async function methodsSeed() {
    await Method.insertMany(methods)
}