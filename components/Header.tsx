"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Breadcrums from "./Breadcrums";

function Header() {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between p-5">
      {user ? (
        <h1 className="text-2xl">
          {user?.firstName}
          {`'s `}Space
        </h1>
      ) : (
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
      )}

      <Breadcrums />
      <div>
        <UserButton />
      </div>
    </div>
  );
}
export default Header;
