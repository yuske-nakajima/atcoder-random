import styles from '@/app/_components/DataItem.module.css'
import Image from 'next/image'

type Props = {
  title: string
  image: string
  url: string
}

const OGPCard = ({ title, image, url }: Props) => {
  return (
    <a className={styles.ogpLink} href={url} target='_blank'>
      <Image
        className={styles.ogpImage}
        priority={true}
        src={image}
        alt={title}
        width={120}
        height={120}
      />
      <div className={styles.ogpInfo}>
        <h1 className={styles.ogpTitle}>{title}</h1>
        <p className={styles.ogpUrl}>{url}</p>
      </div>
    </a>
  )
}

export default OGPCard
