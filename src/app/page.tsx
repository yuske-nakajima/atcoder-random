import { GetData } from '@/app/_components/GetData'
import styles from '@/app/page.module.css'
import { FC } from 'react'

const Home: FC = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Atcoder Random</h1>
      <GetData />
    </main>
  )
}
export default Home
