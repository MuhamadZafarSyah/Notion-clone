"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NewDocumentButton from "./NewDocumentButton";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import {
  collectionGroup as collectionGroup, // collectionGroup untuk mengambil data dari semua collection yang memiliki nama yang sama
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import SidebarOption from "./SidebarOption";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: string;
  userId: string;
  roomId: string;
}

function Sidebar() {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });

  // buat query untuk menampilkan data dari firestore yang di filter berdasarkan email user yang login dan berada di room yang sama
  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString()),
      ),
  );

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData,
          });
        }
        return acc;
      },
      {
        owner: [],
        editor: [],
      },
    );
    setGroupedData(grouped);
  }, [data]);

  // console.log(groupedData);

  const menuOptions = (
    <>
      <NewDocumentButton />

      <div className="flex flex-col space-y-4 py-4 md:max-w-36">
        {groupedData.owner.length === 0 ? (
          <h2 className="text-sm font-semibold text-gray-500">
            No documents found
          </h2>
        ) : (
          <>
            <h2 className="text-sm font-semibold text-gray-500">
              My Documents
            </h2>
            {groupedData.owner.map((doc) => (
              <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
            ))}
          </>
        )}

        {groupedData.editor.length > 0 && (
          <>
            <h2 className="text-sm font-semibold text-gray-500">
              Shared with Me
            </h2>
            {groupedData.editor.map((doc) => (
              <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
            ))}
          </>
        )}
      </div>

      {/* DISINI UNTUK ISI SEMUA CONTENT NYA NANTI */}
      {/* ISI DARI PROJECT YANG DI BUAT */}
    </>
  );
  return (
    <div className="relative bg-gray-200 p-3 md:p-5">
      {/* MOBILE VIEW */}
      <div className="inline md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu color="black" size={24} />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
}
export default Sidebar;
