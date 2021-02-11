import { useState } from 'react'
import Router from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import styles from './SelectButton.module.scss'

function SelectButton() {
  const { t } = useTranslation('my-baskets')
  const [value, setValue] = useState('1')
  const classes = [styles.selectButton]
  const options = [
    { label: t`freq-1`, value: '1' },
    { label: t`freq-2`, value: '2' },
    { label: t`freq-3`, value: '3' },
    { label: t`freq-4`, value: '4' },
  ]

  if (value) classes.push(styles.selected)

  return (
    <>
      <div className={styles.selectButtonWrapper}>
        <select
          value={value}
          className={classes.join(' ')}
          onChange={(e) => setValue(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input className={styles.number} min={1} type="number" value={1} />
      </div>
      <button
        onClick={() =>
          Router.push('/inici-sessio').then(() => window.scrollTo(0, 0))
        }
        className={`button ${styles.button}`}
      >
        {t`add-button`}
      </button>
    </>
  )
}

export default SelectButton
