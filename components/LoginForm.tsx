import useTranslation from 'next-translate/useTranslation'
import styles from './LoginForm.module.scss'

function LoginForm({ csrfToken }) {
  const { t } = useTranslation('common')

  return (
    <form
      className={styles.loginForm}
      action="/api/auth/signin/email"
      method="post"
    >
      <label>{t`email`}:</label>
      <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
      <input required type="email" name="email" />
      <button className="button">{t`enter`}</button>
    </form>
  )
}

export default LoginForm
