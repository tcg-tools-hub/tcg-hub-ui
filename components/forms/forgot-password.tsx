import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ComponentPropsWithoutRef } from "react"

export function ForgotPasswordForm({
    className,
    ...props
}: ComponentPropsWithoutRef<"form">) {
    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Criar conta</h1>
            </div>
            <div className="grid gap-6 grid-cols-2">
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="name">Nome</Label>
                    </div>
                    <Input id="name" type="text" required />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="last-name">Sobrenome</Label>
                    </div>
                    <Input id="last-name" type="text" required />
                </div>
                <div className="grid gap-2 col-span-2">
                    <div className="flex items-center">
                        <Label htmlFor="cpf">CPF</Label>
                    </div>
                    <Input id="cpf" type="text" required />
                </div>
                <div className="grid gap-2 col-span-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="m@exemplo.com" required />
                </div>
                <div className="grid gap-2 col-span-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Senha</Label>
                    </div>
                    <Input id="password" type="password" required />
                </div>

                <Button type="submit" className="w-full col-span-2">
                    Criar Conta
                </Button>
            </div>
        </form>
    )
}
