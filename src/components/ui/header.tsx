import { Input, Button } from "@/components";

// TODO: refactor
export const Header: React.FC<{ onClick: () => any }> = ({ onClick }) => {
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
