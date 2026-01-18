"use client";

import { useSession } from "next-auth/react";
import { LogoutButton } from "./LogoutButton";

export default function NavBar() {
    // This hool listens to the SessionProvider automatically
    const { data: session} = useSession();

    return (
        <nav style={{ padding: 10, borderBottom: "1px solid #ccc", minHeight: "50px"}}>
            {session ? (
                <>
                    <span style={{ marginRight: "10px"}}>
                        {session.user?.email}
                    </span>
                     <LogoutButton />
                </>
            ):
             (
                <span>Not signed in</span>
             )   
            }
        </nav>
    )
}