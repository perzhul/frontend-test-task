import { cn } from "@/lib/utils";
import {
  $ageGroups,
  $filteredUsersCount,
  $genderGroups,
  $loading,
} from "@/model";
import { useUnit } from "effector-react";
import { ComponentProps } from "react";
import { InfoBlock, Separator, Skeleton } from "@/components";

export const SidePanel: React.FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  const [usersCount, ageGroups, genderGroups] = useUnit([
    $filteredUsersCount,
    $ageGroups,
    $genderGroups,
  ]);

  const isLoading = useUnit($loading);
  if (isLoading) return <SidePanelSkeleton />;

  return (
    <div
      {...props}
      className={cn(
        className,
        "min-w-[332px] flex-grow rounded-2xl bg-primary p-6 flex flex-col gap-6 mt-2",
      )}
    >
      <h2 className="font-semibold text-lg">{usersCount} Users</h2>
      <Separator />
      <InfoBlock title="Age Groups" groups={ageGroups} />
      <Separator />
      <InfoBlock title="Gender Groups" groups={genderGroups} />
    </div>
  );
};

const SidePanelSkeleton: React.FC = () => {
  return (
    <Skeleton className="bg-primary brightness-110 rounded-2xl min-w-[332px] flex-grow ml-[5px] mt-2 p-6">
      <Skeleton className="h-5 w-1/3 mb-6 bg-secondary" />
      <Skeleton className="h-4 w-1/3 mt-2 bg-secondary" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-3 w-1/4 mt-6 bg-secondary" />
      ))}
      <Skeleton className="h-4 w-1/3 mt-8 bg-secondary" />
      {Array.from({ length: 2 }).map((_, i) => (
        <Skeleton key={i} className="h-3 w-1/4 mt-6 bg-secondary" />
      ))}
    </Skeleton>
  );
};
