import { ForgotPasswordForm } from "@/components/forms/forgot-password"
import FormWithImage from "@/components/forms/form-with-image"
import loginPicture from '@/public/images/login.jpg'

const ForgotPasswordPage = () => {
    return (
        <FormWithImage imageSrc={loginPicture}>
            <ForgotPasswordForm />
        </FormWithImage>
    )
}

export default ForgotPasswordPage