import { ReactNode } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

type Props = {
  title: string;
  value: ReactNode;
  icon: ReactNode;
};

export const MetricsCard = ({ title, icon, value }: Props) => {
  return (
    <Card className="bg-slate-800 border-slate-700 w-80">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          {icon}
          <div className="text-3xl font-bold">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
};
