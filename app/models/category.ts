import { Model, Schema } from "mongoose"
import slugify from 'slugify'

export interface CategoryInterface {
    name: string
    slug?: string
    isActive?: boolean
    createdAt?: Date
    updatedAt?: Date
}

export const CategorySchema = new Schema<CategoryInterface, Model<CategoryInterface>>({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
}, { timestamps: true, toObject: { virtuals: true } })

CategorySchema.virtual('link').get(function () { return `/blog/${this.slug}` })

CategorySchema.pre<CategoryInterface>("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});