import React from "react";
import { Snippet } from "@nextui-org/react";

export default function Copy({ textToCopy }) {
  return (
    <div className="flex flex-wrap gap-4">
      <Snippet variant="bordered">{textToCopy}</Snippet>
    </div>
  );
}
