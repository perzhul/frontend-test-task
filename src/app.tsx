import { Header, InfoBlock, Separator, UserCard } from "@/components";
import { useUnit } from "effector-react";
import {
  $ageGroups,
  $genderGroups,
  $users,
  $usersCount,
  refetchUsersEvent,
} from "./model";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ComponentProps } from "react";
import { cn } from "./lib/utils";

export const App: React.FC = () => {
  const users = useUnit($users);

  return (
    <div className="w-screen flex h-screen min-h-screen flex-col gap-6 bg-primaryDark p-8 font-primary">
      <Header onClick={refetchUsersEvent} />
      <main className="flex text-primary overflow-hidden">
        <ScrollArea className="overflow-y-auto scroll-smooth custom-scrollbar overflow-x-hidden">
          <div className="grid grid-cols-3 gap-4 mr-[7px] ">
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
    $usersCount,
    $ageGroups,
    $genderGroups,
  ]);

  return (
    <div
      {...props}
      className={cn(
        className,
        "min-w-[332px] flex-grow rounded-2xl bg-primary p-6 flex flex-col gap-6",
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
