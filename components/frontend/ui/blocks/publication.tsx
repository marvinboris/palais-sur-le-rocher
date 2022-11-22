import Image from 'next/image'
import Link from 'next/link'

import { CategoryInterface } from '../../../../app/models/category'
import { PublicationInterface } from '../../../../app/models/publication'

type PublicationType = Omit<PublicationInterface, 'category'> & { _id: string, link: string, category: CategoryInterface }

export default function Publication({ title, category, photo, link }: PublicationType) {
    return <li>
        <Link href={link} className="block transition-all duration-200 hover:shadow-2xl group shadow-md rounded-2xl">
            <div className="w-full h-[190px] overflow-hidden rounded-t-2xl relative">
                <Image width={1920} height={1920} src={photo!} alt="Image de publication" className="image-cover" />
            </div>

            <dl className='p-3 bg-white rounded-b-2xl'>
                <div>
                    <dt className="sr-only">Titre</dt>

                    <dd className=" font-semibold text-secondary-900 ">
                        {title}
                    </dd>
                </div>

                <div>
                    <dt className="sr-only">Catégorie</dt>

                    <dd className=" ">{category.name}</dd>
                </div>
            </dl>
        </Link>
    </li >
}