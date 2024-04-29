import { Button, Input } from "@/components";
import { useUnit } from "effector-react";
import { $searchValue, searchValueChanged } from "./model";
import { usersRefreshed } from "@/model";

export const Header: React.FC = () => {
  const [searchValue, onChange, onClick] = useUnit([
    $searchValue,
    searchValueChanged,
    usersRefreshed,
  ]);

  return (
    <header>
      <nav className="flex justify-between">
        <Input
          className="h-[52px] max-w-[332px] rounded-2xl border-none bg-secondary px-3 py-[14px] text-primary"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button onClick={onClick} className="text-accent" variant="ghost">
          Refresh Users
        </Button>
      </nav>
    </header>
  );
};
