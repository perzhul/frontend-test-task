import { Header, InfoBlock, Separator, UserCard } from "@/components";
import { type Group } from "@/shared";
import { getUsers, type User } from "@/shared/api";
import { useEffect, useState } from "react";
import { getAgeGroups, getGenderGroups } from "./model";

const USERS_COUNT = 20;

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [ageGroups, setAgeGroups] = useState<Group[]>([]);
  const [genderGroups, setGenderGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getUsers(USERS_COUNT);
      setUsers(data.results);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const ageGroups = getAgeGroups(users);
    setAgeGroups(ageGroups);
    setGenderGroups(getGenderGroups(users));
  }, [users]);

  return (
    <div className="min-w-screen flex max-h-screen min-h-screen flex-col gap-6 bg-primaryDark p-8 font-primary">
      <Header
        onClick={() => {
          const fetchUsers = async () => {
            const { data } = await getUsers(USERS_COUNT);
            setUsers(data.results);
          };
          fetchUsers();
        }}
      />
      <main className="flex gap-4 text-primary">
        <div className="grid grid-cols-3 gap-4">
          {users.map((user) => {
            return <UserCard user={user} key={user.login.uuid} />;
          })}
        </div>
        <div className="min-w-[332px] flex-grow rounded-2xl bg-primary p-6 flex flex-col gap-6">
          <h2>{USERS_COUNT} Users</h2>
          <Separator />
          <InfoBlock title="Age Groups" groups={ageGroups} />
          <Separator />
          <InfoBlock title="Gender Groups" groups={genderGroups} />
        </div>
      </main>
    </div>
  );
};
