import React, { type ReactNode } from 'react'

import { classNames } from '../../../../app/helpers/utils'
import Status from '../../../../app/types/enums/status'

type ButtonProps = React.ComponentProps<'button'> & {
    color?: string
    size?: '' | 'sm' | 'lg' | 'xl'
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element
    children: ReactNode,
    onClick?: () => void
    status?: Status
}

export default function Button({ color = 'primary', size = '', icon, children, status, onClick }: ButtonProps) {
    const Icon = icon

    return <button onClick={onClick} className={classNames(`btn btn-${color} relative group`, icon ? 'btn-icon' : 'px-6', size === 'sm' ? 'h-10 px-4' : '')}>
        <span className={classNames(size === 'sm' ? '' : 'font-bold mr-2')}>{status ? <>
            <div className={classNames(status === Status.LOADING ? 'opacity-100' : 'opacity-0', 'w-8 h-8 rounded-full border-[2px] absolute z-0 top-1/2 left-1/2 -ml-4 -mt-4 border-t-transparent border-white animate-spin transition-all duration-200')} />
            <div className={classNames(status === Status.LOADING ? 'opacity-0' : 'opacity-100', 'relative z-10')}>{children}</div>
        </> : children}</span>

        {Icon && <span className={classNames(status && status === Status.LOADING ? 'opacity-0' : 'opacity-100', 'inline-flex items-center transition-all duration-200')}>
            {size !== 'sm' && <div>
                <div className={classNames(color === 'white' ? "bg-primary-600/40" : "bg-white/40", "w-1 h-1 rounded-full mr-[5px]")} />
            </div>}

            <div>
                <Icon className={classNames(color === 'white' ? "text-primary-600/40 group-hover:text-primary-600" : "text-white/40 group-hover:text-white", 'w-6 transition-all duration-200')} />
            </div>
        </span>}
    </button>
}