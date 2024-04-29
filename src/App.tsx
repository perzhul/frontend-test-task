import { Header, InfoBlock, Separator, UserCard } from "@/components";
import { useUnit } from "effector-react";
import {
  $ageGroups,
  $genderGroups,
  $users,
  $usersCount,
  refetchUsersEvent,
} from "./model";

export const App: React.FC = () => {
  const users = useUnit($users);

  return (
    <div className="min-w-screen flex max-h-screen min-h-screen flex-col gap-6 bg-primaryDark p-8 font-primary">
      <Header onClick={refetchUsersEvent} />
      <main className="flex gap-4 text-primary">
        <div className="grid grid-cols-3 gap-4">
          {users.map((user) => (
            <UserCard user={user} key={user.login.uuid} />
          ))}
        </div>
        <SidePanel />
      </main>
    </div>
  );
};

const SidePanel: React.FC = () => {
  const [usersCount, ageGroups, genderGroups] = useUnit([
    $usersCount,
    $ageGroups,
    $genderGroups,
  ]);

  return (
    <div className="min-w-[332px] flex-grow rounded-2xl bg-primary p-6 flex flex-col gap-6">
      <h2 className="font-semibold text-lg">{usersCount} Users</h2>
      <Separator />
      <InfoBlock title="Age Groups" groups={ageGroups} />
      <Separator />
      <InfoBlock title="Gender Groups" groups={genderGroups} />
    </div>
  );
};
