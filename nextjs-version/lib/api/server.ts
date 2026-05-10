import { staticApiRequest } from "@/lib/static-api";

type Method = "GET" | "POST" | "PATCH" | "DELETE";

async function request<T>(
  url: string,
  method: Method,
  body?: unknown,
  options: RequestInit = {},
): Promise<T> {
  void options;
  return staticApiRequest<T>(url, method, body);
}

// 🔥 ALL METHODS IN SAME FILE

export const apiServer = {
  get: <T>(url: string, options?: RequestInit) =>
    request<T>(url, "GET", undefined, options),

  post: <T>(url: string, body?: unknown, options?: RequestInit) =>
    request<T>(url, "POST", body, options),

  patch: <T>(url: string, body?: unknown, options?: RequestInit) =>
    request<T>(url, "PATCH", body, options),

  delete: <T>(url: string, options?: RequestInit) =>
    request<T>(url, "DELETE", undefined, options),
};
