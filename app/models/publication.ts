import { Model, Schema, Types } from "mongoose"
import slugify from 'slugify'
import { CategoryInterface } from "./category"

const directory = '/images/publication/'

export interface PublicationInterface {
    title: string
    description: string
    body: string
    category?: Types.ObjectId
    photo?: string
    slug?: string
    isActive: boolean
    createdAt?: Date
    updatedAt?: Date
}

export const PublicationSchema = new Schema<PublicationInterface, Model<PublicationInterface>>({
    title: {
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
    category: {
        type: Types.ObjectId,
        required: true,
        ref: 'Category'
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
PublicationSchema.virtual('link').get(async function () {
    const populated: any = await this.populate<{ category: CategoryInterface }>('category')
    return `/blog/${populated.category.slug}/${this.slug}`
})

PublicationSchema.pre<PublicationInterface>("save", function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});