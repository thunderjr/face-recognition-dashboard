import type { ReactNode } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableHeader,
} from "../ui/table";

type Props<T extends Record<string, ReactNode>> = {
  columns: Record<keyof T, string>;
  title: string;
  data: T[];
};

export const DataTable = <T extends Record<string, ReactNode>>({
  columns,
  title,
  data,
}: Props<T>) => {
  return (
    <div className="flex-1">
      <Card className="bg-slate-800 border-slate-700 max-h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto max-h-full">
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

              <TableBody>
                {data.map((row, index) => (
                  <TableRow
                    key={`row-${title}-${index}`}
                    className="border-slate-700"
                  >
                    {Object.entries<string>(columns).map(([key]) => (
                      <TableCell key={`cell-${title}-${index}-${key}`}>
                        {row[key as keyof T]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
