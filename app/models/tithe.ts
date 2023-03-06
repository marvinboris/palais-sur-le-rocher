import { Model, Schema, Types } from "mongoose"

export interface TitheInterface {
    id?: string
    member?: Types.ObjectId
    method?: Types.ObjectId
    amount?: number
    transaction?: Types.ObjectId
    createdAt?: Date
    updatedAt?: Date
}

export const TitheSchema = new Schema<TitheInterface, Model<TitheInterface>>({
    member: {
        type: Types.ObjectId,
        required: true,
        ref: 'Member'
    },
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
