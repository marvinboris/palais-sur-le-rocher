import { Model, Schema, Types } from "mongoose"

export interface DonationInterface {
    id?: string
    transaction?: Types.ObjectId
    method?: Types.ObjectId
    amount?: number
    createdAt?: Date
    updatedAt?: Date
}

export const DonationSchema = new Schema<DonationInterface, Model<DonationInterface>>({
    transaction: {
        type: Types.ObjectId,
        ref: 'Transaction'
    },
    method: {
        type: Types.ObjectId,
        ref: 'Method'
    },
    amount: Number,
}, { timestamps: true })
