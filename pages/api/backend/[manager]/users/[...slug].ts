import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { data, resource, resourceConfig } from ".";

import { message } from "../../../../../app/helpers/utils";
import { Role, User } from "../../../../../app/models";

import {
  getCms,
  handleError,
  methodNotAllowed,
} from "../../../../../lib/utils";
import { manageResource } from "../../../../../lib/utils/resource";

const information = async () => {
  const roles = await Role.find();
  return { roles };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown | { error: string }>
) {
  // const type = req.query.manager as string
  const slug = req.query.slug as string[];

  try {
    const cms = getCms();
    // const manager = await getAccount(req)
    const manage = manageResource(req, res, {
      data,
      information,
      model: User,
      cms,
      slug,
      resource,
      ...resourceConfig,
    });

    if (req.method === "GET") {
      if (slug[0] === "info") return manage.info();
      else
        return manage.show({
          keys: {
            password: () => "",
          },
        });
    } else if (req.method === "PATCH")
      return manage.patch({
        validate: {
          name: { required: true },
          email: { required: true, isEmail: true },
          phone: { required: true },
          role: { required: true },
        },
        fields: {
          phone: (fields) => fields.phone,
          password: async (fields) =>
            fields.password
              ? await bcrypt.hash(fields.password as string, 12)
              : undefined,
        },
      });
    else if (req.method === "DELETE") return manage.delete();
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
