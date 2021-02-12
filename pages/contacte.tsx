import useTranslation from 'next-translate/useTranslation'
import Breadcrumb from '../components/Breadcrumb'
import InstaIcon from '../components/Icons/Insta'
import MailIcon from '../components/Icons/Mail'
import PhoneIcon from '../components/Icons/Phone'

function Contacte() {
  const { t } = useTranslation('contact')
  const title = t`title`
  const containerStyles = { display: 'flex', alignItems: 'center', margin: 5 }

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
      <h1>{title}</h1>
      <div style={containerStyles}>
        <MailIcon width={18} height={18} />
        <a
          style={{ marginLeft: 10 }}
          href="mailto:contacte@solbenmoll.com"
          target="_blank"
        >
          contacte@solbenmoll.com
        </a>
      </div>
      <div style={containerStyles}>
        <PhoneIcon width={18} height={18} />
        <a style={{ marginLeft: 10 }} href="tel:+34644962008" target="_blank">
          +34 644 96 20 08
        </a>
      </div>
      <div style={containerStyles}>
        <InstaIcon width={18} height={18} />
        <a
          style={{ marginLeft: 10 }}
          href="https://www.instagram.com/solbenmoll"
          target="_blank"
        >
          @solbenmoll
        </a>
      </div>
    </div>
  )
}

export default Contacte
