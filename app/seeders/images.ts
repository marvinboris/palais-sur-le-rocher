import { Image } from "../models";
import { ImageInterface } from "../models/image";

const images: ImageInterface[] = [
    { photo: "alexandre-debieve-FO7JIlwjOtU-unsplash.jpg", },
    { photo: "anders-j-hxUcl0nUsIY-unsplash.jpg", },
    { photo: "danilo-alvesd-AzqJSCPkZkI-unsplash.jpg", },
    { photo: "emmanuel-ikwuegbu-_2AlIm-F6pw-unsplash.jpg", },
    { photo: "hobi-industri-NLBJ2I0lNr4-unsplash.jpg", },
    { photo: "john-barkiple-l090uFWoPaI-unsplash.jpg", },
    { photo: "mh-tri-TadNRJiOHB4-unsplash.jpg", },
    { photo: "nicolas-thomas-3GZi6OpSDcY-unsplash.jpg", },
    { photo: "riccardo-annandale-7e2pe9wjL9M-unsplash.jpg", },
    { photo: "roberto-sorin-ZZ3qxWFZNRg-unsplash.jpg", },
    { photo: "sigmund-r6tyWx_Mm9g-unsplash.jpg", },
    { photo: "thomas-kelley-xVptEZzgVfo-unsplash.jpg", },
    { photo: "christopher-burns-8KfCR12oeUM-unsplash.jpg", },
]

export default async function imagesSeed() {
    await Image.insertMany(images)
}