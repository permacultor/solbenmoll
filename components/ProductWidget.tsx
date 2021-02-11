import Image from 'next/image'
import Link from 'next/link'
import SelectButton from './SelectButton'

import styles from './ProductWidget.module.scss'
import useTranslation from 'next-translate/useTranslation'

function ProductWidget({ type = 'basket', product }) {
  const { t } = useTranslation('my-baskets')
  const { id, price } = product
  const basket = type === 'basket'
  const link = `/producte/${basket ? 'cistella' : type}/${id}`
  const image = `/assets/${basket ? 'basket' : id}.png`
  const name = t(`name-${type}-${id}`)
  const details = t(`details-${type}-${id}`)

  return (
    <div className={styles.productWidget}>
      <Link href={link}>
        <a title={details} className="product-image-link">
          <Image
            alt={details}
            src={image}
            placeholder="blur"
            layout="intrinsic"
            className="product-image"
            loading="lazy"
            height={375}
            width={500}
          />
        </a>
      </Link>
      <h2 title={details}>
        <Link href={link}>
          <a>{name}</a>
        </Link>
        <span className={styles.price}>{price} €</span>
      </h2>
      <SelectButton />
    </div>
  )
}

export default ProductWidget
