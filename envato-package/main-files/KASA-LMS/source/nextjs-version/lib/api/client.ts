import { staticApiRequest } from "@/lib/static-api";

type Method = "GET" | "POST" | "PATCH" | "DELETE";

async function request<T>(
  endpoint: string,
  method: Method,
  body?: unknown,
  options: RequestInit = {},
): Promise<T> {
  void options;
  return staticApiRequest<T>(endpoint, method, body);
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, "GET", undefined, options),

  post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, "POST", body, options),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, "PATCH", body, options),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, "DELETE", undefined, options),
};

export const withAuthRetry = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message.toLowerCase().includes("unauthorized")
    ) {
      try {
        await apiClient.post("/api/auth/refresh-tokens");

        return await fn();
      } catch (refreshError) {
        throw refreshError;
      }
    }

    throw error;
  }
};
