import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ComponentPropsWithoutRef } from "react"

export function LoginForm({
  className,
  ...props
}: ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Faça login na sua conta</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Digite seu e-mail abaixo para fazer login na sua conta
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" placeholder="m@exemplo.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            {/* <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </a> */}
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </div>
      {/* <div className="text-center text-sm">
        Não tem uma conta?{" "}
        <Link href="/register" className="underline underline-offset-4">
          Inscreva-se
        </Link>
      </div> */}
    </form>
  )
}
