import { IMainApi } from "@/app/_model/axiosInstance.model";
import { MAIN_API } from "../../_config/config";

import axios from "axios";
import { cookies } from "next/headers";

export default function ssrMainApi(token1?: string) {
  const token = token1 || cookies().get("aauth")?.value || "0";
  return axios.create({
    baseURL: MAIN_API,
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + token,
    },
  }) as IMainApi;
}
