"use client";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";
import ManageUser from "./ManageUser";
import Avatars from "./Avatars";

function Document({ id }: { id: string }) {
  const [data] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState<string>("");
  const [isUpdating, startTransition] = useTransition();
  const isOwner = useOwner();

  //   console.log(data);

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);
  const updateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };

  return (
    <div className="h-full flex-1 bg-gray-100 p-5">
      <div className="mx-auto flex max-w-6xl justify-between pb-5">
        <form onSubmit={updateTitle} className="flex flex-1 space-x-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} />

          <Button disabled={isUpdating} type="submit">
            {isUpdating ? "Updating..." : "Update"}
          </Button>

          {isOwner && (
            <>
              <InviteUser />
              <DeleteDocument />
            </>
          )}
        </form>
      </div>

      <div className="mx-auto mb-5 flex max-w-6xl items-center justify-between">
        <ManageUser />
        <Avatars />
      </div>

      <hr className="pb-10" />

      <Editor />
    </div>
  );
}
export default Document;
