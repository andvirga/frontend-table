export type TableRow = {
    url: string;
    totalCount: number;
    totalVisitorCount: number;
    bounceCount: number;
    startsWithCount: number;
    endsWithCount: number;
    avgScrollPercentage: number;
    totalPageviewCount: number;
  };
  
export type TableData = TableRow[];