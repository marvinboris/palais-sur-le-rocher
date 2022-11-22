import { EnvelopeIcon, EyeIcon, LockClosedIcon, PencilSquareIcon, TagIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { ChangeEvent, useState } from "react"

import { useContentContext } from "../../../../../app/contexts/content"
import { useAppSelector } from "../../../../../app/hooks"
import { CategoryInterface } from "../../../../../app/models/category"
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state"

import { selectBackend } from "../../../../../features/backend/backendSlice"
import Alert from "../../../../frontend/ui/alert"

import Input from "../../../../frontend/ui/form/input"
import Select from "../../../../frontend/ui/form/select"

import * as utility from '../../utils'

import ManagerAddOrEdit from "."
import TextArea from "../../../../frontend/ui/form/text-area"

type Props = { edit?: boolean }

const initialState = {
    name: '',
    phone: '',
    photo: '',
    email: '',
    password: '',
    password_confirmation: '',
    category: '',

    add: false,
}

export default function ManageAddOrEditPublications({ edit }: Props) {
    const { status, data: backend, message } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { form: { active, inactive } }, pages: { publications: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => utility.add.component.inputChangeHandler(setState)(e)
    const fileUpload = (id: string) => utility.add.component.fileUpload(id)

    const categories = backend && backend.categories ? (backend.categories as (CategoryInterface & { _id: string })[]) : []
    const categoriesOptions = categories.map(category => <option key={JSON.stringify(category)} value={category._id}>{category.name}</option>);

    return <ManagerAddOrEdit icon={UserGroupIcon} edit={edit} resource='publications' singular='publication' initialState={initialState} state={state} setState={setState} staticChild={<>
        <input type="file" id="photo" name="photo" className="hidden" onChange={inputChangeHandler} accept=".png,.jpg,.jpeg" />
    </>}>
        {message && <Alert color={message.type}>{message.content}</Alert>}
        <div className='grid md:grid-cols-3'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Input inputSize='sm' type="text" icon={UserIcon} onChange={inputChangeHandler} value={state.title as string} name="title" required label={form.title} />
                    <Input inputSize='sm' className="md:col-span-2" type="text" icon={UserIcon} onChange={inputChangeHandler} value={state.description as string} name="description" required label={form.description} />
                    <TextArea inputSize='sm' className="md:col-span-2" onChange={inputChangeHandler} value={state.body as string} name="body" required label={form.body} />
                    <Select inputSize='sm' icon={TagIcon} name="category" label={form.category} onChange={inputChangeHandler} required value={state.category as string}>
                        <option>{form.select_category}</option>
                        {categoriesOptions}
                    </Select>
                    <Select inputSize='sm' icon={EyeIcon} label={form.is_active} onChange={inputChangeHandler} value={state.isActive as string} name="isActive" required>
                        <option>{form.select_status}</option>
                        <option value={1}>{active}</option>
                        <option value={0}>{inactive}</option>
                    </Select>
                </div>
            </div>

            <div className='md:flex items-center justify-center'>
                <div onClick={() => fileUpload('photo')} className="aspect-[5/2] md:w-40 md:aspect-square cursor-pointer mt-[14px] md:mt-0 rounded-[15px] md:rounded-3xl relative flex flex-col items-center justify-center overflow-hidden text-white">
                    {state.photo && <Image width={1920} height={1920} src={state.photo as string} alt="User profile pic" className="absolute z-0 inset-0 image-cover" />}
                    <div className="absolute z-10 inset-0 bg-black/40" />
                    <div className="relative z-20 w-9 md:w-14 h-9 md:h-14 mb-1 md:mb-1.5 rounded-full flex items-center justify-center bg-black/30"><PencilSquareIcon className='w-4 md:w-6' /></div>
                    <div className="relative z-20 font-medium md:font-bold text-[14.81px]">Change</div>
                </div>
            </div>
        </div>
    </ManagerAddOrEdit>
}