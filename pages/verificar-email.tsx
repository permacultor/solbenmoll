import useTranslation from 'next-translate/useTranslation'
import Breadcrumb from '../components/Breadcrumb'

function VerifyEmail() {
  const { t } = useTranslation('common')
  const title = t`verify-email`

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
      Verify email page... (@todo)
    </div>
  )
}

export default VerifyEmail
