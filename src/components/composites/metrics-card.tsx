import { ReactNode } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

type Props = {
  title: string;
  value: ReactNode;
  icon: ReactNode;
};

export const MetricCard = ({ title, icon, value }: Props) => {
  return (
    <Card className="lg:w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
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
