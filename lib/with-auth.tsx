"use client"

import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { GET_CURRENT_USER } from './queries/user';

type WithAuthProps = {
  // Adicione aqui as props que o componente envolvido pode receber
};

type ComponentType = React.ComponentType<WithAuthProps>;

const withAuth = (WrappedComponent: ComponentType) => {
  const WithAuthWrapper = (props: WithAuthProps) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { data, loading, error } = useQuery(GET_CURRENT_USER, { variables: { email: "lucasguissgusmao@gmail.com"}});

    useEffect(() => {
      if (!loading && !error && data?.me) {
        setIsAuthenticated(true);
      } else if (error) {
        router.push('/login');
      }
    }, [data, loading, error, router]);

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthWrapper.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthWrapper;
};

export default withAuth;