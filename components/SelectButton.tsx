import { useState } from 'react'
import styles from './SelectButton.module.scss'

function SelectButton({ onChange }) {
  const [value, setValue] = useState('1')
  const classes = [styles.selectButton]
  const options = [
    { label: 'Cada setmana', value: '1' },
    { label: 'Cada 2 setmanes', value: '2' },
    { label: 'Cada 3 setmanes', value: '3' },
    { label: 'Cada mes', value: '4' },
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
        onClick={() => onChange(value)}
        className={`button ${styles.button}`}
      >
        Afageix a la subscripció
      </button>
    </>
  )
}

export default SelectButton
