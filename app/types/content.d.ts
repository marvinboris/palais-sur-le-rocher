import { EventInterface } from "../models/event"
import { MinistryInterface } from "../models/ministry"

export default interface ContentType {
    cms: {
        global: {
            app_name: string, company_name: string, company_logo: string, favicon: string
            logo: { big?: string, dark?: string, default: string, light?: string },
            contact: {
                social_networks: { [key: string]: string },
                email: string,
                phone: string,
                map: string
            }
        }
        general: { date: string, time: string, home: string, days: string[], months: string[] }
        auth: {
            footer: { copyrights: string, all_rights: string }
            messages: {
                admin: { not_found: string, invalid: string, sent: string }
                user: { inactive: string, unauthorized: string, sent: string, reset: string, failure: string }
            }
            pages: {
                user: { login: { title: string, sign_in: string, email_address: string, password: string } }
                admin: {
                    login: { sign_in_to: string, sign_in: string, admin_panel: string, email_address: string, password: string, sms: string, email: string, otp_method: string },
                    verify: { enter: string, verification_code: string, continue: string, didnt_receive_code: string, resend: string }
                }
            }
        }
        backend: {
            header: { id: string, sign_out: string, no_message: string, no_notification: string, logout: string, close: string, sure_logout: string, you_have: string, messages: string, unread_message: string, unread_notification: string, unread_messages: string, unread_notifications: string, view_all_messages: string, view_all_notifications: string },
            footer: { copyright: string, all_rights: string },
            sidebar: {
                admin: string
                user: string
                menu: {
                    dashboard: { title: string },
                    notifications: { title: string },
                    admins: { title: string, add: string, index: string }
                    users: { title: string, add: string, index: string }
                    roles: { title: string, add: string, index: string }
                    features: { title: string, add: string, index: string }
                    testimonials: { title: string, add: string, index: string }
                    events: { title: string, add: string, index: string }
                    ministries: { title: string, add: string, index: string }
                    images: { title: string, add: string, index: string }
                    cms: { title: string, global: string, general: string, auth: string, backend: string, frontend: string }
                    settings: { title: string, cms: string, language: string }
                }
            },
            components: {
                form: { save: string, save_add: string, selected_file: string, active: string, inactive: string },
                list: {
                    action: string, all: string, first: string, last: string, loading: string, print: string, pdf: string, csv: string, excel: string, search: string, see: string, show: string, sl: string, showing: string, from: string
                    entries: { singular: string, plural: string }
                }
            },
            messages: {
                admins: { not_found: string, created: string, updated: string, deleted: string },
                users: { not_found: string, created: string, updated: string, deleted: string },
                subjects: { not_found: string, created: string, updated: string, deleted: string },
                roles: { not_found: string, created: string, updated: string, deleted: string },
                features: { not_found: string, created: string, updated: string, deleted: string },
                events: { not_found: string, created: string, updated: string, deleted: string },
                ministries: { not_found: string, created: string, updated: string, deleted: string },
                testimonials: { not_found: string, created: string, updated: string, deleted: string },
                images: { not_found: string, created: string, updated: string, deleted: string },
                notifications: { not_found: string }
                cms: { not_found: string, updated: string }
            },
            pages: {
                dashboard: {
                    admin: {
                        icon: string, title: string, subtitle: string
                        blocks: { users: string, testimonials: string, events: string, images: string }
                    },
                    user: {
                        icon: string, title: string, subtitle: string
                        blocks: { users: string, testimonials: string, events: string, images: string }
                        general_report: { title: string, subtitle: string, testimonials: string, total_testimonials: string }
                    }
                },
                cms: {
                    title: string, global: string, general: string, messages: string, frontend: string, components: string, backend: string, auth: string
                    form: { logo: string, app_name: string, company_name: string, company_logo: string }
                },
                admins: {
                    title: string, add: string, edit: string, index: string
                    form: { name: string, full_name: string, phone: string, password: string, password_confirmation: string, email: string, admin_photo: string, photo: string }
                },
                users: {
                    title: string, add: string, edit: string, index: string
                    form: { name: string, full_name: string, phone: string, password: string, password_confirmation: string, email: string, role: string, select_role: string, user_photo: string, photo: string }
                },
                roles: {
                    title: string, add: string, edit: string, index: string
                    form: { name: string, description: string, features: string, created_at: string, create: string, update: string, delete: string }
                },
                features: {
                    title: string, add: string, edit: string, index: string
                    form: { name: string, prefix: string, created_at: string }
                },
                events: {
                    title: string, add: string, edit: string, index: string
                    form: { title: string, body: string, photo: string, service_photo: string, is_active: string, select_status: string, created_at: string }
                },
                ministries: {
                    title: string, add: string, edit: string, index: string
                    form: { name: string, description: string, price: string, photo: string, product_photo: string, is_active: string, select_status: string, created_at: string }
                },
                notifications: {
                    title: string, show: string, index: string
                    form: { you_have_no_notification: string }
                },
                settings: {
                    title: string, subtitle: string
                    language: {
                        title: string
                        form: { select_language: string }
                    }
                },
                testimonials: {
                    title: string, add: string, edit: string, index: string
                    form: { name: string, title: string, body: string, photo: string, testimonial_photo: string, is_active: string, select_status: string, created_at: string }
                },
                images: {
                    title: string, add: string, edit: string, index: string
                    form: { src: string, photo: string, created_at: string }
                }
            }
        }
        frontend: {
            header: { menu: { home: string, about: string, events: string, ministries: string, contact: string, give: string } },
            footer: {
                top: {
                    navigation: {
                        head: string
                        title: string
                        menu: { home: string, about: string, events: string, ministries: string, contact: string }
                    },
                    contact: { head: string, title: string, address: string },
                    ministries: { head: string, title: string }
                },
                bottom: { all_rights: string }
            },
            components: {
                form: { loading: string },
                section: { read_more: string }
                service_block: { read_more: string }
                give: {
                    title: string,
                    subtitle: string,
                    form: {
                        first_name: string,
                        last_name: string,
                        email: string,
                        phone: string,
                        address: string,
                        select_service: string,
                        date: string,
                        comment: string,
                        continue: string
                    }
                }
            },
            messages: {
                contact: { success: string, failure: string }
                give: { success: string, failure: string }
            },
            pages: {
                home: {
                    banner: { title: string, subtitle: string },
                    about: { head: string, title: string, description: string, events: string[], read_more: string },
                    testimonials: { head: string, title: string, view_all: string },
                    events: { head: string, title: string, view_all: string },
                    contact: { head: string, title: string, address: string }
                },
                about: {
                    title: string, subtitle: string, description: string
                    about: { head: string, title: string, description: string, events: string[], read_more: string },
                    events: { head: string, title: string, view_all: string },
                    contact: { head: string, title: string, address: string }
                },
                contact: {
                    title: string, subtitle: string, description: string
                    contact: { head: string, title: string, address: string }
                    form: { head: string, title: string, description: string, name: string, email: string, subject: string, message: string, submit: string }
                },
                events: {
                    title: string, subtitle: string, description: string
                    events: { head: string, title: string }
                },
                ministries: {
                    title: string, subtitle: string, description: string
                    ministries: { head: string, title: string }
                }
            }
        }
    }
    events: (EventInterface & { _id: string, link: string })[]
    ministries: (MinistryInterface & { _id: string, link: string })[]
}