import RoomProvider from "@/components/RoomProvider";

async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string } | Promise<{ id: string }>;
}) {
  const { id } = params instanceof Promise ? await params : params;
  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}
export default layout;
