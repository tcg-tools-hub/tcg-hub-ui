import React, { forwardRef, ReactNode } from "react";

const FullscreenSection = forwardRef<
    HTMLElement,
    { children: ReactNode, id: string }
>(({ children, id }, ref) => {
    return (
        <section
            id={id}
            ref={ref}
            className="min-h-screen flex items-center justify-center bg-gray-100"
        >
            {children}
        </section>
    );
});

export default FullscreenSection;
