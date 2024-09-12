"use server";

import { apiClient } from "@/lib/api-client";
import { ApiResponse, PagedResult } from "@/types";
import { Product } from "../types/product";
import { auth } from "../../auth/auth";

export async function searchProducts(
  query?: string
): Promise<ApiResponse<PagedResult<Product[]>>> {
  return await apiClient.post(`search${query}`);
}


export async function createProduct() {

  var session = await auth();

  var response = await fetch('http://localhost:6001/products/0e685100-7d84-4ff2-9916-6a71b51f513d',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.accessToken}`
    },
  })

  if(!response.ok) {
    const errorResponse = await response.json();
    console.log('Error Response:', errorResponse);
    return {status: response.status, message: response.statusText}
  }

  return response.json();
}