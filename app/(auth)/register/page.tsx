import loginPicture from '@/public/images/login.jpg'
import { RegisterForm } from "@/components/forms/register"
import FormWithImage from "@/components/forms/form-with-image"

const RegisterPage = () => {
  return (
    <FormWithImage imageSrc={loginPicture}>
      <RegisterForm />
    </FormWithImage>
  )
}

export default RegisterPage