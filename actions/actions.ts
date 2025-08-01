/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
// "use server";

// import { adminDb } from "@/firebase-admin";
// import { auth } from "@clerk/nextjs/server";

// export async function createNewDocument() {
//   const { sessionClaims } = await auth();

//   const docCollectionRef = adminDb.collection("documents");

//   const docRef = await docCollectionRef.add({
//     title: "New Doc",
//   });

//   await adminDb
//     .collection("users")
//     .doc(sessionClaims?.email!)
//     .collection("rooms")
//     .doc(docRef.id)
//     .set({
//       UserId: sessionClaims?.email!,
//       role: "owner",
//       createdAt: new Date(),
//       roomId: docRef.id,
//     });

//   return { docId: docRef.id };
// }

// ADA YANG SALAH DENGAN CODINGAN INI

// "use server";

// import { adminDb } from "@/firebase-admin";
// import { auth } from "@clerk/nextjs/server";

// export async function createNewDocument() {
//   auth().protect();

//   const { sessionClaims } = await auth();

//   const docCollectionRef = adminDb.collection("documents");

//   const docRef = await docCollectionRef.add({
//     title: "New Doc",
//   });

//   await adminDb
//     .collection("users")
//     .doc(sessionClaims?.email!)
//     .collection("rooms")
//     .doc(docRef.id)
//     .set({
//       UserId: sessionClaims?.email!,
//       role: "owner",
//       createdAt: new Date(),
//       roomId: docRef.id,
//     });

//   return { docId: docRef.id };
// }

"use server";
import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
  auth.protect();

  const { sessionClaims } = await auth();

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New Doc",
  });

  await adminDb
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email!,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
}

export async function deleteDocument(roomId: string) {
  auth.protect();

  console.log("delete Document", roomId);
  try {
    // delete the document refrence from itself
    await adminDb.collection("documents").doc(roomId).delete();

    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    const batch = adminDb.batch();

    // delete the room from refrence in the user's collection
    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    // delete the room from in liveblock
    await liveblocks.deleteRoom(roomId);

    return { success: true };
  } catch (error) {
    console.log(error);

    return { success: false };
  }
}

export async function InviteUserToDocument(roomId: string, email: string) {
  auth.protect();

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        role: "member",
        createdAt: new Date(),
        roomId: roomId,
      });

    return { success: true };
  } catch (error) {
    console.log(error);

    return { success: false };
  }
}

export async function removeUserFromDocument(roomId: string, email: string) {
  auth.protect();

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();

    return { success: true };
  } catch (error) {
    console.log(error);

    return { success: false };
  }
}
