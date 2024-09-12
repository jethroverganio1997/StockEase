"use client";

import React from "react";
import { Button } from "../../../components/ui/button";
import { createProduct } from "../../../features/inventory/actions/product-action";

export default function AuthTest() {
  const [result, setResult] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  function onCreateProduct() {
    setResult(undefined);
    setLoading(true);
    createProduct()
      .then((res) => setResult(res))
      .catch((err) => setResult(err))
      .finally(() => setLoading(false));
  }

  return (
    <div className="space-y-4">
      <Button onClick={() => onCreateProduct()}>Auth Test</Button>
      {loading ? <div>loading....</div> : <p>{JSON.stringify(result)}</p>}
    </div>
  );
}
