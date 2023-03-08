import { Model, Schema, Types } from "mongoose";
import slugify from "slugify";

const directory = "/images/publications/";

export interface PublicationInterface {
  id?: string;
  title: string;
  description: string;
  body: string;
  category?: Types.ObjectId;
  photo?: string;
  slug?: string;
  link?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const PublicationSchema = new Schema<
  PublicationInterface,
  Model<PublicationInterface>
>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: Types.ObjectId,
      required: true,
      ref: "Category",
    },
    photo: {
      type: String,
      required: true,
      get: (photo: string) => directory + photo,
    },
    slug: {
      type: String,
      unique: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, toObject: { getters: true, virtuals: true } }
);

// Virtuals
PublicationSchema.virtual("link").get(function () {
  return `/explore/blog/${this.slug}`;
});

PublicationSchema.pre<PublicationInterface>("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});
