"use server";

import { apiClient } from "@/lib/api-client";
import { ApiResponse, PagedResult } from "@/types";
import { Product } from "../(types)/product";

export async function searchProducts(
  query?: string
): Promise<ApiResponse<PagedResult<Product[]>>> {
  return await apiClient.post(`search${query}`);
}
