import Hero from '@/components/Hero'
import FuelSection from '@/components/FuelSection'
import ConvenienceSection from '@/components/ConvenienceSection'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/sonner'

function App() {
    return (
        <div className="min-h-screen bg-background">
            <Hero />
            <FuelSection />
            <ConvenienceSection />
            <AboutSection />
            <Footer />
            <Toaster />
        </div>
    )
}

export default App