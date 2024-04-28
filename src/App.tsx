import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
  Separator,
} from "@/components";
import { cn } from "@/lib/utils";
import { getUsers, type User } from "@/shared/api";
import { useEffect, useState, type ComponentProps } from "react";
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

export type Group = {
  category: string;
  count: number;
};

interface InfoBlockProps extends ComponentProps<"div"> {
  title: string;
  groups: Group[];
}

const InfoBlock: React.FC<InfoBlockProps> = ({ groups, title }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base">{title}</h3>
      {groups.map(({ category, count }) => (
        <div key={category} className="flex gap-4 font-medium items-center">
          <div className="text-xs text-secondary">{category}</div>
          <div className="text-sm">{count} users</div>
        </div>
      ))}
    </div>
  );
};

interface CardProps extends ComponentProps<"div"> {
  user: User;
}

const UserCard: React.FC<CardProps> = ({ className, user }) => {
  const {
    name: { first, last },
    email,
    picture: { medium },
  } = user;

  const initials = `${first[0]}${last[0]}`;

  return (
    <div
      className={cn(
        "w-[332px] rounded-2xl bg-primary p-5 text-primary",
        className,
      )}
    >
      <div className="mb-[18px] flex gap-4">
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage
              className="h-14 w-14 object-cover"
              src={medium}
              alt="woman"
            />
            <AvatarFallback className="text-secondary uppercase">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col justify-between">
          <h3 className="text-lg font-semibold">{`${first} ${last}`}</h3>
          <p className="text-sm font-normal">{email}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Category />
        <Category />
        <Category />
      </div>
    </div>
  );
};

const Category = () => {
  return (
    <div className="flex gap-4">
      <p className="text-[12px] font-medium text-secondary">Phone No</p>
      <p className="text-sm font-medium text-primary">+1234567890</p>
    </div>
  );
};

const Header: React.FC<{ onClick: () => any }> = ({ onClick }) => {
  return (
    <header>
      <nav className="flex justify-between">
        <Input
          className="h-[52px] max-w-[332px] rounded-2xl border-none bg-secondary px-3 py-[14px] text-primary"
          placeholder="Search"
        />
        <Button onClick={onClick} className="text-accent" variant="ghost">
          Refresh Users
        </Button>
      </nav>
    </header>
  );
};
