import { Model, Schema } from "mongoose"
import slugify from 'slugify'

const directory = '/images/events/'

export interface EventInterface {
    title: string
    description: string
    body: string
    photo?: string
    slug?: string
    isActive: boolean
    createdAt?: Date
    updatedAt?: Date
}

export const EventSchema = new Schema<EventInterface, Model<EventInterface>>({
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
EventSchema.virtual('link').get(function () { return `/events/${this.slug}` })

EventSchema.pre<EventInterface>("save", function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});