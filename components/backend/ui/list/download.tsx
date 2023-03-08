import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";

import Button from "../form/button";

export default function Download({ href = "#" }) {
  return (
    <a href={href} download>
      <Button size="sm" justify="center" color="night">
        <ArrowDownOnSquareIcon className="w-5" />
      </Button>
    </a>
  );
}
