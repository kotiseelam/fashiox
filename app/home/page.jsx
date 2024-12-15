import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Store from "@/components/Store";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // Correct the redirect path here
  if (!session) redirect("/login");

  return <Store />;
}
