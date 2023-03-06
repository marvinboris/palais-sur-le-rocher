import { Model, Schema } from "mongoose"

import { capitalize } from "../helpers/utils"

const directory = '/images/members/'

export interface MemberInterface {
    id?: string
    firstName: string
    lastName: string
    name?: string
    photo?: string
    isActive: boolean
    createdAt?: Date
    updatedAt?: Date
}

export const MemberSchema = new Schema<MemberInterface, Model<MemberInterface>>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        get: (photo: string) => photo ? directory + photo : undefined
    },
    isActive: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true, toObject: { getters: true, virtuals: true } })

// Virtuals
MemberSchema.virtual('name').get(function () {
    return `${capitalize(this.firstName.toLowerCase())} ${this.lastName.toUpperCase()}`
})