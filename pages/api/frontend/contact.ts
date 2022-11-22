import { NextApiRequest, NextApiResponse } from "next";

import { message } from "../../../app/helpers/utils";
import ApiMessageType from "../../../app/types/api/message";

import sendMail from "../../../lib/nodemailer";
import { getCms, handleError } from "../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | ApiMessageType>
) {
    try {
        const cms = getCms()
        const { name, email, subject, message: _message } = req.body

        await sendMail({
            to: 'jaris.ultio.21@gmail.com',
            subject: 'Nouveau message de contact',
            html: `
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/plus-jakarta-display.min.css" />
                <main style="font-family: 'Plus Jakarta Display', sans-serif; color: #5A657D;">
                    <h2>Nouveau message de contact</h2>
                    <p>En voici les détails:</p>
                    <ul>
                    <li>Nom: <strong>${name}</strong></li>
                    <li>Adresse mail: <strong>${email}</strong></li>
                    <li>Objet: <strong>${subject}</strong></li>
                    <li>Message: <strong>${_message}</strong></li>
                    </ul>
                </main>
            `
        })

        res.json({ message: message(cms.frontend.messages.contact.success, 'success') })
    } catch (error) {
        handleError(res, error)
    }
}