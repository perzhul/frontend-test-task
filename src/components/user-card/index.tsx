import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Category,
  Skeleton,
} from "@/components";
import { parseDate } from "@/lib/dayjs";
import { cn } from "@/lib/utils";
import { userRemoved } from "@/model";
import { User } from "@/shared";
import { useUnit } from "effector-react";
import React from "react";
import { $selectedUser, userDisselected, userSelected } from "./model";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User;
}

export const UserCard: React.FC<CardProps> = ({ className, user }) => {
  const { name, email, picture, login, phone, dob, location } = user;
  const initials = `${name.first[0]}${name.last[0]}`;

  const [selectedUser, selectUser, deselectUser, removeUser] = useUnit([
    $selectedUser,
    userSelected,
    userDisselected,
    userRemoved,
  ]);

  const isSelected = login.uuid === selectedUser?.login.uuid;
  const activeStyles = "outline-active-card-border outline";

  const handleFocus = () => selectUser(user);
  const handleBlur = () => deselectUser(user);
  const handleClick = () => removeUser(user);

  return (
    <div
      tabIndex={0}
      className={cn(
        "w-[332px] rounded-2xl bg-primary p-5 text-primary relative",
        className,
        isSelected && activeStyles,
      )}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      onFocus={handleFocus}
    >
      {isSelected && (
        <Button
          onBlur={handleBlur}
          onClick={handleClick}
          className="absolute right-0 top-0 h-11 w-11 rounded-bl-2xl rounded-tr-2xl bg-brightGray hover:brightness-150 focus:border-2 p-0 hover:cursor-pointer bg-opacity-10 border border-opacity-20 border-t-transparent border-r-transparent border-l-[#FF2C47] border-b-[#FF2C47]"
        >
          <img src="/trash-icon.svg" alt="Delete card" />
        </Button>
      )}
      <div className="mb-4 flex gap-4">
        <Avatar>
          <AvatarImage
            className="h-14 w-14 object-cover"
            src={picture.medium}
            alt={`${name.first} ${name.last}`}
          />
          <AvatarFallback className="text-secondary uppercase">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-between">
          <h3 className="text-lg font-semibold">{`${name.first} ${name.last}`}</h3>
          <p className="text-sm">{email}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Category title="Phone No" value={phone} />
        <Category title="Birthday" value={parseDate(dob.date)} />
        <Category
          title="Address"
          value={`${location.city}, ${location.state}`}
        />
      </div>
    </div>
  );
};

export const UserCardSkeleton: React.FC = () => {
  return (
    <Skeleton className="w-[332px] m-2 bg-primary rounded-2xl h-[190px] p-5">
      <div className="flex w-full mb-4 items-center">
        <div className="mr-2">
          <Skeleton className="h-14 w-14 rounded-full bg-secondary" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-4 w-full bg-secondary" />
          <Skeleton className="h-4 w-full bg-secondary" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-full rounded-xl bg-secondary" />
        <Skeleton className="h-4 w-full rounded-xl bg-secondary" />
        <Skeleton className="h-4 w-full rounded-xl bg-secondary" />
      </div>
    </Skeleton>
  );
};
