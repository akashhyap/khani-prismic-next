import { PrismicRichText } from '@prismicio/react'

const RichText = ({ field, className, id }) => {
  return (
    field && (
      <div className={className} id={id}>
        <PrismicRichText field={field} />
      </div>
    )
  )
}

export default RichText