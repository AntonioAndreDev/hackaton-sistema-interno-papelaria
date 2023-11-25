"use client";
import { useEffect, useState } from "react";
import TableOfProducts from "@/app/components/Table/TableOfProducts";

export default function ListaDeProdutos() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShouldRender(true);
    }
  }, []);

  return <div>{shouldRender && <TableOfProducts />}</div>;
}
