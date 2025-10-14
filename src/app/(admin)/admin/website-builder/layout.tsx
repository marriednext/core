export default function WebsiteBuilderLayout({
  editor,
  preview,
}: {
  editor: React.ReactNode;
  preview: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="w-80 border-r border-gray-200 overflow-y-auto bg-white">
        {editor}
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-50">{preview}</div>
    </div>
  );
}
