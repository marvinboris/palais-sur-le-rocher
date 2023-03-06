import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { data, resource, resourceConfig } from ".";

import { StaffMember } from "../../../../../app/models";

import {
  getCms,
  handleError,
  methodNotAllowed,
} from "../../../../../lib/utils";
import { manageResource } from "../../../../../lib/utils/resource";

const information = async () => {
  return {};
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
      model: StaffMember,
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
            isActive: (keys) => (keys.isActive ? "1" : "0"),
          },
        });
    } else if (req.method === "PATCH")
      return manage.patch({
        validate: {
          name: { required: true },
          title: { required: true },
          description: { required: true },
        },
        fields: {
          isActive: (fields) => fields.isActive == "1",
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
