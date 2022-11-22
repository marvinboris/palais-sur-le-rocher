import { Model, Schema } from "mongoose"

const directory = '/audios/lessons/'

export interface LessonInterface {
    episode: number
    date: number
    description: string
    subtitle: string
    notes: string
    audio?: string
    isActive?: boolean
    createdAt?: Date
    updatedAt?: Date
}

export const LessonSchema = new Schema<LessonInterface, Model<LessonInterface>>({
    episode: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    audio: {
        type: String,
        required: true,
        get: (audio: string) => directory + audio
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
}, { timestamps: true, toObject: { getters: true, virtuals: true } })

// Virtuals
LessonSchema.virtual('link').get(function () { return `/lessons/${this._id}` })