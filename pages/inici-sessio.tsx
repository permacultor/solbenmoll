import { csrfToken, getSession } from 'next-auth/client'
import useTranslation from 'next-translate/useTranslation'
import Breadcrumb from '../components/Breadcrumb'
import LoginForm from '../components/LoginForm'

function Login({ csrfToken }) {
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
      <LoginForm csrfToken={csrfToken} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const { res } = context
  const session = await getSession(context)

  if (session && res && session.accessToken) {
    res.writeHead(302, { Location: '/' })
    res.end()
    return {}
  }

  return {
    props: {
      csrfToken: await csrfToken(context),
    },
  }
}

export default Login
