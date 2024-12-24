export interface IRefreshProps{
    pagination: {
      sortBy: string;
      descending: boolean;
      page: number;
      rowsPerPage: number;
    };
    filter?: string;
}