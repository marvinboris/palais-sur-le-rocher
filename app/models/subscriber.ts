import { Model, Schema } from "mongoose";

export interface SubscriberInterface {
  id?: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const SubscriberSchema = new Schema<
  SubscriberInterface,
  Model<SubscriberInterface>
>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
