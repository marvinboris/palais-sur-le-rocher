import { RectangleStackIcon, EyeIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useState } from "react"

import { useContentContext } from "../../../../../app/contexts/content"
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state"

import Input from "../../form/input"
import Select from "../../form/select"

import * as utility from '../../utils'

import ManagerAddOrEdit from "."

type Props = { edit?: boolean }

const initialState = {
    name: '',
    isActive: '',

    add: false,
}

export default function ManageAddOrEditCategories({ edit }: Props) {
    const { content } = useContentContext()
    const { cms: { backend: { components: { form: { active, inactive } }, pages: { categories: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => utility.add.component.inputChangeHandler(setState)(e)

    return <ManagerAddOrEdit icon={RectangleStackIcon} edit={edit} resource='categories' singular='category' initialState={initialState} state={state} setState={setState}>
        <div className='grid md:grid-cols-3 gap-4'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Input icon={RectangleStackIcon} onChange={inputChangeHandler} value={state.name as string} name="name" required validation={{ required: true }} label={form.name} />
                    <Select icon={EyeIcon} label={form.is_active} onChange={inputChangeHandler} value={state.isActive as string} name="isActive" required validation={{ required: true }}>
                        <option>{form.select_status}</option>
                        <option value={1}>{active}</option>
                        <option value={0}>{inactive}</option>
                    </Select>
                </div>
            </div>
        </div>
    </ManagerAddOrEdit>
}