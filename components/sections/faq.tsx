import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

interface Faq3Props {
    heading?: string;
    description?: string;
    items?: FaqItem[];
    supportHeading?: string;
    supportDescription?: string;
    supportButtonText?: string;
    supportButtonUrl?: string;
}

const faqItems = [
    {
        id: "faq-1",
        question: "Como funciona a plataforma?",
        answer:
            "Somos uma plataforma de automação e de criação de ferramentas voltadas para o mundo de TCG. Ao realizar o cadastro da sua loja, você terá acesso aos diversos produtos citados acima.",
    },
    {
        id: "faq-2",
        question: "Quais ferramentas estão disponíveis na plataforma?",
        answer:
            "A plataforma oferece diversas ferramentas como Scrapper de cartas, gerenciamento de entregas, validador de decks, entre outras funcionalidades voltadas para o mercado de TCG.",
    },
    {
        id: "faq-3",
        question: "Posso integrar minha loja com outras plataformas?",
        answer:
            "Sim, nossa plataforma oferece integrações com outras ferramentas e sistemas, facilitando o gerenciamento e a automação dos seus processos.",
    },
    {
        id: "faq-4",
        question: "Quais são os planos de pagamento disponíveis?",
        answer:
            "Oferecemos diferentes planos de pagamento para atender as necessidades da sua loja. Para mais detalhes, acesse nossa página de planos ou entre em contato com nosso suporte.",
    },
    {
        id: "faq-5",
        question: "Posso testar a plataforma antes de me cadastrar?",
        answer: "Sim, oferecemos um período de teste gratuito para que você possa explorar a plataforma antes de decidir pelo plano.",
    },
    {
        id: "faq-6",
        question: "Como posso entrar em contato com o suporte?",
        answer:
            "Você pode entrar em contato com nossa equipe de suporte por e-mail em suporte@exemplo.com ou ligando para 0800-123-4567.",
    },
];

const Faq = ({
    heading = "Perguntas frequentes",
    description = "Encontre respostas para perguntas comuns sobre nossa plataforma. Não encontrou o que procurava? Entre em contato com nossa equipe de suporte.",
    items = faqItems,
    supportHeading = "Precisa de mais suporte?",
    supportDescription = "Nossa equipe de suporte dedicada está pronta para ajudar com qualquer dúvida ou preocupação. Entre em contato para obter assistência personalizada.",
    supportButtonText = "Contato com o Suporte",
    supportButtonUrl = "https://www.shadcnblocks.com",
}: Faq3Props) => {
    return (
        <section className="py-32">
            <div className="container space-y-16">
                <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
                    <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
                        {heading}
                    </h2>
                    <p className="text-muted-foreground lg:text-lg">{description}</p>
                </div>
                <Accordion
                    type="single"
                    collapsible
                    className="mx-auto w-full lg:max-w-3xl"
                >
                    {items.map((item) => (
                        <AccordionItem key={item.id} value={item.id}>
                            <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                                    {item.question}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="sm:mb-1 lg:mb-2">
                                <div className="text-muted-foreground lg:text-lg">
                                    {item.answer}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-accent p-4 text-center md:rounded-xl md:p-6 lg:p-8">
                    <div className="relative">
                        <Avatar className="absolute mb-4 size-16 origin-bottom -translate-x-[60%] scale-[80%] border md:mb-5">
                            <AvatarImage src="https://shadcnblocks.com/images/block/avatar-2.webp" />
                            <AvatarFallback>SU</AvatarFallback>
                        </Avatar>
                        <Avatar className="absolute mb-4 size-16 origin-bottom translate-x-[60%] scale-[80%] border md:mb-5">
                            <AvatarImage src="https://shadcnblocks.com/images/block/avatar-3.webp" />
                            <AvatarFallback>SU</AvatarFallback>
                        </Avatar>
                        <Avatar className="mb-4 size-16 border md:mb-5">
                            <AvatarImage src="https://shadcnblocks.com/images/block/avatar-1.webp" />
                            <AvatarFallback>SU</AvatarFallback>
                        </Avatar>
                    </div>
                    <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">
                        {supportHeading}
                    </h3>
                    <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
                        {supportDescription}
                    </p>
                    <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
                        <Button className="w-full sm:w-auto" asChild>
                            <a href={supportButtonUrl} target="_blank">
                                {supportButtonText}
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;
