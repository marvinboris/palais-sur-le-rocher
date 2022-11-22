import { NextApiRequest, NextApiResponse } from "next";

import { Event, Image, Ministry, Publication, Testimonial } from "../../../app/models";
import ApiMessageType from "../../../app/types/api/message";

import { handleError } from "../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | ApiMessageType>
) {
    try {
        const gallery = await Image.find().limit(12)
        const publications = await Publication.find().limit(3).populate('category')
        const ministries = await Ministry.find().limit(4)
        const events = await Event.find().limit(4)
        const testimonies = await Testimonial.find().limit(3)

        res.json({
            publications: publications.map(publication => publication.toObject()),
            ministries: ministries.map(ministry => ministry.toObject()),
            gallery: gallery.map(galler => galler.toObject()),
            events: events.map(event => event.toObject()),
            testimonies: testimonies.map(testimonial => testimonial.toObject()),
        })
    } catch (error) {
        handleError(res, error)
    }
}