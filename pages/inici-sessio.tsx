import useTranslation from 'next-translate/useTranslation'
import LoginForm from '../components/LoginForm'

function Login() {
  const { t } = useTranslation('common')

  return (
    <div className="content">
      <h1 className="center">{t`login`}</h1>
      <p className="center">{t`login-description`}</p>
      <LoginForm />
    </div>
  )
}

export default Login
