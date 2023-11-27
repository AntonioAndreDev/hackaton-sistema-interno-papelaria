import React from "react";
import { Tooltip, Button } from "@nextui-org/react";

export default function TooltipComponent({ text, onClick, position, subText }) {
  return (
    <div className="flex flex-wrap gap-4">
      <Tooltip
        key={"primary"}
        color={"primary"}
        content={subText}
        className="capitalize"
        placement={position}
      >
        <Button onClick={onClick} variant="flat" color={"primary"} className="capitalize w-full">
          {text}
        </Button>
      </Tooltip>
    </div>
  );
}
