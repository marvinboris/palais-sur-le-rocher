import { Feature } from "../models";
import { FeatureInterface } from "../models/feature";

const features: FeatureInterface[] = [
    { name: 'CMS', prefix: 'cms' },
    { name: 'Users', prefix: 'users' },
    { name: 'Roles', prefix: 'roles' },
    { name: 'Images', prefix: 'images' },
    { name: 'Features', prefix: 'features' },
    { name: 'EVents', prefix: 'events' },
    { name: 'Ministries', prefix: 'ministries' },
    { name: 'Categories', prefix: 'categories' },
    { name: 'Publications', prefix: 'publications' },
    { name: 'Lessons', prefix: 'lessons' },
    { name: 'Methods', prefix: 'methods' },
    { name: 'Staff members', prefix: 'staff-members' },
    { name: 'Testimonials', prefix: 'testimonials' },
]

export default async function featuresSeed() {
    await Feature.insertMany(features)
}