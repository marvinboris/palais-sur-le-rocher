import { Model, Schema } from "mongoose";

const directory = "/images/testimonials/";

export interface TestimonialInterface {
  id?: string;
  name: string;
  title: string;
  body: string;
  photo?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const TestimonialSchema = new Schema<
  TestimonialInterface,
  Model<TestimonialInterface>
>(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
      get: (photo: string) => directory + photo,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true, toObject: { getters: true } }
);
