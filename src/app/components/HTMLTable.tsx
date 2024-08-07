"use client";
import { MouseEvent, useEffect, useState } from "react";
import { SortBy, TableData, TableRow } from "../types";
import axios from "axios";
import { SortHeader } from "./SortHeader";
import { sortData } from "./utils";

export interface Props {
  data: TableData;
}

/**
 * This is a pure Table HTML Implementation using no 3rd party libraries.
 */
export const HTMLTable = ({ data }: Props): JSX.Element => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>();
  const [filteredData, setFilteredData] = useState(data);

  const increasePage = (e: MouseEvent<HTMLAnchorElement, any>) => {
    e.preventDefault();
    e.stopPropagation();
    setPage((prevState) => prevState + 1);
    setSortBy(undefined); // Cleaning sort when switcing pages
  };

  const decreasePage = (e: MouseEvent<HTMLAnchorElement, any>) => {
    e.preventDefault();
    e.stopPropagation();
    setPage((prevState) => prevState - 1);
    setSortBy(undefined); // Cleaning sort when switcing pages
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
        `http://localhost:3000/api?page=${page}`
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
              <SortHeader
                sortBy={sortBy}
                column="url"
                label="URL"
                onChangeHandler={toggleSort}
              />
            </th>
            <th>
              <SortHeader
                sortBy={sortBy}
                column="avgScrollPercentage"
                label="Scroll"
                onChangeHandler={toggleSort}
              />
            </th>
            <th>
              <SortHeader
                sortBy={sortBy}
                column="time"
                label="Time"
                onChangeHandler={toggleSort}
              />
            </th>
            <th>
              <SortHeader
                sortBy={sortBy}
                column="bounce"
                label="Bounce"
                onChangeHandler={toggleSort}
              />
            </th>
            <th>
              <SortHeader
                sortBy={sortBy}
                column="startsWithCount"
                label="Enters"
                onChangeHandler={toggleSort}
              />
            </th>
            <th>
              <SortHeader
                sortBy={sortBy}
                column="endsWithCount"
                label="Exits"
                onChangeHandler={toggleSort}
              />
            </th>
            <th>
              <SortHeader
                sortBy={sortBy}
                column="totalCount"
                label="Page Views"
                onChangeHandler={toggleSort}
              />
            </th>
            <th>
              <SortHeader
                sortBy={sortBy}
                column="totalVisitorCount"
                label="Visitors"
                onChangeHandler={toggleSort}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData &&
            filteredData.map((row, idx) => {
              return (
                <tr key={`row_${idx}`}>
                  <td>
                    <a href={`http://${row.url}`} target="_blank">
                      {row.url}
                    </a>
                  </td>
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
