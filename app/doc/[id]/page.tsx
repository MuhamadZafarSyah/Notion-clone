"use client";

import Document from "@/components/Document";

function DocumentPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <Document id={id} />
    </div>
  );
}

export default DocumentPage;
