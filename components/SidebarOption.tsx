/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

function SidebarOption({ href, id }: { href: string; id: string }) {
  const [data, laoding, error] = useDocumentData(doc(db, "documents", id));
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";

  if (!data) return null;
  return (
    <Link
      href={href}
      className={`rounded-md border p-2 ${
        isActive
          ? "border-black bg-gray-300 font-bold text-black"
          : "border-gray-400 text-black"
      }`}
    >
      <p className="truncate">{data.title}</p>
    </Link>
  );
}

export default SidebarOption;
