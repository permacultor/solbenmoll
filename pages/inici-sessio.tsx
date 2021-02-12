import useTranslation from 'next-translate/useTranslation'
import Breadcrumb from '../components/Breadcrumb'
import LoginForm from '../components/LoginForm'

function Login() {
  const { t } = useTranslation('common')
  const title = t`login`

  return (
    <div className="content">
      <Breadcrumb
        currentPageName={title}
        links={[
          {
            href: '/',
            name: 'common:home',
          },
        ]}
      />
      <h1 className="center">{title}</h1>
      <p className="center">{t`login-description`}</p>
      <LoginForm />
    </div>
  )
}

export default Login
