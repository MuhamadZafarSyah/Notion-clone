import Document from "@/components/Document";

async function DocumentPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <Document id={id} />
    </div>
  );
}
export default DocumentPage;
