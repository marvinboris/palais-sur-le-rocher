import { ChatBubbleOvalLeftEllipsisIcon, EyeIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useState } from "react"

import { useContentContext } from "../../../../../app/contexts/content"
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state"

import Input from "../../form/input"
import InputImage from "../../form/input-image"
import Select from "../../form/select"
import TextArea from "../../form/text-area"

import * as utility from '../../utils'

import ManagerAddOrEdit from "../add-or-edit"

type Props = { edit?: boolean }

const initialState = {
    name: '',
    title: '',
    body: '',
    photo: '',
    isActive: '1',

    add: false,
}

export default function ManageAddOrEditTestimonials({ edit }: Props) {
    const { content } = useContentContext()
    const { cms: { backend: { components: { form: { active, inactive } }, pages: { testimonials: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => utility.add.component.inputChangeHandler(setState)(e)
    const fileUpload = (id: string) => utility.add.component.fileUpload(id)

    return <ManagerAddOrEdit icon={ChatBubbleOvalLeftEllipsisIcon} edit={edit} resource='testimonials' singular='testimonial' initialState={initialState} state={state} setState={setState} staticChild={<>
        <input type="file" id="photo" name="photo" className="hidden" onChange={inputChangeHandler} accept=".png,.jpg,.jpeg" />
    </>}>
        <div className='grid md:grid-cols-3 gap-4'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Input icon={ChatBubbleOvalLeftEllipsisIcon} onChange={inputChangeHandler} value={state.name as string} name="name" required validation={{ required: true }} label={form.name} />
                    <Input icon={ChatBubbleOvalLeftEllipsisIcon} onChange={inputChangeHandler} value={state.title as string} name="title" required validation={{ required: true }} label={form.title} />
                    <TextArea className="col-span-2" onChange={inputChangeHandler} value={state.body as string} name="body" required validation={{ required: true }} label={form.body} />
                    <Select icon={EyeIcon} label={form.is_active} onChange={inputChangeHandler} value={state.isActive as string} name="isActive" required validation={{ required: true }}>
                        <option>{form.select_status}</option>
                        <option value={1}>{active}</option>
                        <option value={0}>{inactive}</option>
                    </Select>
                </div>
            </div>

            <div>
                <InputImage label={form.photo} name="photo" value={state.photo as string} onClick={() => fileUpload('photo')} />
            </div>
        </div>
    </ManagerAddOrEdit>
}