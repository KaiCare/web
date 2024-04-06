import Banner from './components/Banner/index';
import Work from './components/Work/index';
import Mission from './components/Mission/index';
import Vision from './components/Vision/index';
import Values from './components/Values/index';
import Expert from './components/Expert/index';
import Newsletter from './components/Newsletter/Newsletter';
import { MinusSmallIcon } from '@heroicons/react/24/outline';



export default function Home() {
  return (
    <main>
      <Banner />
      <Work />
      <Mission />
      <Vision />
      <Values />
      <Expert />
      <Newsletter />
    </main>
  )
}
