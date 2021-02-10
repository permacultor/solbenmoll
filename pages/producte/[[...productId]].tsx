import Router, { useRouter } from 'next/router'
import Image from 'next/image'
import prisma from '../../lib/prisma'
import SelectButton from '../../components/SelectButton'

export async function getStaticProps({ params }) {
  const [type, id] = params.productId
  let product

  if (type === 'cistella') {
    product = await prisma.basket.findUnique({ where: { id } })
  } else {
    product = await prisma.extra.findUnique({ where: { id } })
  }

  return { props: { product } }
}

export async function getStaticPaths() {
  const baskets = await prisma.basket.findMany({ select: { id: true } })
  const extras = await prisma.extra.findMany({ select: { id: true } })
  const products = [
    ...baskets.map((p) => ['cistella', p.id]),
    ...extras.map((p) => ['extra', p.id]),
  ]

  return {
    paths: products.map((productId) => ({ params: { productId } })),
    fallback: false,
  }
}

function Product({ product }) {
  const { query } = useRouter()
  const [type, id] = query.productId as [string, string]
  const image = type === 'cistella' ? 'basket.png' : `${id}.png`

  return (
    <div className="content">
      <div className="product-page">
        <div>
          <Image
            alt={product.name}
            src={`/assets/${image}`}
            layout="intrinsic"
            loading="lazy"
            className="product-image-full"
            height={375}
            width={500}
          />
        </div>
        <div className="product-content">
          {product.menuName && (
            <h1 style={{ fontSize: 22, margin: 0 }}>{product.menuName}</h1>
          )}
          <h2 style={{ fontSize: 16, margin: 0 }}>
            {product.name} ({product.kg} Kg)
          </h2>
          <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
          <SelectButton
            onChange={(e) => {
              Router.push('/les-meves-cistelles').then(() =>
                window.scrollTo(0, 0)
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Product
