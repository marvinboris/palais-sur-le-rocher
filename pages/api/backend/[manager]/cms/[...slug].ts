import { existsSync, unlinkSync } from "fs";
import path from "path";

import formidable from "formidable";
import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import tinify from "tinify";

import { message } from "../../../../../app/helpers/utils";

import handleRequest, { Fields } from "../../../../../lib/formidable";
import {
  getCms,
  handleError,
  methodNotAllowed,
  setCms,
} from "../../../../../lib/utils";

type FileObject = { [key: string]: string | formidable.File | FileObject };
const flatten = (obj: FileObject, example: FileObject): string | FileObject => {
  const result: FileObject = {};
  for (const key in obj) {
    const value = obj[key];
    if (value instanceof formidable.File) {
      if ((<formidable.File>value).size > 0) {
        const fileName = path.join(
          process.cwd(),
          "public",
          "images",
          (<formidable.File>value).newFilename
        );

        if (existsSync(fileName)) tinify.fromFile(fileName).toFile(fileName);
        result[key] = `/images/${(<formidable.File>value).newFilename}`;
      } else {
        if (existsSync((<formidable.File>value).filepath))
          unlinkSync((<formidable.File>value).filepath);
        if (key in example) result[key] = example[key];
      }
    } else
      result[key] = flatten(value as FileObject, example[key] as FileObject);
  }
  return result;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown | { error: string }>
) {
  // const type = req.query.manager as string
  const slug = req.query.slug as string[];

  tinify.key = process.env.TINIFY_KEY!;
  try {
    const cms = getCms();
    const cmsExample = getCms(true);
    // const manager = await getAccount(req)

    if (req.method === "PATCH") {
      const { fields, files } = await handleRequest(req, {
        uploadDir: path.join(process.cwd(), "public", "images"),
      });

      const key = slug[0];

      cms[key] = {
        ...cms[key],
        ...(<{ [key: string]: Fields }>fields)[key],
        ...(<{ [key: string]: FileObject }>flatten(files as FileObject, cms))[
          key
        ],
      };

      setCms(cms);

      res.json({
        cms,
        cmsExample,
        message: message(cms.backend.messages.cms.updated, "success"),
      });
    } else methodNotAllowed(req, res);
  } catch (error) {
    handleError(res, error);
  }
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
