import { LoginForm } from "@/components/forms/login"
import loginPicture from '@/public/images/login.jpg'
import FormWithImage from "@/components/forms/form-with-image"

const LoginPage = () => {
  return (
    <FormWithImage imageSrc={loginPicture}>
      <LoginForm />
    </FormWithImage>
  )
}

export default LoginPage;