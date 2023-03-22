import { existsSync, unlinkSync } from "fs";
import path from "path";

import { File } from "formidable";
import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import tinify from "tinify";

import { message } from "../../../../app/helpers/utils";

import { RoleInterface } from "../../../../app/models/role";
import { FeatureInterface } from "../../../../app/models/feature";

import handleRequest from "../../../../lib/formidable";
import { getAccount, getCms, handleError } from "../../../../lib/utils";
import { NotificationInterface } from "../../../../app/models/notification";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown | { error: string }>
) {
  tinify.key = process.env.TINIFY_KEY!;
  try {
    const cms = getCms();
    const manager = await getAccount(req);

    if (!manager)
      return res.status(401).json({
        message: message(cms.backend.messages.settings.failure, "danger"),
      });

    const { fields, files } = await handleRequest(req, {
      uploadDir: path.join(
        process.cwd(),
        "public",
        "images",
        "role" in manager ? "users" : "admins"
      ),
    });

    for (const key in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, key)) {
        const value = fields[key];
        if (value !== "" && key !== "_method")
          (<any>manager)[key] = <string>value;
      }
    }

    for (const key in files) {
      if (Object.prototype.hasOwnProperty.call(files, key)) {
        const file = files[key];
        if ((<File>file).size > 0) {
          const fileName = path.join(
            process.cwd(),
            "public",
            "images",
            "role" in manager ? "users" : "admins",
            (<File>file).newFilename
          );

          if (existsSync(fileName)) tinify.fromFile(fileName).toFile(fileName);
          (<any>manager)[key] = (<File>file).newFilename;
        } else if (existsSync((<File>file).filepath))
          unlinkSync((<File>file).filepath);
      }
    }

    await manager.save();

    let data;
    if ("role" in manager) {
      const account = await manager.populate<{
        role: RoleInterface & { features: { feature: FeatureInterface }[] };
      }>({
        path: "role",
        populate: { path: "features.feature" },
      });

      const features: {
        _id: Types.ObjectId;
        prefix: string;
        access: string[];
      }[] = [];
      account.role.features.forEach((feature) => {
        if (
          feature.feature == null ||
          feature.feature instanceof Types.ObjectId
        ) {
          throw new Error("User.role.features.feature should be populated");
        } else if ("prefix" in feature.feature)
          features.push({
            _id: feature.feature._id!,
            prefix: feature.feature.prefix,
            access: feature.access,
          });
      });

      data = {
        ...account.toObject(),
        role: { ...account.toObject().role, features },
      };
    } else data = manager;

    res.json({
      data,
      message: message(cms.backend.messages.settings.success, "success"),
    });
  } catch (error) {
    handleError(res, error);
  }
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
