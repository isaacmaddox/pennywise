import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { Suspense } from "react";
import DashboardPage from "@/components/app/dashboard/DashboardPage";
import Loading from "@/components/Loading";
import { redirect } from "next/navigation";

export default async function AppHome() {
   const cookieStore = await cookies();
   const token = cookieStore.get("usrjwt")?.value;

   if (!token) {
      return redirect("/login");
   }

   const user = jwt.decode(token) as User;

   return (
      <>
         <Suspense fallback={<Loading />}>
            <DashboardPage user={user} />
         </Suspense>
      </>
   );
}
