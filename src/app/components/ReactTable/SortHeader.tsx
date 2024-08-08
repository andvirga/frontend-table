import { SortBy, TableRow } from "../../types";
import { SortIcon } from "./SortIcon";
import { Box, ButtonBase, Typography } from "@mui/material";

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
  const processClick = () => {
    onChangeHandler(column);
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap={0.5}>
      <ButtonBase onClick={processClick}>
        <Typography
          sx={{ fontSize: 16, textTransform: "uppercase", fontWeight: 500 }}
        >
          {label}
        </Typography>
      </ButtonBase>
      {sortBy?.key === column && <SortIcon direction={sortBy.direction} />}
    </Box>
  );
};
