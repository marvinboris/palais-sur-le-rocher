import path from "path";

import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Lesson } from "../../../../../app/models";

import {
  getCms,
  handleError,
  methodNotAllowed,
} from "../../../../../lib/utils";
import { manageResource } from "../../../../../lib/utils/resource";

export const data = async (req: NextApiRequest) => {
  const { page = 1, show = 10, search = "" } = req.query;
  let total = 0;

  const regex = new RegExp(search as string, "i");

  const data = await Lesson.find({
    $or: [{ description: regex }, { subtitle: regex }, { notes: regex }],
  });
  total = data.length;

  const lessons = (
    show === "All"
      ? data
      : data.filter(
          (_, index) => (+page - 1) * +show <= index && index < +page * +show
        )
  ).map((lesson) => ({ ...lesson.toObject() }));

  return { lessons, total };
};

export const uploadDir = path.join(
  process.cwd(),
  "public",
  "audios",
  "lessons"
);
export const resource = "lessons";
export const resourceConfig = {
  singular: "lesson",
  fields: ["episode", "date", "description", "subtitle", "notes", "isActive"],
  file: { name: "audio", uploadDir },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown | { error: string }>
) {
  // const type = req.query.manager as string

  try {
    const cms = getCms();
    // const manager = await getAccount(req)
    const manage = manageResource(req, res, {
      data,
      model: Lesson,
      cms,
      resource,
      ...resourceConfig,
    });

    if (req.method === "GET") return manage.get();
    else if (req.method === "POST")
      return manage.post({
        validate: {
          episode: { isNumeric: true },
          date: { required: true },
          description: { required: true },
          subtitle: { required: true },
          notes: { required: true },
        },
      });
    else methodNotAllowed(req, res);
  } catch (error) {
    handleError(res, error);
  }
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
