import * as React from "react";

interface ISortIconProps {
  direction: "asc" | "desc";
}

export const SortIcon = ({ direction }: ISortIconProps): JSX.Element => {
  return (
    <div>{direction === "asc" ? <span>&uarr;</span> : <span>&darr;</span>}</div>
  );
};
