import { Button } from '@/components/ui/button'
import { MapPin, Clock, Phone } from '@phosphor-icons/react'
import grupoAguetoniLogo from '@/assets/images/grupo-aguetoni-logo.svg'

export default function Hero() {
    const openWhatsApp = () => {
        const message = "Olá! Gostaria de saber mais sobre os serviços do PONTO A 🚗⛽"
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
    }

    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 gradient-bg opacity-90" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070')] bg-cover bg-center opacity-20" />
            
            {/* Header with Logo */}
            <header className="relative z-20 w-full">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <img 
                                src={grupoAguetoniLogo} 
                                alt="Grupo Aguetoni" 
                                className="h-12 w-auto"
                            />
                        </div>
                        <nav className="hidden md:flex items-center space-x-8 text-white">
                            <a href="#combustiveis" className="hover:text-white/80 transition-colors font-medium">Combustíveis</a>
                            <a href="#conveniencia" className="hover:text-white/80 transition-colors font-medium">Conveniência</a>
                            <a href="#sobre" className="hover:text-white/80 transition-colors font-medium">Sobre</a>
                            <Button 
                                variant="outline" 
                                className="border-white text-white hover:bg-white hover:text-primary"
                                onClick={openWhatsApp}
                            >
                                <Phone className="mr-2" size={16} weight="bold" />
                                Contato
                            </Button>
                        </nav>
                    </div>
                </div>
            </header>
            
            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-6 text-center text-white flex-1 flex items-center justify-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
                        PONTO A
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 opacity-90 font-medium">
                        Posto e Conveniência Premium
                    </p>
                    <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto leading-relaxed">
                        Combustível de qualidade, produtos selecionados e atendimento excepcional. 
                        Sua parada estratégica na cidade.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <Button 
                            size="lg" 
                            className="bg-white text-primary hover:bg-white/90 hover-lift text-lg px-8 py-4"
                            onClick={openWhatsApp}
                        >
                            <Phone className="mr-2" weight="bold" />
                            Fale Conosco
                        </Button>
                        <Button 
                            size="lg" 
                            variant="outline" 
                            className="border-white text-white hover:bg-white hover:text-primary hover-lift text-lg px-8 py-4"
                            onClick={() => document.getElementById('combustiveis')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Ver Produtos
                        </Button>
                    </div>

                    {/* Quick info cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        <div className="glass-card p-6 rounded-xl text-primary hover-lift">
                            <MapPin className="mx-auto mb-3" size={32} weight="bold" />
                            <p className="font-semibold">Localização Privilegiada</p>
                            <p className="text-sm opacity-75">Centro da cidade</p>
                        </div>
                        <div className="glass-card p-6 rounded-xl text-primary hover-lift">
                            <Clock className="mx-auto mb-3" size={32} weight="bold" />
                            <p className="font-semibold">24 Horas</p>
                            <p className="text-sm opacity-75">Todos os dias</p>
                        </div>
                        <div className="glass-card p-6 rounded-xl text-primary hover-lift">
                            <Phone className="mx-auto mb-3" size={32} weight="bold" />
                            <p className="font-semibold">WhatsApp Direto</p>
                            <p className="text-sm opacity-75">Pedidos rápidos</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-60">
                <div className="animate-bounce">
                    <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
                <p className="text-sm mt-2">Role para baixo</p>
            </div>
        </section>
    )
}