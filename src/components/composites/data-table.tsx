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
import { cn } from "@/lib/utils";

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
        <TableRow key={`row-${title}-${index}`} className="border-slate-700">
          {Object.entries<string>(columns).map(([key]) => (
            <TableCell key={`cell-${title}-${key}-${index}`}>
              <Skeleton className="h-4 w-24 bg-white/5" />
            </TableCell>
          ))}
        </TableRow>
      ));
    }

    return data.map((row, index) => (
      <TableRow key={`row-${title}-${index}`} className="border-slate-700">
        {Object.entries<string>(columns).map(([key]) => (
          <TableCell key={`cell-${title}-${index}-${key}`}>
            {row[key as keyof T]}
          </TableCell>
        ))}
      </TableRow>
    ));
  }, [columns, data, isLoading, title]);

  return (
    <div className={cn(className, "flex-1")}>
      <Card className="bg-slate-800 border-slate-700 max-h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto max-h-screen">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  {Object.entries<string>(columns).map(([key, value]) => (
                    <TableHead key={key} className="text-slate-400">
                      {value}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>{content}</TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
