import { useMemo, type ReactNode } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableHeader,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";

type Props<T extends Record<string, ReactNode>> = {
  columns: Record<keyof T, string>;
  isLoading?: boolean;
  className?: string;
  title: string;
  data: T[];
};

export const DataTable = <T extends Record<string, ReactNode>>({
  className,
  isLoading,
  columns,
  title,
  data,
}: Props<T>) => {
  const content = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, index) => (
        <TableRow
          key={`row-${title}-${index}`}
          className="border-gray-200 hover:bg-red-50"
        >
          {Object.entries<string>(columns).map(([key]) => (
            <TableCell key={`cell-${title}-${key}-${index}`}>
              <Skeleton className="h-4 w-24 bg-gray-200" />
            </TableCell>
          ))}
        </TableRow>
      ));
    }

    return data.map((row, index) => (
      <TableRow
        key={`row-${title}-${index}`}
        className="border-gray-200 hover:bg-red-50"
      >
        {Object.entries<string>(columns).map(([key]) => (
          <TableCell key={`cell-${title}-${index}-${key}`}>
            {row[key as keyof T]}
          </TableCell>
        ))}
      </TableRow>
    ));
  }, [columns, data, isLoading, title]);

  return (
    <Card className={className}>
      <CardHeader className="h-16">
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="p-0 px-2 pb-4 overflow-auto max-h-[calc(100%-5rem)]">
        <Table>
          <TableHeader>
            <TableRow>
              {Object.entries<string>(columns).map(([key, value]) => (
                <TableHead key={key}>{value}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>{content}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
