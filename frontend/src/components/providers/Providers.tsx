import React, { Suspense } from "react";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ReactQueryProvider>
            <Suspense>{children}</Suspense>
        </ReactQueryProvider>
    );
};

export default Providers;
