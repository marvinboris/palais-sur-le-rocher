import { ArrowsRightLeftIcon, BanknotesIcon, BellIcon, BookOpenIcon, ChatBubbleLeftEllipsisIcon, ChatBubbleOvalLeftEllipsisIcon, CogIcon, CreditCardIcon, GiftIcon, HomeIcon, PhotoIcon, RectangleStackIcon, TagIcon, UserGroupIcon, UserIcon, UserPlusIcon, UsersIcon } from '@heroicons/react/24/outline'
import axios, { AxiosError } from 'axios'
import _ from 'lodash'

import ResourceType from '../types/resource'
import ValidationType from '../types/validation'

export const setAuthToken = (token?: string | undefined | null) => {
    if (token) axios.defaults.headers.common['x-auth-token'] = token
    else delete axios.defaults.headers.common['x-auth-token']
}

export const capitalize = (str: string) => str.split(" ").map(word => _.capitalize(word)).join(" ")

export const classNames = (...c: string[]) => c.join(' ')

export const message = (content: string, type: 'danger' | 'warning' | 'success' | 'info' = 'info') => ({ type, content })

export const updateObject = (oldObject: { [key: string | number]: any }, updatedProps: { [key: string | number]: any }) => ({
    ...oldObject, ...updatedProps
});

export const convertDate = (date: string | number | Date) => {
    if (!date) return null;

    const d = new Date(date)
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' });

    return dtf.formatToParts(d).map(({ value }) => value).join('');
};

const twoDigits = (number: number) => number < 10 ? '0' + number : number;

export const convertTime = (date: string | number | Date) => {
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();

    return `${twoDigits(hours)} : ${twoDigits(minutes)} : ${twoDigits(seconds)}`;
}

export const timeFromTimestamp = (timestamp: number) => {
    const totalSeconds = Math.round(timestamp);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    const seconds = totalSeconds - hours * 3600 - minutes * 60;

    return `${twoDigits(hours)} : ${twoDigits(minutes)} : ${twoDigits(seconds)}`;
}

export const checkValidity = (value = '', rules: ValidationType) => {
    const validation: { [key: string]: boolean } = {};

    if (rules.required) validation.required = ((typeof value === 'string') && value.trim() !== '') || typeof value === 'number';

    if (rules.confirm) validation.confirm = value === rules.confirm;

    if (rules.minLength) validation.minLength = value.length >= rules.minLength;

    if (rules.maxLength) validation.maxLength = value.length <= rules.maxLength;

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        validation.isEmail = pattern.test(value);
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        validation.isNumeric = pattern.test(value);
    }

    return validation;
};

export const resourceIcon = (resource: ResourceType) => ({
    admins: UserPlusIcon,
    users: UserGroupIcon,
    roles: TagIcon,
    features: CogIcon,
    events: BellIcon,
    ministries: HomeIcon,
    subscribers: UserIcon,
    categories: RectangleStackIcon,
    publications: ChatBubbleLeftEllipsisIcon,
    methods: CreditCardIcon,
    lessons: BookOpenIcon,
    staff_members: UsersIcon,
    members: UserIcon,
    testimonials: ChatBubbleOvalLeftEllipsisIcon,
    images: PhotoIcon,
    donations: GiftIcon,
    tithes: BanknotesIcon,
    transactions: ArrowsRightLeftIcon,
}[resource])

export const htmlEntities = (str: string) => {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();

    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/ig, '');
}

export const manageResource = async (
    role: string,
    unformattedRoot: string,
    type: 'index' | 'info' | 'show' | 'post' | 'patch' | 'delete',
    ...params: any[]
) => {
    try {
        const root = unformattedRoot.split('_').join('-')
        let url: string, page, show, search, res, id: string, pageElt, showElt, searchElt, data

        switch (type) {
            case 'index':
                page = params[0] || 1;
                show = params[1] || 10;
                search = params[2] || '';
                url = `/api/backend/${role}/${root}?page=${page}&show=${show}&search=${search}`;
                res = await axios.get(url);
                return res.data

            case 'info':
                url = `/api/backend/${role}/${root}/info`;
                res = await axios.get(url);
                return res.data

            case 'show':
                id = params[0];
                url = `/api/backend/${role}/${root}/${id}`;
                res = await axios.get(url);
                return res.data

            case 'post':
                pageElt = document.getElementById('table-page') as HTMLInputElement;
                showElt = document.getElementById('table-show') as HTMLInputElement;
                searchElt = document.getElementById('table-search') as HTMLInputElement;
                if (pageElt) page = pageElt.value;
                if (showElt) show = showElt.value;
                if (searchElt) search = searchElt.value;

                data = params[0];
                url = `/api/backend/${role}/${root}?page=${page}&show=${show}&search=${search}`;
                res = await axios.post(url, data);
                return res.data

            case 'patch':
                pageElt = document.getElementById('table-page') as HTMLInputElement;
                showElt = document.getElementById('table-show') as HTMLInputElement;
                searchElt = document.getElementById('table-search') as HTMLInputElement;
                if (pageElt) page = pageElt.value;
                if (showElt) show = showElt.value;
                if (searchElt) search = searchElt.value;

                id = params[0];
                data = params[1];
                url = `/api/backend/${role}/${root}/${id}?page=${page}&show=${show}&search=${search}`;
                res = await axios.patch(url, data);
                return res.data

            case 'delete':
                pageElt = document.getElementById('table-page') as HTMLInputElement;
                showElt = document.getElementById('table-show') as HTMLInputElement;
                searchElt = document.getElementById('table-search') as HTMLInputElement;
                if (pageElt) page = pageElt.value;
                if (showElt) show = showElt.value;
                if (searchElt) search = searchElt.value;

                id = params[0];
                url = `/api/backend/${role}/${root}/${id}?page=${page}&show=${show}&search=${search}`;
                res = await axios.delete(url);
                return res.data
        }
    } catch (error) {
        console.log(error);
        return (error as AxiosError).response!.data
    }
}