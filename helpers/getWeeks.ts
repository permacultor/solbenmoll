export default function getWeeks(lang = 'ca') {
  const dayCursor = new Date()

  return Array.from({ length: 12 }).map(() => {
    const res = getWeek(dayCursor, lang)
    dayCursor.setDate(dayCursor.getDate() + 7)
    return res
  })
}

function setTwelveOclock(date) {
  date.setHours(12)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
}

function getMonday(d) {
  const date = new Date(d)
  setTwelveOclock(date)
  const day = date.getDay()
  const diff = date.getDate() - day + (day == 0 ? -6 : 1)
  return new Date(date.setDate(diff))
}

function getSunday(d) {
  const date = new Date(d)
  setTwelveOclock(date)
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
  const id = `${monday.getTime()}-${sunday.getTime()}`

  return { monday, sunday, name, id }
}
