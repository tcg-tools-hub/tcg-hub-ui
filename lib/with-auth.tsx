"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type WithAuthProps = {
  // Adicione aqui as props que o componente envolvido pode receber
};

type ComponentType = React.ComponentType<WithAuthProps>;

const withAuth = (WrappedComponent: ComponentType) => {
  const WithAuthWrapper = (props: WithAuthProps) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento

    useEffect(() => {
      // Verifica se o usuário está autenticado (token e email no sessionStorage)
      const token = sessionStorage.getItem("token");
      const email = sessionStorage.getItem("email");

      if (token && email) {
        setIsAuthenticated(true);
      } else {
        // Redireciona para a página de login se não estiver autenticado
        toast.error("Usuário não autenticado, por favor realize o login.")
        router.push("/login");
      }

      setIsLoading(false); // Finaliza o carregamento
    }, [router]);

    if (isLoading) {
      return <p>Loading...</p>; // Exibe um indicador de carregamento
    }

    if (!isAuthenticated) {
      return null; // Não renderiza o componente se não estiver autenticado
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthWrapper.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return WithAuthWrapper;
};

export default withAuth;