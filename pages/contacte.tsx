import useTranslation from 'next-translate/useTranslation'

function Contacte() {
  const { t } = useTranslation('contact')

  return (
    <div className="content">
      <h1>{t`title`}</h1>
    </div>
  )
}

export default Contacte
