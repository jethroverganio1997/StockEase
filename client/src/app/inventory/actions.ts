"use server";

import { apiClient } from "../../lib/api-client";
import { ApiResponse, PagedResult, Product } from "./types";

export async function getData(
  query?: string
): Promise<ApiResponse<PagedResult<Product[]>>> {
  console.log("query", query);
  return await apiClient.post(`search${query}`);
}
