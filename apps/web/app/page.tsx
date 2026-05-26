import { prisma } from "@repo/db/client";

export default async function Home() {
  const users = await prisma.user.findFirst();
  return (
    <div>
      <p>{users?.email}</p>
      <p>{users?.name}</p>
    </div>
  );
}
