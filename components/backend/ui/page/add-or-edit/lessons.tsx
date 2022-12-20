import { BookOpenIcon, EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useState } from "react"

import { useContentContext } from "../../../../../app/contexts/content"
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state"

import Input from "../../form/input"
import Select from "../../form/select"
import TextArea from "../../form/text-area"

import * as utility from '../../utils'

import ManagerAddOrEdit from "."

type Props = { edit?: boolean }

const initialState = {
    episode: '',
    date: '',
    description: '',
    subtitle: '',
    notes: '',
    audio: '',
    isActive: '1',

    add: false,
}

export default function ManageAddOrEditLessons({ edit }: Props) {
    const { content } = useContentContext()
    const { cms: { backend: { components: { form: { active, inactive } }, pages: { lessons: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => utility.add.component.inputChangeHandler(setState)(e)
    const fileUpload = (id: string) => utility.add.component.fileUpload(id)

    return <ManagerAddOrEdit icon={BookOpenIcon} edit={edit} resource='lessons' singular='lesson' initialState={initialState} state={state} setState={setState} staticChild={<>
        <input type="file" id="audio" name="audio" className="hidden" onChange={inputChangeHandler} accept=".m4a" />
    </>}>
        <div className='grid md:grid-cols-3 gap-4'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Input icon={BookOpenIcon} onChange={inputChangeHandler} value={state.episode as string} name="episode" required validation={{ required: true }} label={form.episode} />
                    <Input icon={BookOpenIcon} onChange={inputChangeHandler} value={state.date as string} name="date" required validation={{ required: true }} label={form.date} />
                    <Input className="col-span-2" icon={BookOpenIcon} onChange={inputChangeHandler} value={state.subtitle as string} name="subtitle" required validation={{ required: true }} label={form.subtitle} />
                    <TextArea className="col-span-2" onChange={inputChangeHandler} value={state.description as string} name="description" required validation={{ required: true }} label={form.description} />
                    <TextArea className="col-span-2" onChange={inputChangeHandler} value={state.notes as string} name="notes" required validation={{ required: true }} label={form.notes} />
                </div>
            </div>

            <div className='md:flex items-center justify-center'>
                <div onClick={() => fileUpload('audio')} className="aspect-[5/2] md:w-40 md:aspect-square cursor-pointer mt-[14px] md:mt-0 rounded-[15px] md:rounded-3xl relative flex flex-col items-center justify-center overflow-hidden text-white">
                    {/* {state.audio && <Image width={1920} height={1920} src={state.audio as string} alt="User profile pic" className="absolute z-0 inset-0 image-cover" />} */}
                    <div className="absolute z-10 inset-0 bg-black/40" />
                    <div className="relative z-20 w-9 md:w-14 h-9 md:h-14 mb-1 md:mb-1.5 rounded-full flex items-center justify-center bg-black/30"><PencilSquareIcon className='w-4 md:w-6' /></div>
                    <div className="relative z-20 font-medium md:font-bold text-[14.81px]">Change</div>
                </div>
            </div>
        </div>
    </ManagerAddOrEdit>
}