import { FC } from "react";

import { useContentContext } from "../../../../app/contexts/content";
import { classNames } from "../../../../app/helpers/utils";

export default function Status({ value }: { value: boolean }) {
    const { content } = useContentContext()
    const { cms: { backend: { components: { form: { active, inactive } } } } } = content!

    return <span className={classNames("py-1 px-3 rounded font-medium", value ? 'bg-green/10 text-green' : 'bg-red/10 text-red')}>{value ? active : inactive}</span>
}