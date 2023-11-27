import React from "react";
import { Tooltip, Button } from "@nextui-org/react";

export default function TooltipComponent({ text, onClick }) {
  return (
    <div className="flex flex-wrap gap-4">
      <Tooltip
        key={"primary"}
        color={"primary"}
        content={"Clique para carregar produto"}
        className="capitalize"
        placement="right"
      >
        <Button onClick={onClick} variant="flat" color={"primary"} className="capitalize w-full">
          {text}
        </Button>
      </Tooltip>
    </div>
  );
}
