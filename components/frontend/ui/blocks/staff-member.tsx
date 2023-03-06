import Image from "next/image";

import { StaffMemberInterface } from "../../../../app/models/staff-member";

import View from "../../../ui/view";

type StaffMemberType = StaffMemberInterface & { _id: string };

export default function StaffMember({
  name,
  title,
  description,
  photo,
}: StaffMemberType) {
  return (
    <div>
      <View
        title={name}
        action={
          <div className="cursor-pointer rounded-2xl p-3 hover:bg-secondary-50 dark:hover:bg-secondary-800">
            <div className="h-[240px]">
              <Image
                width={1920}
                height={1920}
                src={photo!}
                alt="Image du staff pastoral"
                className="image-cover rounded-2xl"
              />
            </div>

            <div className="mt-5 mb-2 font-semibold">{name}</div>

            <div className="font-semibold text-primary-600">{title}</div>
          </div>
        }
      >
        <p>
          <Image
            width={1920}
            height={1920}
            src={photo!}
            alt="Image du staff pastoral"
            className="image-cover rounded-2xl"
          />
        </p>

        <div className="mb-2 font-semibold text-primary-600">{title}</div>

        <p>{description}</p>
      </View>
    </div>
  );
}
