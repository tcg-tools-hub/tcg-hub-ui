import React, { RefObject, useRef } from "react";

const useRefs = () => {

    const toolsSectionRef = useRef<HTMLElement>(null);
    const pricingSectionRef = useRef<HTMLElement>(null);
    const faqSectionRef = useRef<HTMLElement>(null);

    const scrollTo = (ref: RefObject<HTMLElement | null>) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    return {
        refs: {
            toolsSectionRef,
            pricingSectionRef,
            faqSectionRef
        },
        scrollTo
    }
}

export default useRefs;