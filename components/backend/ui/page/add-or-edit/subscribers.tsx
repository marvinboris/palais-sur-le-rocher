import { UserIcon, EnvelopeIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useState } from "react"

import { useContentContext } from "../../../../../app/contexts/content"
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state"

import Input from "../../form/input"

import * as utility from '../../utils'

import ManagerAddOrEdit from "."

type Props = { edit?: boolean }

const initialState = {
    firstName: '',
    email: '',

    add: false,
}

export default function ManageAddOrEditSubscribers({ edit }: Props) {
    const { content } = useContentContext()
    const { cms: { backend: { pages: { subscribers: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => utility.add.component.inputChangeHandler(setState)(e)

    return <ManagerAddOrEdit icon={UserIcon} edit={edit} resource='subscribers' singular='subscriber' initialState={initialState} state={state} setState={setState}>
        <div className='grid md:grid-cols-3 gap-4'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Input icon={UserIcon} onChange={inputChangeHandler} value={state.firstName as string} name="firstName" required validation={{ required: true }} label={form.first_name} />
                    <Input type="email" icon={EnvelopeIcon} onChange={inputChangeHandler} value={state.email as string} name="email" required validation={{ required: true, isEmail: true }} label={form.email} />
                </div>
            </div>
        </div>
    </ManagerAddOrEdit>
}