import { Model, Schema } from "mongoose";

export enum NotificationType {
  Welcome = "Welcome",
  Donation = "Donation",
}

export interface NotificationInterface {
  id?: string;
  type: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const NotificationSchema = new Schema<
  NotificationInterface,
  Model<NotificationInterface>
>(
  {
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toObject: { virtuals: true } }
);
