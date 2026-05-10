import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";
import { staticApiRequest } from "@/lib/static-api";

export const getSession = async (): Promise<User | null> => {
  try {
    const data = await staticApiRequest<ApiResponse<User>>(
      "/auth/profile",
      "GET",
    );
    return data.data;
  } catch {
    return null;
  }
};
