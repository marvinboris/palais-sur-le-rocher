import Link from "next/link";
import { useContentContext } from "../../../../app/contexts/content";

export default function SocialNetworks() {
    const { content } = useContentContext()
    const { cms: { global: { contact: { social_networks } } } } = content!

    return <div className="flex items-center space-x-2.5">
        <Link href={social_networks.facebook}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="group" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="22" className="fill-primary-600/10 group-hover:fill-primary-600 transition-all duration-200" />
                <path d="M19.5742 31H23.0371V23.4117H26.1573L26.5 19.6408H23.0371V17.7368C23.0371 17.2136 23.4247 16.7895 23.9028 16.7895H26.5V13H23.9028C21.5121 13 19.5742 15.1208 19.5742 17.7368V19.6408H17.8427L17.5 23.4117H19.5742V31Z" className="fill-primary-600 group-hover:fill-white transition-all duration-200" />
            </svg>
        </Link>
        <Link href={social_networks.twitter}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="group" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="22" className="fill-primary-600/10 group-hover:fill-primary-600 transition-all duration-200" />
                <g clipPath="url(#clip0_694_818)">
                    <path d="M31.1666 14.6756C30.2499 15.1248 29.3516 15.3072 28.4166 15.5831C27.389 14.4235 25.8655 14.3594 24.4016 14.9075C22.9377 15.4557 21.9788 16.7959 21.9999 18.3331V19.2498C19.0253 19.3259 16.3762 17.971 14.6666 15.5831C14.6666 15.5831 10.8331 22.3967 18.3333 25.6664C16.6173 26.8095 14.9058 27.5804 12.8333 27.4998C15.8656 29.1525 19.1702 29.7209 22.0311 28.8904C25.3128 27.937 28.0096 25.4776 29.0445 21.7935C29.3532 20.673 29.5065 19.5155 29.5001 18.3533C29.4983 18.125 30.8843 15.8123 31.1666 14.6747V14.6756Z" className="stroke-primary-600 group-hover:stroke-white transition-all duration-200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_694_818">
                        <rect width="22" height="22" fill="white" transform="translate(11 11)" />
                    </clipPath>
                </defs>
            </svg>
        </Link>
        <Link href={social_networks.linkedin}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="group" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="22" className="fill-primary-600/10 group-hover:fill-primary-600 transition-all duration-200" />
                <g clipPath="url(#clip0_694_823)">
                    <path d="M17.3617 15.5833C17.3615 16.0695 17.1681 16.5357 16.8241 16.8794C16.4801 17.223 16.0137 17.4159 15.5275 17.4157C15.0413 17.4154 14.575 17.2221 14.2314 16.8781C13.8877 16.5341 13.6948 16.0677 13.6951 15.5814C13.6953 15.0952 13.8887 14.629 14.2327 14.2853C14.5767 13.9417 15.0431 13.7488 15.5293 13.749C16.0155 13.7493 16.4818 13.9427 16.8254 14.2866C17.1691 14.6306 17.362 15.097 17.3617 15.5833ZM17.4167 18.7733H13.7501V30.2499H17.4167V18.7733ZM23.2101 18.7733H19.5617V30.2499H23.1734V24.2274C23.1734 20.8724 27.5459 20.5608 27.5459 24.2274V30.2499H31.1667V22.9808C31.1667 17.3249 24.6951 17.5358 23.1734 20.3133L23.2101 18.7733Z" className="fill-primary-600 group-hover:fill-white transition-all duration-200" />
                </g>
                <defs>
                    <clipPath id="clip0_694_823">
                        <rect width="22" height="22" fill="white" transform="translate(11 11)" />
                    </clipPath>
                </defs>
            </svg>
        </Link>
        <Link href={social_networks.instagram}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="group" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="22" className="fill-primary-600/10 group-hover:fill-primary-600 transition-all duration-200" />
                <g clipPath="url(#clip0_694_833)">
                    <path d="M25.6667 14.6665H18.3334C16.3084 14.6665 14.6667 16.3081 14.6667 18.3332V25.6665C14.6667 27.6915 16.3084 29.3332 18.3334 29.3332H25.6667C27.6918 29.3332 29.3334 27.6915 29.3334 25.6665V18.3332C29.3334 16.3081 27.6918 14.6665 25.6667 14.6665Z" className="stroke-primary-600 group-hover:stroke-white transition-all duration-200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 24.75C23.5188 24.75 24.75 23.5188 24.75 22C24.75 20.4812 23.5188 19.25 22 19.25C20.4812 19.25 19.25 20.4812 19.25 22C19.25 23.5188 20.4812 24.75 22 24.75Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-primary-600 group-hover:stroke-white transition-all duration-200" />
                    <path d="M26.125 17.875V17.876" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-primary-600 group-hover:stroke-white transition-all duration-200" />
                </g>
                <defs>
                    <clipPath id="clip0_694_833">
                        <rect width="22" height="22" fill="white" transform="translate(11 11)" />
                    </clipPath>
                </defs>
            </svg>
        </Link>
    </div>
}