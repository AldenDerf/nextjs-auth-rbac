import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/permission";
import { redirect } from "next/navigation";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if(!canAccessAdmin(session?.user?.role)) {
        redirect("/dashboard");
    }

    return (
        <div>
            <h1>Admin Panel</h1>
            <p>Restricted Aread</p>
        </div>
    )
}