import axios from "axios";

import ApiAccountAdminType from "../../app/types/api/account/admin";
import ApiAccountUserType from "../../app/types/api/account/user";
import ApiMessageType from "../../app/types/api/message";

export const getCheck = async () => {
  const res = await axios.get<{
    role: string;
    data: ApiAccountAdminType | ApiAccountUserType | ApiMessageType;
  }>("/api/account");
  return res.data;
};

// Login
export const postUserLogin = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axios.post<{
    token: string;
    expiresAt: number;
    data: ApiAccountUserType | ApiMessageType;
  }>("/api/auth/user/login", data);
  return res.data;
};

// Settings
export const patchUserSettings = async (data: {
  password: string;
  password_confirmation: string;
  name: string;
  email: string;
  photo?: string;
  phone: string;
  locale: string;
}) => {
  const res = await axios.post<{
    data: ApiAccountUserType | ApiMessageType;
  }>("/api/backend/user/settings", data);
  return res.data;
};
