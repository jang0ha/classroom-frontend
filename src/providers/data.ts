import { BACKEND_BASE_URL } from "@/constants";
import { createDataProvider, CreateDataProviderOptions } from "@refinedev/rest";
import { ListResponse } from "@/types";

if (!BACKEND_BASE_URL) {
  throw new Error(
    "BAKEND_BASE_URL is not configured. Please set VITE_BACKEND_BASE_URL in your .env file",
  );
}

const options: CreateDataProviderOptions = {
  getList: {
    /* list records */
    getEndpoint: ({ resource }) => resource,

    buildQueryParams: async ({ resource, pagination, filters }) => {
      const page = pagination?.currentPage ?? 1;
      const pageSize = pagination?.pageSize ?? 10;
      const params: Record<string, string | number | null> = {
        page,
        limit: pageSize,
      };
      filters?.forEach((filter) => {
        const field = "field" in filter ? filter.field : "";
        const value = String(filter.value);

        if (resource === "subjects") {
          if (field === "department") params.department = value;
          if (field === "name" || field === "code") params.search = value;
        }
      });

      return params;
    },
    mapResponse: async (response) => {
      const payload: ListResponse = await response.clone().json();
      return payload.data ?? [];
    },
    getTotalCount: async (response) => {
      const payload: ListResponse = await response.clone().json();
      return payload.pagination?.total ?? payload.data?.length ?? 0;
    },
  },
  getOne: {
    /* get record by id */
  },
  create: {
    /* create record */
  },
  update: {
    /* update record */
  },
  deleteOne: {
    /* delete record */
  },
  custom: {
    /* anything special (search, export, etc.) */
  },
};

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export { dataProvider };
