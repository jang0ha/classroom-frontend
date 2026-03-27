import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input.tsx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select.tsx";
import { DEPARTMENT_OPTIONS } from "@/constants";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { Subject } from "@/types";
import { Badge } from "@/components/ui/badge";

const SubjectList = () => {
  const [searchQuery, setSearchQuery] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const departmentFilters =
    selectedDepartment === "all"
      ? []
      : [
          {
            field: "department",
            operator: "eq" as const,
            value: selectedDepartment,
          },
        ];

  const searchFilters = searchQuery
    ? [{ field: "name", operator: "contains" as const, value: searchQuery }]
    : [];
  const subjectTable = useTable<Subject>({
    columns: useMemo<ColumnDef<Subject>[]>(
      () => [
        {
          id: "code",
          accessorKey: "code",
          size: 100,
          header: () => <p className="column-title ml-2">Code</p>,
          cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
        },
        {
          id: "name",
          accessorKey: "name",
          size: 200,
          header: () => <p className="column-title">Name</p>,
          cell: ({ getValue }) => (
            <span className="text-foreground">{getValue<string>()}</span>
          ),
          filterFn: "includesString",
        },
        {
          id: "department",
          accessorKey: "department.name",
          size: 150,
          header: () => <p className="column-title">Department</p>,
          cell: ({ getValue }) => (
            <Badge variant="secondary">{getValue<string>()}</Badge>
          ),
          filterFn: "includesString",
        },
        {
          id: "description",
          accessorKey: "description",
          size: 300,
          header: () => <p className="column-title">Description</p>,
          cell: ({ getValue }) => (
            <span className="truncate line-clamp-2">{getValue<string>()}</span>
          ),
          filterFn: "includesString",
        },
      ],
      [],
    ),
    refineCoreProps: {
      resource: "subjects",
      pagination: {
        pageSize: 10,
        mode: "server",
      },
      filters: {
        permanent: [...departmentFilters, ...searchFilters],
      },
      sorters: {
        initial: [{ field: "id", order: "desc" }],
      },
    },
  });
  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Subjects</h1>
      <p>Quick access to essectial metrics and management</p>
      <article className="intro-row">
        <div className="actions-row">
          <div className="search-field">
            <Search className="search-icon" />
            <Input
              type="text"
              name=""
              id=""
              placeholder="Search by name..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger>
                <SelectValue placeholder="filter by department"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departs</SelectItem>
                {DEPARTMENT_OPTIONS.map((department) => (
                  <SelectItem value={department.value} key={department.value}>
                    {department.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <CreateButton />
          </div>
        </div>
      </article>

      <DataTable table={subjectTable}></DataTable>
    </ListView>
  );
};

export default SubjectList;
