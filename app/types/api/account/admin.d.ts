import { Types } from "mongoose";
import { AdminInterface } from "../../../models/admin";
import { NotificationInterface } from "../../../models/notification";

type ApiAccountAdminType = AdminInterface & {
  notifications: {
    notification: Types.ObjectId;
    readAt?: Date;
  }[];
};

export default ApiAccountAdminType;
