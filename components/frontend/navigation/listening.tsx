import { useLessonContext } from "../../../app/contexts/lesson";

import Listen from "../ui/blocks/listen";

export default function Listening() {
  const { lesson } = useLessonContext();

  return (
    <div id="listening" className="sticky bottom-0 z-30">
      {lesson && <Listen {...lesson} />}
    </div>
  );
}
