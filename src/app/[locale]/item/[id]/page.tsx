export default function ItemDetailPage({
  params,
}: {
  params: { id: string; locale: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold">物品详情页</h1>
      <p className="mt-4">物品 ID: {params.id}</p>
    </main>
  );
}

