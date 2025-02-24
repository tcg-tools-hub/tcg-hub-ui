"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ComponentPropsWithoutRef, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function LoginForm({
  className,
  ...props
}: ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }

      toast.success("Usuário autenticado com sucesso!")

      const { token, gameStoreId } = await response.json();

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("gameStoreId", gameStoreId);

      router.push("/dashboard");
    } catch (error) {
      toast.error("Erro ao realizar login.")
      console.error("Erro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Faça login na sua conta</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Digite seu e-mail abaixo para fazer login na sua conta
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {/* Spinner */}
              Carregando...
            </>
          ) : (
            "Entrar"
          )}
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
