import { useRouter } from 'next/router'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import prisma from '../../lib/prisma'
import SelectButton from '../../components/SelectButton'

export async function getStaticProps({ params }) {
  const [type, id] = params.productId
  const selectB = { id: true, kg: true, price: true, products: true }
  let product

  if (type === 'cistella') {
    product = await prisma.basket.findUnique({ select: selectB, where: { id } })
  } else {
    product = await prisma.extra.findUnique({ where: { id } })
  }

  return { props: { product } }
}

export async function getStaticPaths({ locales }) {
  const where = { available: true }
  const select = { id: true }
  const baskets = await prisma.basket.findMany({ select, where })
  const extras = await prisma.extra.findMany({ select, where })
  const products = [
    ...baskets.map((p) => ['cistella', p.id]),
    ...extras.map((p) => ['extra', p.id]),
  ]
  const paths = locales.flatMap((locale) =>
    products.map((productId) => ({ params: { productId }, locale }))
  )

  return {
    paths,
    fallback: false,
  }
}

function Product({ product }) {
  const { query } = useRouter()
  const { t, lang } = useTranslation('my-baskets')
  const [type, id] = query.productId as [string, string]
  const basket = type === 'cistella'
  const textType = basket ? 'basket' : 'extra'
  const image = basket ? 'basket.png' : `${id}.png`
  const name = t(`name-${textType}-${id}`)
  const description = t(`description-${textType}-${id}`)
  const details = t(
    basket ? `details-${textType}` : `details-${textType}-${id}`,
    {
      count: product.products?.length,
      kg: product.kg,
      price: product.price,
    }
  )

  return (
    <div className="content">
      <h1 style={{ fontSize: 22, margin: 0 }}>{name}</h1>
      <h2 style={{ fontSize: 16, margin: '0 0 15px 0' }}>{details}</h2>
      <div className="product-page">
        <div>
          <Image
            alt={details}
            src={`/assets/${image}`}
            layout="intrinsic"
            loading="lazy"
            className="product-image-full"
            height={375}
            width={500}
          />
        </div>
        <div className="product-content">
          <p>{description}</p>
          {basket && <p>{t`what-include`}</p>}
          {product.products && (
            <ul>
              {product.products.map((p) => (
                <li key={p.name}>{lang === 'ca' ? p.name : p.nameEs}</li>
              ))}
            </ul>
          )}
          <div
            style={{
              fontWeight: 'bold',
              marginRight: 10,
              color: '#99b67e',
              fontSize: 22,
              width: 'calc(100% - 20px)',
              textAlign: 'right',
            }}
          >
            {product.price} €
          </div>
          <SelectButton />
        </div>
      </div>
    </div>
  )
}

export default Product
