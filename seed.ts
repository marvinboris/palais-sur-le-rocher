import dotenv from 'dotenv'
import mongoose from "mongoose";

import { Category, Event, Feature, Image, Lesson, Method, Ministry, Publication, Role, StaffMember, Testimonial, User } from './app/models';

import categoriesSeed from './app/seeders/categories';
import eventsSeed from './app/seeders/events';
import featuresSeed from "./app/seeders/features";
import imagesSeed from './app/seeders/images';
import lessonsSeed from './app/seeders/lessons';
import methodsSeed from './app/seeders/methods';
import minitriesSeed from './app/seeders/ministries';
import publicationsSeed from "./app/seeders/publications";
import rolesSeed from "./app/seeders/roles";
import staffMembersSeed from "./app/seeders/staff-members";
import testimonialsSeed from './app/seeders/testimonials';
import usersSeed from "./app/seeders/users";

dotenv.config({ path: './.env.local' })

mongoose.connect(process.env.MONGODB_URI!)
    .catch(error => {
        console.log(error.message)
        process.exit(1)
    })
    .then(async () => {
        console.log('Connected for seeding DB.')

        if (process.argv[2] === '-d') await destroyData()
        else await importData()

        mongoose.disconnect()
    })

const importData = async () => {
    try {
        await Category.deleteMany()
        await Event.deleteMany()
        await Feature.deleteMany()
        await Image.deleteMany()
        await Lesson.deleteMany()
        await Method.deleteMany()
        await Ministry.deleteMany()
        await Publication.deleteMany()
        await Role.deleteMany()
        await StaffMember.deleteMany()
        await Testimonial.deleteMany()
        await User.deleteMany()

        await categoriesSeed()
        await eventsSeed()
        await featuresSeed()
        await imagesSeed()
        await lessonsSeed()
        await methodsSeed()
        await minitriesSeed()
        await publicationsSeed()
        await rolesSeed()
        await staffMembersSeed()
        await testimonialsSeed()
        await usersSeed()

        console.log("DB seeded")
        process.exit(0)
    } catch (error) {
        console.log("DB not seeded", error)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Category.deleteMany()
        await Event.deleteMany()
        await Feature.deleteMany()
        await Image.deleteMany()
        await Lesson.deleteMany()
        await Method.deleteMany()
        await Ministry.deleteMany()
        await Publication.deleteMany()
        await Role.deleteMany()
        await StaffMember.deleteMany()
        await Testimonial.deleteMany()
        await User.deleteMany()

        console.log("Data destroyed")
        process.exit(0)
    } catch (error) {
        console.log("Data not destroyed", error)
        process.exit(1)
    }
}