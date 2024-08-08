"use client";
import { useEffect, useState } from "react";
import { SortBy, TableData, TableRow } from "../../types";
import axios from "axios";
import { SortHeader } from "./SortHeader";
import { sortData } from "../utils";
import {
  Table,
  TableHead,
  TableRow as MuiRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  Input,
  Link,
  createTheme,
  ThemeProvider,
  TextField,
  ButtonBase,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export interface Props {
  data: TableData;
}

/**
 * This is a React Table Implementation that uses 3rd party libraries.
 */
export const ReactTable = ({ data }: Props): JSX.Element => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [page, setPage] = useState({ number: 1, error: "" });
  const [sortBy, setSortBy] = useState<SortBy>();
  const [filteredData, setFilteredData] = useState(data);

  const onChangePage = (value: number) => {
    if (value >= 1 && value <= 50) {
      setPage({ number: value, error: "" });
    } else {
      setPage({ number: value, error: "Pages go from 1 to 50" });
    }
  };

  const increasePage = () => {
    setPage((prevState) => ({ ...prevState, number: prevState.number + 1 }));
    setSortBy(undefined); // Cleaning sort when switching pages
  };

  const decreasePage = () => {
    setPage((prevState) => ({ ...prevState, number: prevState.number - 1 }));
    setSortBy(undefined); // Cleaning sort when switching pages
  };

  const toggleSort = (key: keyof TableRow) => {
    setSortBy({
      key,
      direction: sortBy?.direction === "asc" ? "desc" : "asc",
    });
  };

  useEffect(() => {
    const fetchPageData = async () => {
      const pageData = await axios.get<TableData>(
        `http://localhost:3000/api?page=${page.number}`
      );
      setFilteredData(pageData.data);
    };
    fetchPageData();
  }, [page]);

  useEffect(() => {
    if (sortBy) {
      const sortedData = sortData(filteredData, sortBy);
      setFilteredData(sortedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box display="flex" flexDirection="column" padding={4} width="100%">
        <Box alignSelf={"center"} my={4}>
          <Typography sx={{ fontSize: 32 }}>
            React Table (made with MUI)
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" flexDirection="row" alignItems="center" gap={0.5}>
            <Typography>Skip to the page: </Typography>
            <TextField
              type="number"
              label="Page"
              variant="outlined"
              onChange={(e) => onChangePage(Number(e.target.value))}
              error={!!page.error}
              helperText={page.error}
              value={page.number}
            />
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
            {page.number > 1 && (
              <ButtonBase onClick={decreasePage}>
                <ArrowBackIosIcon />
              </ButtonBase>
            )}
            <Typography sx={{ fontSize: 32 }}>{page.number}</Typography>
            {page.number < 50 && (
              <ButtonBase onClick={increasePage}>
                <ArrowForwardIosIcon />
              </ButtonBase>
            )}
          </Box>
        </Box>
        <Table>
          <TableHead>
            <MuiRow>
              <TableCell>
                <SortHeader
                  sortBy={sortBy}
                  column="url"
                  label="URL"
                  onChangeHandler={toggleSort}
                />
              </TableCell>
              <TableCell>
                <SortHeader
                  sortBy={sortBy}
                  column="avgScrollPercentage"
                  label="Scroll"
                  onChangeHandler={toggleSort}
                />
              </TableCell>
              <TableCell>
                <SortHeader
                  sortBy={sortBy}
                  column="time"
                  label="Time"
                  onChangeHandler={toggleSort}
                />
              </TableCell>
              <TableCell>
                <SortHeader
                  sortBy={sortBy}
                  column="bounce"
                  label="Bounce"
                  onChangeHandler={toggleSort}
                />
              </TableCell>
              <TableCell>
                <SortHeader
                  sortBy={sortBy}
                  column="startsWithCount"
                  label="Enters"
                  onChangeHandler={toggleSort}
                />
              </TableCell>
              <TableCell>
                <SortHeader
                  sortBy={sortBy}
                  column="endsWithCount"
                  label="Exits"
                  onChangeHandler={toggleSort}
                />
              </TableCell>
              <TableCell>
                <SortHeader
                  sortBy={sortBy}
                  column="totalCount"
                  label="Page Views"
                  onChangeHandler={toggleSort}
                />
              </TableCell>
              <TableCell>
                <SortHeader
                  sortBy={sortBy}
                  column="totalVisitorCount"
                  label="Visitors"
                  onChangeHandler={toggleSort}
                />
              </TableCell>
            </MuiRow>
          </TableHead>
          <TableBody>
            {filteredData &&
              filteredData.map((row, idx) => {
                return (
                  <MuiRow key={`row_${idx}`}>
                    <TableCell>
                      <a href={`http://${row.url}`} target="_blank">
                        {row.url}
                      </a>
                    </TableCell>
                    <TableCell>{row.avgScrollPercentage}%</TableCell>
                    <TableCell>
                      {row.avgScrollPercentage * row.totalVisitorCount}
                    </TableCell>
                    <TableCell>
                      {Math.round((row.bounceCount * 100) / row.totalCount)}%
                    </TableCell>
                    <TableCell>{row.startsWithCount}</TableCell>
                    <TableCell>{row.endsWithCount}</TableCell>
                    <TableCell>{row.totalCount}</TableCell>
                    <TableCell>{row.totalVisitorCount}</TableCell>
                  </MuiRow>
                );
              })}
          </TableBody>
        </Table>
      </Box>
    </ThemeProvider>
  );
};
