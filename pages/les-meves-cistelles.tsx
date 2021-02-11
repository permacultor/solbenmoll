import useTranslation from 'next-translate/useTranslation'
import Calendar from '../components/Calendar'
import ProductWidget from '../components/ProductWidget'
import prisma from '../lib/prisma'

export async function getStaticProps() {
  const query = {
    select: { id: true, price: true },
    where: { available: true },
    orderBy: { price: 'asc' },
  } as any
  const baskets = await prisma.basket.findMany(query)
  const extras = await prisma.extra.findMany(query)
  return { props: { baskets, extras } }
}

function MyBaskets({ baskets, extras }) {
  const { t } = useTranslation('my-baskets')

  function scrollToCalendar() {
    const calendar = document.querySelector('#calendar')
    const position = calendar.getBoundingClientRect()
    window.scrollTo({
      top: position.top + window.scrollY - 100,
      behavior: 'smooth',
    })
  }

  return (
    <div className="content">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: 10,
        }}
      >
        <h1 style={{ margin: 0 }}>{t`title`}</h1>
        <button
          style={{ marginLeft: 'auto' }}
          className="button"
          onClick={scrollToCalendar}
        >
          {t`view-calendar`}
        </button>
      </div>

      <div className="my-baskets">
        {baskets.map((basket) => (
          <ProductWidget key={basket.id} product={basket} />
        ))}
        {extras.map((extra) => (
          <ProductWidget key={extra.id} product={extra} type="extra" />
        ))}
      </div>
      <h2 id="calendar" style={{ marginTop: 50 }}>
        {t`next-weeks-baskets`}
      </h2>
      <Calendar id="calendar" />
    </div>
  )
}

export default MyBaskets
