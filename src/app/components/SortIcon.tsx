import { MouseEvent } from "react";
import { TableRow } from "../types";

type SortBy = {
  key: keyof TableRow;
  direction: "asc" | "desc";
};

export interface ISortIconProps {
  sortBy: SortBy;
  column: keyof TableRow;
  onChangeHandler: any;
}

export const SortIcon = ({
  sortBy,
  column,
  onChangeHandler,
}: ISortIconProps): JSX.Element | null => {
  if (column !== sortBy.key) return null;

  const processClick = (e: MouseEvent<HTMLAnchorElement, any>) => {
    e.preventDefault();
    e.stopPropagation();
    onChangeHandler(column);
  };

  return (
    <div>
      <a href="/" onClick={(e) => processClick(e)}>
        {sortBy.direction === "asc" ? "ASC" : "DSC"}
      </a>
    </div>
  );
};
