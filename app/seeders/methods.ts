import { Method } from "../models";
import { MethodInterface } from "../models/method";

const methods: MethodInterface[] = [
  {
    name: "Mobile Money",
    description:
      "Faire un paiement par Orange Money ou MTN Mobile Money (Cameroun)",
    logo: "69-691715_mtn-mm-logo-generic-mtn-mobile-money-logo.png",
    isActive: true,
  },
  {
    name: "Carte bancaire",
    description: "Faire un paiement par VISA ou MasterCard",
    logo: "01-3348369e.webp",
    isActive: true,
  },
];

export default async function methodsSeed() {
  await Method.insertMany(methods);
}
