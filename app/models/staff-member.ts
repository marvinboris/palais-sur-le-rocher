import { Model, Schema } from "mongoose";

const directory = "/images/staff-members/";

export interface StaffMemberInterface {
  id?: string;
  name: string;
  title: string;
  description: string;
  photo?: string;
  isActive: boolean;
  principal: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const StaffMemberSchema = new Schema<
  StaffMemberInterface,
  Model<StaffMemberInterface>
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
    description: {
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
    },
    principal: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, toObject: { getters: true } }
);
