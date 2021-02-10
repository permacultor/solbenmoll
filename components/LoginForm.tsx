import styles from './LoginForm.module.scss'

function LoginForm() {
  return (
    <form className={styles.loginForm}>
      <label>E-mail:</label>
      <input required type="email" name="email" />
      <label>Contrasenya:</label>
      <input required type="password" name="email" />
      <button className="button">Entrar</button>
    </form>
  )
}

export default LoginForm
