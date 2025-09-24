import Hero from '@/components/Hero'
import FuelSection from '@/components/FuelSection'
import ConvenienceSection from '@/components/ConvenienceSection'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
import FloatingPriceTicker from '@/components/FloatingPriceTicker'
import PriceAlertSystem from '@/components/PriceAlertSystem'
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator'
import { Toaster } from '@/components/ui/sonner'

function App() {
    return (
        <div className="min-h-screen bg-background">
            <ScrollProgressIndicator />
            <Hero />
            <FuelSection />
            <ConvenienceSection />
            <AboutSection />
            <Footer />
            <FloatingPriceTicker />
            <PriceAlertSystem />
            <Toaster />
        </div>
    )
}

export default App