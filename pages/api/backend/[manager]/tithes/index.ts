import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Tithe } from "../../../../../app/models";
import { MemberInterface } from "../../../../../app/models/member";
import { MethodInterface } from "../../../../../app/models/method";

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

  const data = await Tithe.find({
    $or: [
      {
        // "member.firstName": regex,
        // "member.lastName": regex,
        // "method.name": regex,
      },
    ],
  }).populate<{ method: MethodInterface; member: MemberInterface }>([
    "method",
    "member",
  ]);
  total = data.length;

  const tithes = (
    show === "All"
      ? data
      : data.filter(
          (_, index) => (+page - 1) * +show <= index && index < +page * +show
        )
  ).map((tithe) => ({
    ...tithe.toObject(),
    member: tithe.member.name,
    method: tithe.method.name,
  }));

  return { tithes, total };
};

export const resource = "tithes";
export const resourceConfig = {
  singular: "tithe",
  fields: ["method", "member", "amount"],
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
      model: Tithe,
      cms,
      resource,
      ...resourceConfig,
    });

    if (req.method === "GET") return manage.get();
    else if (req.method === "POST")
      return manage.post({
        validate: {
          member: { required: true },
          method: { required: true },
          amount: { required: true, isNumeric: true },
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
