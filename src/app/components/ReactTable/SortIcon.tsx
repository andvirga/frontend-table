import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface ISortIconProps {
  direction: "asc" | "desc";
}

export const SortIcon = ({ direction }: ISortIconProps): JSX.Element => {
  return (
    <>
      {direction === "asc" ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      )}
    </>
  );
};
