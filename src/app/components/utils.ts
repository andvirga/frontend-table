import { SortBy, TableData } from "../types";

export const sortData = (filteredData: TableData, sortBy: SortBy) => {
    const sortedData = [...filteredData].sort((a, b) => {
        if (sortBy.key === "bounce") {
          const firstValue = (a["bounceCount"] * 100) / a["totalCount"];
          const secondValue = (b["bounceCount"] * 100) / b["totalCount"];
          if (firstValue < secondValue)
            return sortBy?.direction === "asc" ? -1 : 1;
          if (firstValue > secondValue)
            return sortBy?.direction === "asc" ? 1 : -1;
          return 0;
        }

        if (sortBy.key === "time") {
          const firstValue = a["avgScrollPercentage"] * a["totalVisitorCount"];
          const secondValue = b["avgScrollPercentage"] * b["totalVisitorCount"];

          if (firstValue < secondValue)
            return sortBy?.direction === "asc" ? -1 : 1;
          if (firstValue > secondValue)
            return sortBy?.direction === "asc" ? 1 : -1;
          return 0;
        }

        if (a[sortBy.key] < b[sortBy.key])
          return sortBy?.direction === "asc" ? -1 : 1;
        if (a[sortBy.key] > b[sortBy.key])
          return sortBy?.direction === "asc" ? 1 : -1;
        return 0;
      });
      return sortedData;
}