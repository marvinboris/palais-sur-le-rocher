import { Document, Model, PopulatedDoc, Schema, Types } from "mongoose";
import { NotificationInterface } from "./notification";

const directory = "/images/admins/";

export interface AdminInterface {
  id?: string;
  name: string;
  email: string;
  password: string;
  photo?: string;
  phone: string;
  locale: string;
  notifications: {
    notification?: PopulatedDoc<
      Document<Types.ObjectId> & NotificationInterface
    >;
    readAt?: Date;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const AdminSchema = new Schema<AdminInterface, Model<AdminInterface>>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      get: (photo: string) =>
        photo === "backend/user-pic.svg"
          ? `/images/${photo}`
          : directory + photo,
      default: "backend/user-pic.svg",
    },
    phone: {
      type: String,
      required: true,
    },
    locale: {
      type: String,
      enum: ["fr"],
      required: true,
      default: "fr",
    },
    notifications: [
      {
        notification: {
          type: Types.ObjectId,
          required: true,
          ref: "Notification",
        },
        readAt: Date,
      },
    ],
  },
  { timestamps: true, toObject: { getters: true } }
);
