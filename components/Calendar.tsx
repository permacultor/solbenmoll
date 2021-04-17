import useTranslation from 'next-translate/useTranslation'
import calcPrice from '../helpers/calcPrice'
import styles from './Calendar.module.scss'

const defaultSubs = {
  petita: {},
  mitjana: {},
  gran: {},
  ous: {},
  ceba: {},
  fruita: {},
}

function Calendar({
  exceptions = {},
  subscription = defaultSubs,
  onClickSubscription = (v) => {},
  ...props
}) {
  const { t, lang } = useTranslation('my-baskets')
  const weeks = getWeeks(lang)

  return (
    <div className={styles.calendar} {...props}>
      {weeks.map((week, index) => {
        const sub = exceptions[week.name] || subscription
        const pActive = index % parseInt(sub.petita.time) === 0
        const mActive = index % parseInt(sub.mitjana.time) === 0
        const gActive = index % parseInt(sub.gran.time) === 0
        const oActive = index % parseInt(sub.ous.time) === 0
        const fActive = index % parseInt(sub.fruita.time) === 0
        const cActive = index % parseInt(sub.ceba.time) === 0
        const active = pActive || mActive || gActive

        return (
          <div
            key={week.name}
            title={active ? 'Editar contingut setmana' : undefined}
            onClick={
              active ? () => onClickSubscription({ ...sub, week }) : undefined
            }
            className={`${styles.day} ${active ? styles.active : ''}`}
          >
            {active ? (
              <b style={{ marginBottom: 15 }}>{week.name}</b>
            ) : (
              week.name
            )}
            {active && (
              <>
                {sub.petita.count > 0 && pActive && (
                  <div>
                    <b>{`${sub.petita.count}x `}</b>
                    {t(`product-petita`) + ' 🥑'}
                  </div>
                )}
                {sub.mitjana.count > 0 && mActive && (
                  <div>
                    <b>{`${sub.mitjana.count}x `}</b>
                    {t(`product-mitjana`) + ' 🥦'}
                  </div>
                )}
                {sub.gran.count > 0 && gActive && (
                  <div>
                    <b>{`${sub.gran.count}x `}</b>
                    {t(`product-gran`) + ' 🥬'}
                  </div>
                )}
                {sub.ous.count > 0 && oActive && (
                  <div>
                    <b>{`${sub.ous.count}x `}</b>
                    {t(`product-ous`) + ' 🥚'}
                  </div>
                )}
                {sub.fruita.count > 0 && fActive && (
                  <div>
                    <b>{`${sub.fruita.count}x `}</b>
                    {t(`product-fruita`) + ' 🍇'}
                  </div>
                )}
                {sub.ceba.count > 0 && cActive && (
                  <div>
                    <b>{`${sub.ceba.count}x `}</b>
                    {t(`product-ceba`) + ' 🧅'}
                  </div>
                )}
                <div
                  style={{ textAlign: 'end', marginTop: 'auto' }}
                  className="price"
                >{`${calcPrice(sub)} €`}</div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

function getMonday(d) {
  const date = new Date(d)
  date.setHours(12)
  const day = date.getDay()
  const diff = date.getDate() - day + (day == 0 ? -6 : 1)
  return new Date(date.setDate(diff))
}

function getSunday(d) {
  const date = new Date(d)
  date.setHours(12)
  const today = date.getDate()
  const dayOfTheWeek = date.getDay()
  const newDate = date.setDate(today - dayOfTheWeek + 7)
  return new Date(newDate)
}

function getWeek(date, lang) {
  const locale = `${lang}-${lang.toUpperCase()}`

  const monday = getMonday(date)
  const mondayName = monday.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
  })

  const sunday = getSunday(date)
  const sundayName = sunday.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const name = `${mondayName} - ${sundayName}`.replace(/de /g, '')

  return { monday, sunday, name }
}

function getWeeks(lang = 'ca') {
  const dayCursor = new Date()

  return Array.from({ length: 12 }).map(() => {
    const res = getWeek(dayCursor, lang)
    dayCursor.setDate(dayCursor.getDate() + 7)
    return res
  })
}

export default Calendar
