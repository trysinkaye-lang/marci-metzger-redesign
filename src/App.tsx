import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/home/Hero'
import { PerformanceStats } from './components/home/PerformanceStats'
import { EditorialInterlude } from './components/home/EditorialInterlude'
import { AboutMarci } from './components/home/AboutMarci'
import { PropertySearch } from './components/home/PropertySearch'
import { SellerExperience } from './components/home/SellerExperience'
import { BuyerExperience } from './components/home/BuyerExperience'
import { PropertyGallery } from './components/home/PropertyGallery'
import { Services } from './components/home/Services'
import { Contact } from './components/home/Contact'
import { useEditorialMotion } from './hooks/useEditorialMotion'

export default function App() {
  useEditorialMotion()

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <PerformanceStats />
        <EditorialInterlude />
        <AboutMarci />
        <PropertySearch />
        <SellerExperience />
        <BuyerExperience />
        <PropertyGallery />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
