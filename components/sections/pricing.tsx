"use client";

import { ArrowRight, CircleCheck } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface PricingFeature {
    text: string;
}

interface PricingPlan {
    id: string;
    name: string;
    description: string;
    monthlyPrice: string;
    yearlyPrice: string;
    features: PricingFeature[];
    button: {
        text: string;
        url: string;
    };
}

interface Pricing2Props {
    heading?: string;
    description?: string;
    plans?: PricingPlan[];
}

const Pricing = ({
    heading = "Planos de Preços",
    description = "Confira nossos planos de preços acessíveis",
    plans = [
        {
            id: "plus",
            name: "Plus",
            description: "Para turbinar sua loja",
            monthlyPrice: "R$ 20",
            yearlyPrice: "R$ 180",
            features: [
                { text: "Acesso a todas as ferramentas" },
                { text: "Suporte por e-mail" },
                { text: "Até 5 membros da equipe" },
            ],
            button: {
                text: "Comprar",
                url: "https://www.shadcnblocks.com",
            },
        },
        {
            id: "pro",
            name: "Pro",
            description: "Para expandir seus negócios",
            monthlyPrice: "R$ 50",
            yearlyPrice: "R$ 500",
            features: [
                { text: "Tudo que o plano Plus oferece" },
                { text: "Suporte via WhatsApp" },
                { text: "Equipe ilimitada" },
            ],
            button: {
                text: "Comprar",
                url: "https://www.shadcnblocks.com",
            },
        },
    ],
}: Pricing2Props) => {
    const [isYearly, setIsYearly] = useState(false);

    const formatPrice = (price: string) => {
        return parseFloat(price.replace("R$ ", "").replace(",", "."));
    };

    return (
        <div className="container">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
                <h2 className="text-pretty text-4xl font-bold lg:text-6xl">
                    {heading}
                </h2>
                <p className="text-muted-foreground lg:text-xl">{description}</p>
                <div className="flex items-center gap-3 text-lg">
                    Mensal
                    <Switch
                        checked={isYearly}
                        onCheckedChange={() => setIsYearly(!isYearly)}
                    />
                    Anual
                </div>
                <div className="flex flex-col items-stretch gap-6 md:flex-row">
                    {plans.map((plan) => {
                        const monthlyValue = formatPrice(plan.monthlyPrice);
                        const yearlyValue = formatPrice(plan.yearlyPrice);

                        return (
                            <Card
                                key={plan.id}
                                className="flex w-80 flex-col justify-between text-left"
                            >
                                <CardHeader>
                                    <CardTitle>
                                        <p>{plan.name}</p>
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        {plan.description}
                                    </p>
                                    <span className="text-4xl font-bold">
                                        {isYearly
                                            ? plan.yearlyPrice
                                            : plan.monthlyPrice}
                                    </span>
                                    <p className="text-muted-foreground">
                                        {!isYearly && (
                                            `Faturado R$ ${monthlyValue * 12} anualmente`
                                        )}
                                        {isYearly && (
                                            `Apenas R$ ${(yearlyValue / 12).toFixed(2)} por mes!`
                                        )}
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <Separator className="mb-6" />
                                    {plan.id === "pro" && (
                                        <p className="mb-3 font-semibold">
                                            Tudo que o plano Plus oferece, e:
                                        </p>
                                    )}
                                    <ul className="space-y-4">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <CircleCheck className="size-4" />
                                                <span>{feature.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter className="mt-auto">
                                    <Button asChild className="w-full">
                                        <a href={plan.button.url} target="_blank">
                                            {plan.button.text}
                                            <ArrowRight className="ml-2 size-4" />
                                        </a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Pricing;
