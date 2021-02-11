import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import styles from './LoginForm.module.scss'

function LoginForm() {
  const [error, setError] = useState('')
  const { t } = useTranslation('common')

  function onSubmit(e) {
    e.preventDefault()
    setError('error.login') // todo
  }

  return (
    <form className={styles.loginForm} onSubmit={onSubmit}>
      <label>{t`email`}:</label>
      <input required type="email" name="email" />
      <label>{t`password`}:</label>
      <input required type="password" name="email" />
      <button className="button">{t`enter`}</button>
      {error && (
        <div style={{ margin: 10 }} className="errorMsg">
          {t(error)}
        </div>
      )}
    </form>
  )
}

export default LoginForm
