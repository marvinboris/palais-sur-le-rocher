import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type InputImageProps = {
    label: string
    id?: string
    name: string
    value?: string
    onClick: () => void
}

export default function InputImage({ id, label, name, value, onClick }: InputImageProps) {
    return <div>
        {label && <label htmlFor={id ? id : name}>{label}</label>}

        <div onClick={onClick} className="aspect-[5/2] md:aspect-video cursor-pointer bg-secondary-100 md:mt-0 rounded-lg relative overflow-hidden text-white">
            {value && <Image fill src={value} alt={label} className="absolute z-0 inset-0 image-cover" />}
            
            <div className="absolute z-10 inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-all duration-200">
                <div className="relative z-20 w-9 md:w-14 h-9 md:h-14 mb-1 md:mb-1.5 rounded-full flex items-center justify-center bg-black/30"><PencilSquareIcon className='w-4 md:w-6' /></div>
                <div className="relative z-20 font-medium md:font-bold text-[14.81px]">Change</div>
            </div>
        </div>
    </div>
}