import { MouseEvent } from "react";
import { SortBy, TableRow } from "../../types";
import { SortIcon } from "./SortIcon";

export interface ISortHeaderProps {
  sortBy?: SortBy;
  label: string;
  column: keyof TableRow | "bounce" | "time";
  onChangeHandler: any;
}

export const SortHeader = ({
  sortBy,
  label,
  column,
  onChangeHandler,
}: ISortHeaderProps): JSX.Element | null => {
  const processClick = (e: MouseEvent<HTMLAnchorElement, any>) => {
    e.preventDefault();
    e.stopPropagation();
    onChangeHandler(column);
  };

  return (
    <div className="sort-header">
      <a href="/" onClick={(e) => processClick(e)}>
        {label}
      </a>
      {sortBy?.key === column && <SortIcon direction={sortBy.direction} />}
    </div>
  );
};
