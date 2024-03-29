import path from "path";

import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Image } from "../../../../../app/models";

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

  const data = await Image.find({
    $or: [{ photo: regex }],
  });
  total = data.length;

  const images = (
    show === "All"
      ? data
      : data.filter(
          (_, index) => (+page - 1) * +show <= index && index < +page * +show
        )
  ).map((image) => ({ ...image.toObject() }));

  return { images, total };
};

export const uploadDir = path.join(
  process.cwd(),
  "public",
  "images",
  "gallery"
);
export const resource = "images";
export const resourceConfig = {
  singular: "image",
  fields: [],
  file: { name: "photo", uploadDir },
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
      model: Image,
      cms,
      resource,
      ...resourceConfig,
    });

    if (req.method === "GET") return manage.get();
    else if (req.method === "POST") return manage.post();
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
