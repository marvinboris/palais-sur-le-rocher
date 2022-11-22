import { Model, Schema } from "mongoose"
import slugify from 'slugify'

const directory = '/images/ministries/'

export interface MinistryInterface {
    name: string
    description: string
    body: string
    photo?: string
    slug?: string
    isActive: boolean
    createdAt?: Date
    updatedAt?: Date
}

export const MinistrySchema = new Schema<MinistryInterface, Model<MinistryInterface>>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true,
        get: (photo: string) => directory + photo
    },
    slug: {
        type: String,
        unique: true
    },
    isActive: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true, toObject: { getters: true, virtuals: true } })

// Virtuals
MinistrySchema.virtual('link').get(function () { return `/ministries/${this.slug}` })

MinistrySchema.pre<MinistryInterface>("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});