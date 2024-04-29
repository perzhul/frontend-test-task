import { Header, InfoBlock, Separator, Skeleton, UserCard } from "@/components";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useUnit } from "effector-react";
import { ComponentProps } from "react";
import { cn } from "./lib/utils";
import {
  $ageGroups,
  $filteredUsers,
  $filteredUsersCount,
  $genderGroups,
  $loading,
} from "./model";

export const App: React.FC = () => {
  const users = useUnit($filteredUsers);

  return (
    <div className="w-screen flex h-screen min-h-screen flex-col gap-6 bg-primaryDark p-8 font-primary">
      <Header />
      <main className="flex text-primary overflow-hidden">
        <ScrollArea className="overflow-y-auto scroll-smooth custom-scrollbar overflow-x-hidden">
          <div className="grid grid-cols-3 gap-3 mr-[5px] ">
            {users.map((user) => (
              <UserCard user={user} key={user.login.uuid} />
            ))}
          </div>
        </ScrollArea>
        <SidePanel className="ml-[5px]" />
      </main>
    </div>
  );
};

const SidePanel: React.FC<ComponentProps<"div">> = ({
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
