import { GetData } from '@/app/_components/GetData'
import styles from '@/app/page.module.css'

export default () => {
  return (
    <main className={styles.main}>
      <h1>Atcoder ランダム表示</h1>
      <GetData />
    </main>
  )
}
