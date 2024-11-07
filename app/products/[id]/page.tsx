import Product from "./product";

export async function generateStaticParams() {
  return true;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <Product />;
}
