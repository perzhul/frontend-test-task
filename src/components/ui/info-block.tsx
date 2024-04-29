import { Group } from "@/shared";
import { capitalize } from "lodash";
import { ComponentProps } from "react";

interface InfoBlockProps extends ComponentProps<"div"> {
  title: string;
  groups: Group[];
}

export const InfoBlock: React.FC<InfoBlockProps> = ({ groups, title }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base">{title}</h3>
      {groups.map(({ category, count }) => (
        <div key={category} className="flex gap-4 font-medium items-center">
          <div className="text-xs text-secondary">{capitalize(category)}</div>
          <div className="text-sm">{count} users</div>
        </div>
      ))}
    </div>
  );
};
