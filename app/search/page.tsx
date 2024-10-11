import Search from "@/components/search";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense>
            <Search/>
        </Suspense>
    )
}