import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export default async function LoginRedirect() {
    const session = await getServerSession(authOptions);

    if (session.user.role === "admin") {
        return redirect("/admin-dashboard");
    } else {
        return redirect("/my-appointments");
    }
}
