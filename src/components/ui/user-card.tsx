import { cn } from "@/lib/utils";
import { User } from "@/shared";
import { ComponentProps } from "react";
import { Avatar, AvatarImage, AvatarFallback, Category } from "@/components";
import { parseDate } from "@/lib/dayjs";

interface CardProps extends ComponentProps<"div"> {
  user: User;
}

export const UserCard: React.FC<CardProps> = ({ className, user }) => {
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
        <Category title="Phone No" value={user.phone} />
        <Category title="Birthday" value={parseDate(user.dob.date)} />
        <Category
          title="Address"
          value={`${user.location.city}, ${user.location.state}`}
        />
      </div>
    </div>
  );
};
