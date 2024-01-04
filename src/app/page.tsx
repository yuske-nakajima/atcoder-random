import { GetData } from '@/app/_components/GetData'
import styles from '@/app/page.module.css'
import '@/styles/variables.css'
import Link from 'next/link'
import { FC } from 'react'

const Home: FC = () => {
  return (
    <main className={styles.main}>
      <Link href='/' className={styles.title}>
        <h1>Atcoder Random</h1>
      </Link>
      <GetData />
    </main>
  )
}
export default Home
