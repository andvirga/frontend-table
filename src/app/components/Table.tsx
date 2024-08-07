"use client";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { TableData, TableRow } from "../types";
import axios from "axios";
import { SortIcon } from "./SortIcon";

type SortBy = {
  key: keyof TableRow;
  direction: "asc" | "desc";
};

export interface Props {
  data: TableData;
}

export const PureTable = ({ data }: Props): JSX.Element => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>({
    key: "url",
    direction: "asc",
  });
  const [filteredData, setFilteredData] = useState(data);

  const increasePage = (e: MouseEvent<HTMLAnchorElement, any>) => {
    e.preventDefault();
    e.stopPropagation();
    setPage((prevState) => prevState + 1);
  };

  const decreasePage = (e: MouseEvent<HTMLAnchorElement, any>) => {
    e.preventDefault();
    e.stopPropagation();
    setPage((prevState) => prevState - 1);
  };

  const toggleSort = (key: keyof TableRow) => {
    setSortBy({
      key,
      direction: sortBy.direction === "asc" ? "desc" : "asc",
    });
  };

  useEffect(() => {
    const fetchPageData = async () => {
      const pageData = await axios.get<TableData>(
        `http://localhost:3000/api?page=${page}`
      );
      setFilteredData(pageData.data);
    };
    fetchPageData();
  }, [page]);

  useEffect(() => {
    if (sortBy) {
      console.log(">>> sortBy", sortBy);
      const sortedData = [...filteredData].sort((a, b) => {
        if (a[sortBy.key] < b[sortBy.key])
          return sortBy?.direction === "asc" ? -1 : 1;
        if (a[sortBy.key] > b[sortBy.key])
          return sortBy?.direction === "asc" ? 1 : -1;
        return 0;
      });

      console.log(">>> filteredData", filteredData);
      console.log(">>> sortedData", sortedData);

      setFilteredData(sortedData);
    }
  }, [sortBy]);

  return (
    <div className="table-container">
      <div className="paginator-wrapper">
        <div className="paginator">
          <p>Skip to the page: </p>
          <input
            type="number"
            className="skip-to-page-input"
            onChange={(e) => setPage(Number(e.target.value))}
            value={page}
          />
        </div>
        <div className="paginator">
          {page > 1 && (
            <a href="/" onClick={(e) => decreasePage(e)}>
              &lt;
            </a>
          )}
          <p>
            <b>{page}</b>
          </p>
          {page < 50 && (
            <a href="/" onClick={(e) => increasePage(e)}>
              &gt;
            </a>
          )}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              URL
              {sortBy && (
                <SortIcon
                  sortBy={sortBy}
                  column="url"
                  onChangeHandler={toggleSort}
                />
              )}
            </th>
            <th>
              Scroll
              {sortBy && (
                <SortIcon
                  sortBy={sortBy}
                  column="totalCount"
                  onChangeHandler={toggleSort}
                />
              )}
            </th>
            <th>
              Time
              {sortBy && (
                <SortIcon
                  sortBy={sortBy}
                  column="totalCount"
                  onChangeHandler={toggleSort}
                />
              )}
            </th>
            <th>
              Bounce
              {sortBy && (
                <SortIcon
                  sortBy={sortBy}
                  column="totalCount"
                  onChangeHandler={toggleSort}
                />
              )}
            </th>
            <th>
              Enters
              {sortBy && (
                <SortIcon
                  sortBy={sortBy}
                  column="totalCount"
                  onChangeHandler={toggleSort}
                />
              )}
            </th>
            <th>
              Exits
              {sortBy && (
                <SortIcon
                  sortBy={sortBy}
                  column="totalCount"
                  onChangeHandler={toggleSort}
                />
              )}
            </th>
            <th>
              Page Views
              {sortBy && (
                <SortIcon
                  sortBy={sortBy}
                  column="totalCount"
                  onChangeHandler={toggleSort}
                />
              )}
            </th>
            <th>
              Visitors
              {sortBy && (
                <SortIcon
                  sortBy={sortBy}
                  column="totalCount"
                  onChangeHandler={toggleSort}
                />
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData &&
            filteredData.map((row, idx) => {
              return (
                <tr key={`row_${idx}`}>
                  <td>{row.url}</td>
                  <td>{row.avgScrollPercentage}%</td>
                  <td>{row.avgScrollPercentage * row.totalVisitorCount}</td>
                  <td>
                    {Math.round((row.bounceCount * 100) / row.totalCount)}%
                  </td>
                  <td>{row.startsWithCount}</td>
                  <td>{row.endsWithCount}</td>
                  <td>{row.totalCount}</td>
                  <td>{row.totalVisitorCount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
