// app/wishlist/page.jsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Wishlist from "@/components/Wishlist"; // Your Wishlist component

export default async function WishlistPage() {
  // Fetch the session details from next-auth
  const session = await getServerSession(authOptions);

  // If no session is found (user not authenticated), redirect to login page
  if (!session) {
    redirect("/login"); 
  }

  
  return <Wishlist />;
}
