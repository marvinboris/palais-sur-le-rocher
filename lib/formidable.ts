import formidable from "formidable";
import { NextApiRequest } from "next";

export type Fields =
  | formidable.Fields
  | { [key: string]: formidable.Fields | Fields };
export type Files =
  | formidable.Files
  | { [key: string]: formidable.Files | Files };

const formidableConfig = {
  keepExtensions: true,
  maxFileSize: 10_000_000,
  maxFieldsSize: 10_000_000,
  maxFields: 20000,
  allowEmptyFiles: true,
  multiples: false,
};

const formidablePromise = (
  req: NextApiRequest,
  opts?: Parameters<typeof formidable>[0]
): Promise<{ fields: formidable.Fields; files: formidable.Files }> =>
  new Promise((accept, reject) => {
    const form = formidable(opts);

    form.parse(req, (err, fields, files) =>
      err ? reject(err) : accept({ fields, files })
    );
  });

const format = (obj: formidable.Fields | formidable.Files) => {
  let result: Fields | Files = {};
  for (const key in obj) {
    const value = obj[key];
    const keys = key.split("[").map((x) => x.replace("]", ""));
    let current: any = result;
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (i === keys.length - 1) {
        if (!current[k]) current[k] = {};
        current[k] = value;
      } else {
        if (
          i === keys.length - 2 &&
          Number.isInteger(+keys[i + 1]) &&
          !Array.isArray(current[k])
        )
          current[k] = [];
        else if (!current[k]) current[k] = {};
        current = current[k];
      }
    }
  }
  return result;
};

export default async function handleRequest(
  req: NextApiRequest,
  opts?: formidable.Options
) {
  const { fields, files } = await formidablePromise(req, {
    ...formidableConfig,
    ...opts,
  });

  return { fields: <Fields>format(fields), files: <Files>format(files) };
}
