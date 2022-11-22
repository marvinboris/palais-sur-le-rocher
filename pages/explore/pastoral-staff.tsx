import Image from 'next/image';
import { ReactElement } from 'react'

import { StaffMember } from '../../app/models';
import { StaffMemberInterface } from '../../app/models/staff-member';

import Layout, { Head } from "../../components/frontend/navigation/layout";
import StaffMemberBlock from '../../components/frontend/ui/blocks/staff-member';

type StaffMemberType = StaffMemberInterface & { _id: string }

const params = {
    link: '/explore/pastoral-staff',
    title: "Palais sur le Rocher | Staff pastoral",
    description: "Retrouvez les leaders de notre commission."
}

interface PastoralStaffPageProps {
    pastoralStaff: {
        principals: StaffMemberType[]
        staff: StaffMemberType[]
    }
}

const PastoralStaffPage = ({ pastoralStaff }: PastoralStaffPageProps) => {
    const renderStaffMember = (staffMember: StaffMemberType, index: number) => <StaffMemberBlock key={`staff-member-${staffMember.name}-${index}`} {...staffMember} />

    const principalsContent = pastoralStaff.principals.map(renderStaffMember)
    const staffContent = pastoralStaff.staff.map(renderStaffMember)

    return <>
        <Head {...params} />
        <main id="explore-pastoral-staff" className="page-main">
            <header className='relative'>
                <div className="bg-img">
                    <Image width={1920} height={1920} src="/images/tony-eight-media-iy34kwDyJ4E-unsplash.jpg" alt="A propos" className="image-cover" />
                </div>

                <div className="container text-secondary-50 relative z-10">
                    <p className="text-xs sm:text-sm uppercase">Explorer</p>

                    <h1 className="text-4xl md:text-6xl font-extrabold">Staff pastoral</h1>

                    <p className="text-xs sm:text-sm mt-8">{params.description}</p>
                </div>
            </header>

            <section className="section">
                <div className="container space-y-4">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {principalsContent}
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {staffContent}
                    </div>
                </div>
            </section>
        </main>
    </>
}

PastoralStaffPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>
        {page}
    </Layout>
}

export async function getServerSideProps() {
    const staffMembers = await StaffMember.find()

    const pastoralStaff = JSON.parse(JSON.stringify({
        principals: staffMembers.filter(member => member.principal).map(member => member.toObject()),
        staff: staffMembers.filter(member => !member.principal).map(member => member.toObject())
    }))
    return { props: { pastoralStaff } }
}

export default PastoralStaffPage