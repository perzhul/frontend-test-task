import { capitalize } from "lodash";
import { ComponentProps } from "react";

interface CategoryProps extends ComponentProps<"div"> {
  title: string;
  value: string;
}

export const Category: React.FC<CategoryProps> = ({ title, value }) => {
  return (
    <div className="flex gap-4">
      <p className="text-[12px] font-medium text-secondary">
        {capitalize(title)}
      </p>
      <p className="text-sm font-medium text-primary">{value}</p>
    </div>
  );
};
