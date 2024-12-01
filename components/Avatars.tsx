"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Avatars() {
  const others = useOthers();
  const self = useSelf();

  const all = [self, ...others];

  console.log(all);

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm font-light">Users currently editing this page</p>

      <div className="flex -space-x-5">
        {all.map((other, i) => (
          <TooltipProvider key={other?.id + i}>
            <Tooltip>
              <TooltipTrigger>
                <Avatar className="border-2 hover:z-50">
                  <AvatarImage
                    className="object-cover"
                    src={other?.info.avatar}
                  />
                  <AvatarFallback>PFP</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{self?.id === other?.id ? "You" : other?.info.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}

export default Avatars;
