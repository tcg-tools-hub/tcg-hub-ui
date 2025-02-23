import { useMutation } from "@apollo/client"
import { LOGIN } from "../mutations/login"

type LoginResponse = {
    data: { 
        signIn: {
            token: string
        }
    }
}

const useLogin = () => {
    const [login, { data, loading, error }] = useMutation<LoginResponse>(LOGIN)

    return {
        login,
        data,
        isLoadingLogin: loading,
        isLoginError: error
    }
}

export default useLogin;