import { CogIcon, EyeIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useState } from "react"

import { useContentContext } from "../../../../../app/contexts/content"
import { useAppSelector } from "../../../../../app/hooks"
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state"

import { selectBackend } from "../../../../../features/backend/backendSlice"

import Alert from "../../../../frontend/ui/alert"
import Input from "../../../../frontend/ui/form/input"

import * as utility from '../../utils'

import ManagerAddOrEdit from "."
import Select from "../../../../frontend/ui/form/select"

type Props = { edit?: boolean }

const initialState = {
    name: '',
    isActive: '',

    add: false,
}

export default function ManageAddOrEditCategories({ edit }: Props) {
    const { status, data: backend, message } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { form: { active, inactive } }, pages: { categories: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => utility.add.component.inputChangeHandler(setState)(e)

    return <ManagerAddOrEdit icon={CogIcon} edit={edit} resource='categories' singular='category' initialState={initialState} state={state} setState={setState}>
        {message && <Alert className="mb-4" color={message.type}>{message.content}</Alert>}
        <div className='grid md:grid-cols-3'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Input inputSize='sm' type="text" icon={CogIcon} onChange={inputChangeHandler} value={state.name as string} name="name" required label={form.name} />
                    <Select inputSize='sm' icon={EyeIcon} label={form.is_active} onChange={inputChangeHandler} value={state.isActive as string} name="isActive" required>
                        <option>{form.select_status}</option>
                        <option value={1}>{active}</option>
                        <option value={0}>{inactive}</option>
                    </Select>
                </div>
            </div>
        </div>
    </ManagerAddOrEdit>
}