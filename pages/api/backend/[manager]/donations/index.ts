import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Donation } from "../../../../../app/models";
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

  const data = await Donation.find({
    $or: [
      {
        // 'method.name': regex,
      },
    ],
  }).populate<{ method: MethodInterface }>("method");
  total = data.length;

  const donations = (
    show === "All"
      ? data
      : data.filter(
          (_, index) => (+page - 1) * +show <= index && index < +page * +show
        )
  ).map((donation) => ({
    ...donation.toObject(),
    method: donation.method ? donation.method.name : "",
  }));

  return { donations, total };
};

export const resource = "donations";
export const resourceConfig = {
  singular: "donation",
  fields: ["method", "amount"],
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
      model: Donation,
      cms,
      resource,
      ...resourceConfig,
    });

    if (req.method === "GET") return manage.get();
    else if (req.method === "POST")
      return manage.post({
        validate: {
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
