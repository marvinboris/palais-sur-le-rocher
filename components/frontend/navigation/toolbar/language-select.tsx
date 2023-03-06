import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

import { useLanguageContext } from "../../../../app/contexts/language";
import Image from "next/image";

export default function LanguageSelect() {
  const { language, setLanguage, languages } = useLanguageContext();

  const selected = language!;

  return language === null ? (
    <></>
  ) : (
    <div className="w-full">
      <Listbox value={selected} onChange={setLanguage}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default text-left sm:text-sm">
            {selected && (
              <div className="flex w-[108px] cursor-pointer items-center rounded-full bg-secondary-100 py-[5px] pl-[6px] md:w-36 md:py-[7px] md:pl-[9px]">
                <div className="mr-2">
                  <div className="relative h-[23px] w-[23px] rounded-full md:h-8 md:w-8">
                    <Image
                      fill
                      src={`/images/flags/1x1/${selected.flag}.svg`}
                      alt="Flag"
                      className="rounded-full"
                    />
                  </div>
                </div>

                <div className="mr-3 text-xs font-medium md:text-base">
                  {selected.name}
                </div>

                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDownIcon
                    className="h-5 w-5 text-secondary-400"
                    aria-hidden="true"
                  />
                </span>
              </div>
            )}
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm md:text-base">
              {languages
                ?.filter((l) => l.abbr !== selected.abbr)
                .map((l, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none p-2 ${
                        active
                          ? "bg-primary-600-100 text-primary-600-900"
                          : "text-secondary-900"
                      }`
                    }
                    value={l}
                  >
                    {({ selected }) => (
                      <>
                        <div className="flex items-center">
                          <div className="mr-[5.55px]">
                            <div className="relative h-[19.42px] w-[19.42px]">
                              <Image
                                fill
                                src={`/images/flags/1x1/${l.flag}.svg`}
                                alt="Flag"
                                className="rounded-full"
                              />
                            </div>
                          </div>

                          <div
                            className={`truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {l.name}
                          </div>
                        </div>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
