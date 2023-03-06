import { Feature } from "../models";
import { FeatureInterface } from "../models/feature";

const features: FeatureInterface[] = [
    { name: 'CMS', prefix: 'cms' },
    { name: 'Users', prefix: 'users' },
    { name: 'Roles', prefix: 'roles' },
    { name: 'Images', prefix: 'images' },
    { name: 'Features', prefix: 'features' },
    { name: 'Donations', prefix: 'donations' },
    { name: 'Tithes', prefix: 'tithes' },
    { name: 'Transactions', prefix: 'transactions' },
    { name: 'Ministries', prefix: 'ministries' },
    { name: 'Subscribers', prefix: 'subscribers' },
    { name: 'Categories', prefix: 'categories' },
    { name: 'Publications', prefix: 'publications' },
    { name: 'Lessons', prefix: 'lessons' },
    { name: 'Methods', prefix: 'methods' },
    { name: 'Staff members', prefix: 'staff-members' },
    { name: 'Members', prefix: 'members' },
    { name: 'Testimonials', prefix: 'testimonials' },
]

export default async function featuresSeed() {
    await Feature.insertMany(features)
}