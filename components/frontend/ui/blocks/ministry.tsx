import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";

import { MinistryInterface } from "../../../../app/models/ministry";

type MinistryType = MinistryInterface & { _id: string; link: string };

export default function Ministry({
  name,
  link,
  description,
  photo,
}: MinistryType) {
  let [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        <div className="aspect-square overflow-hidden rounded-2xl">
          <Image
            width={1920}
            height={1920}
            src={photo!}
            alt="Image de ministère"
            className="image-cover cursor-pointer transition-all duration-700 hover:scale-[1.3]"
          />
        </div>

        <div className="mt-8 text-center font-semibold text-primary-600">
          {name}
        </div>
      </div>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center"
        >
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          {/* Full-screen container to center the panel */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-white px-4 pt-3 pb-5">
              <Dialog.Title className="mb-3 border-b border-secondary-100 pb-3 text-lg font-semibold">
                {name}
              </Dialog.Title>

              <div className="space-y-3">
                <p>
                  <Image
                    width={1920}
                    height={1920}
                    src={photo!}
                    alt="Image de ministère"
                    className="image-cover rounded-2xl"
                  />
                </p>

                <p>
                  <em>{description}</em>
                </p>

                <p className="text-center">
                  <Link href={link} className="btn btn-primary">
                    En savoir plus
                  </Link>
                </p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
}
