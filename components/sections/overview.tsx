import {
    GitPullRequest,
    RadioTower,
    SquareKanban,
} from "lucide-react";
import React, { JSX } from "react";

interface Reason {
    title: string;
    description: string;
    icon: JSX.Element;
}

interface Feature43Props {
    heading?: string;
    reasons?: Reason[];
}

const Overview = ({
    heading = "Nossas Ferramentas",
    reasons = [
        {
            title: "Scrapper de cartas",
            description: "Consulte preços das cartas automaticamente.",
            icon: <GitPullRequest className="size-6" />,
        },
        {
            title: "Gerenciamento de entregas",
            description: "Gerencie as cartas deixadas em sua loja.",
            icon: <SquareKanban className="size-6" />,
        },
        {
            title: "Validador de deck",
            description: "Valide as cartas necessárias para seu deck.",
            icon: <RadioTower className="size-6" />,
        },
    ],
}: Feature43Props) => {
    return (
        <div className="container m-8">
            <div className="mb-10 md:mb-20">
                <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">
                    {heading}
                </h2>
            </div>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {reasons.map((reason, i) => (
                    <div key={i} className="flex flex-col">
                        <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent">
                            {reason.icon}
                        </div>
                        <h3 className="mb-2 text-xl font-semibold">{reason.title}</h3>
                        <p className="text-muted-foreground">{reason.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Overview;
