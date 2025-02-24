"use client"

import { Button } from "@/components/ui/button";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import heroImage from "@/public/images/hero.jpg"
import Link from "next/link";
import FullscreenSection from "@/components/sections/fullscreen-section";
import useRefs from "@/hooks/use-refs";
import React, { useEffect } from "react";
import Pricing from "@/components/sections/pricing";
import Overview from "@/components/sections/overview";
import Faq from "@/components/sections/faq";

export default function Home() {

  const { refs, scrollTo } = useRefs()

  const { pricingSectionRef, toolsSectionRef, faqSectionRef } = refs

  const handleMainClick = () => {
    scrollTo(toolsSectionRef)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.history.pushState(
              {},
              "",
              `#${entry.target.id}`
            );
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(refs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground dark:bg-background dark:text-foreground">
      <section className="py-8 px-4 sm:px-6 lg:px-8 xl:px-16 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl dark:text-primary-foreground">
                Bem-vindo ao TCG Tools Hub
              </h1>
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl dark:text-muted-foreground">
                Explore ferramentas incríveis para lojistas, colecionadores e jogadores de TCG.
              </p>
              <div className="flex w-full flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Button className="w-full sm:w-auto"><Link href={"/login"}>Comece Agora</Link></Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto dark:text-primary dark:border-primary dark:hover:bg-primary dark:hover:text-primary-foreground dark:bg-transparent"
                  onClick={handleMainClick}
                >
                  Saiba Mais Sobre as Ferramentas
                  <ArrowDownRight className="ml-2 size-4" />
                </Button>
              </div>
            </div>
            <Image
              src={heroImage}
              alt="placeholder hero"
              className="max-h-96 w-full rounded-md object-cover"
            />
          </div>
        </div>
      </section>

      <FullscreenSection ref={toolsSectionRef} id="overview">
        <Overview />
      </FullscreenSection>
      {/* <FullscreenSection ref={pricingSectionRef} id="pricing">
        <Pricing />
      </FullscreenSection> */}
      <FullscreenSection ref={faqSectionRef} id="faq">
        <Faq />
      </FullscreenSection>
    </main>
  );
}
