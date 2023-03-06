import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { FormEvent } from "react";

import Button from "../ui/form/button";

interface NewsletterFormProps {
  onSubmit: (e: FormEvent) => void;
}

export default function NewsletterForm({ onSubmit }: NewsletterFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="relative flex h-[60px] items-center rounded-[300px] bg-white py-[7px] pr-[11px] pl-[45px]">
        <div className="flex-grow">
          <input
            type="email"
            name="email"
            className="w-full border-none bg-transparent text-lg text-inherit outline-none"
            placeholder="E-mail Address"
          />
        </div>

        <div>
          <Button size="sm" icon={PaperAirplaneIcon}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
