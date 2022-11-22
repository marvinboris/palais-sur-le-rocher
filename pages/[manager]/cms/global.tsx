import { ArrowDownOnSquareIcon, Cog8ToothIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { ChangeEvent, FormEvent, ReactElement, useEffect, useState } from 'react'

import { NextPageWithLayout } from '../../_app'

import Layout, { Head } from '../../../components/backend/navigation/layout'

import Button from '../../../components/backend/ui/form/button'
import PageTitle from '../../../components/backend/ui/title/page'

import Input from '../../../components/frontend/ui/form/input'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectAuth } from '../../../features/auth/authSlice'
import { useContentContext } from '../../../app/contexts/content'
import { get, patch, selectBackend } from '../../../features/backend/backendSlice'
import Status from '../../../app/types/enums/status'

type ValueType = any
type SetValueType = (value: ValueType | ((value: ValueType) => ValueType)) => void

const readURL = (input: EventTarget & HTMLInputElement, setValue: SetValueType) => {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            setValue((value: ValueType) => ({ ...value, photo: e.target!.result as string }));
        }

        reader.readAsDataURL(file); // convert to base64 string
    }
};

const ManagerCmsGlobalPage: NextPageWithLayout = () => {
    const { content } = useContentContext()
    const { cms: { global: { app_name, logo }, backend: { components: { form: { save } }, pages: { cms: { title, global, form } } } } } = content!

    const dispatch = useAppDispatch()
    const { role } = useAppSelector(selectAuth)
    const { status, data } = useAppSelector(selectBackend)

    const [value, setValue] = useState<ValueType>(content!.cms.global)

    const [params] = useState({
        role: role!,
        resource: 'cms',
    })

    useEffect(() => {
        if (status === Status.IDLE && !(data && data.cms)) {
            dispatch(get(params))
        }
    }, [data, dispatch, params, role, status])

    useEffect(() => {
        if (data && value.app_name === '') setValue({ ...data.cms.global })
    }, [data, value.app_name])


    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value: val } = e.target
        if ('files' in e.target && e.target.files) readURL(e.target, setValue)
        setValue((value: ValueType) => ({ ...value, [name]: ('files' in e.target && e.target.files) ? e.target.files[0] : val }))
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        dispatch(patch({ ...params, id: 'global', data: e.target }));
    }

    const handlePhotoChange = (id: string) => document.getElementById(id)?.click()

    return <>
        <Head link={`/${role}/cms/global`} title={`${title} | ${app_name}`} description='' />
        <main className='flex-1'>
            <PageTitle icon={Cog8ToothIcon} title={title} subtitle={global} />

            <div className="px-[33px] md:px-[42px] pt-[29px] md:pt-[47px] pb-[54px]">
                <div className="bg-white rounded-[30px] py-8 px-[38.36px] shadow-2xl mb-[25px]">
                    <div className="mb-[46.94px] flex flex-wrap md:flex-nowrap items-center justify-between">
                        <div className='order-2 md:order-1'>
                            <div className="font-bold md:font-medium mb-[4.63px] text-[25px] md:text-[22.21px]">{global}</div>

                            <div className="w-[30.24px] h-[6.5732px] rounded-xl bg-yellow" />
                        </div>

                        <div className="flex items-center order-1 md:order-2 ml-auto md:ml-0 mb-8 md:mb-0">
                        </div>
                    </div>

                    <form onSubmit={submitHandler}>
                        <div className='grid md:grid-cols-3'>
                            <div className="md:col-span-2 flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                                <Input inputSize='sm' type="text" onChange={onChange} value={value.app_name} name="app_name" required label={form.app_name} />
                                <Input inputSize='sm' type="text" onChange={onChange} value={value.company_name} name="company_name" required label={form.company_name} />
                                {Object.keys(logo).map(key => <div key={`global-input-logo${key}`}>
                                    <div>{`${form.logo}(${key})`}</div>
                                    <div onClick={() => handlePhotoChange(`logo-${key}`)} className="aspect-[5/2] cursor-pointer mt-[14px] md:mt-0 rounded-[15px] md:rounded-3xl relative flex flex-col items-center justify-center overflow-hidden text-white">
                                        {key in value.logo && value.logo[key] && <Image width={1920} height={1920} src={value.logo[key]!} alt="User profile pic" className="absolute z-0 inset-0 image-cover" />}
                                        <div className="absolute z-10 inset-0 bg-black/40" />
                                        <div className="relative z-20 w-9 md:w-14 h-9 md:h-14 mb-1 md:mb-1.5 rounded-full flex items-center justify-center bg-black/30"><PencilSquareIcon className='w-4 md:w-6' /></div>
                                        <div className="relative z-20 font-medium md:font-bold text-[14.81px]">Change</div>
                                    </div>
                                </div>)}
                            </div>
                        </div>

                        <div className='mt-5'>
                            <Button pill icon={ArrowDownOnSquareIcon} color='green'>{save}</Button>
                        </div>

                        <input type="file" id="company_logo" name="company_logo" className="hidden" onChange={onChange} accept=".png,.jpg,.jpeg" />
                        <input type="file" id="logo-big" name="logo[big]" className="hidden" onChange={onChange} accept=".png,.jpg,.jpeg" />
                        <input type="file" id="logo-dark" name="logo[dark]" className="hidden" onChange={onChange} accept=".png,.jpg,.jpeg" />
                        <input type="file" id="logo-default" name="logo[default]" className="hidden" onChange={onChange} accept=".png,.jpg,.jpeg" />
                        <input type="file" id="logo-light" name="logo[light]" className="hidden" onChange={onChange} accept=".png,.jpg,.jpeg" />
                        <input type="file" id="logo-named" name="logo[named]" className="hidden" onChange={onChange} accept=".png,.jpg,.jpeg" />
                    </form>
                </div>
            </div>
        </main>
    </>
}

ManagerCmsGlobalPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerCmsGlobalPage