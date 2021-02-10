import Image from 'next/image'
import Link from 'next/link'
import SelectButton from './SelectButton'

import styles from './ProductWidget.module.scss'

function ProductWidget({ link, image, menuName, name, price }) {
  return (
    <div className={styles.productWidget}>
      <Link href={link}>
        <a title={name} className="product-image-link">
          <Image
            alt={name}
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
      <h2 title={name}>
        <Link href={link}>
          <a>{menuName}</a>
        </Link>
        <span className={styles.price}>{price} €</span>
      </h2>
      <SelectButton />
    </div>
  )
}

export default ProductWidget
