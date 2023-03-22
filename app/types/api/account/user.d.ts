import { NotificationInterface } from "../../../models/notification";
import { UserInterface } from "../../../models/user";

type ApiAccountUserType = UserInterface & {
  role: {
    features: { _id: Types.ObjectId; prefix: string; access: string[] }[];
  };
  notifications: {
    notification: Types.ObjectId;
    readAt?: Date;
  }[];
};

export default ApiAccountUserType;
