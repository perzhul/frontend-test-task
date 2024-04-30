import { Header, SidePanel, UserCard, UserCardSkeleton } from "@/components";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useUnit } from "effector-react";
import { $filteredUsers, $loading } from "./model";

export const App: React.FC = () => {
  const users = useUnit($filteredUsers);
  const isLoading = useUnit($loading);

  return (
    <div className="w-screen flex h-screen min-h-screen flex-col gap-6 bg-primaryDark p-8 font-primary">
      <Header />
      <main className="flex text-primary overflow-hidden">
        {users.length > 0 ? (
          <ScrollArea className="overflow-y-auto p-2 scroll-smooth custom-scrollbar overflow-x-hidden">
            <div className="grid grid-cols-3 gap-3">
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <UserCardSkeleton key={index} />
                  ))
                : users.map((user) => (
                    <UserCard key={user.login.uuid} user={user} />
                  ))}
            </div>
          </ScrollArea>
        ) : null}
        <SidePanel className="ml-[5px]" />
      </main>
    </div>
  );
};
