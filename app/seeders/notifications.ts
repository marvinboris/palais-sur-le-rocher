import { Notification } from "../models";
import {
  NotificationInterface,
  NotificationType,
} from "../models/notification";

const notifications: NotificationInterface[] = [
  {
    type: NotificationType.Welcome,
    message: "Bienvenue au Palais sur le Rocher",
  },
];

export default async function notificationsSeed() {
  await Notification.insertMany(notifications);
}
