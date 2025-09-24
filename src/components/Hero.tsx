import { Button } from '@/components/ui/button'
import { MapPin, Clock, Phone } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import grupoAguetoniLogo from '@/assets/images/grupo-aguetoni-logo.svg'
import SmoothScrollNav from '@/components/SmoothScrollNav'
import { useSmoothScroll } from '@/hooks/useScrollAnimation'

export default function Hero() {
    const { scrollToSection } = useSmoothScroll()
    
    const openWhatsApp = () => {
        const message = "Olá! Gostaria de saber mais sobre os serviços do PONTO A 🚗⛽"
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
    }

    const navItems = [
        { id: 'combustiveis', label: 'Combustíveis' },
        { id: 'conveniencia', label: 'Conveniência' },
        { id: 'sobre', label: 'Sobre' }
    ]

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
                            <SmoothScrollNav items={navItems} className="flex items-center space-x-8" />
                            <Button 
                                variant="outline" 
                                className="border-white text-white hover:bg-white hover:text-primary ml-8"
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
                <motion.div 
                    className="max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <motion.h1 
                        className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        PONTO A
                    </motion.h1>
                    <motion.p 
                        className="text-xl md:text-2xl mb-8 opacity-90 font-medium"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Posto e Conveniência Premium
                    </motion.p>
                    <motion.p 
                        className="text-lg mb-12 opacity-80 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        Combustível de qualidade, produtos selecionados e atendimento excepcional. 
                        Sua parada estratégica na cidade.
                    </motion.p>
                    
                    <motion.div 
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
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
                            onClick={() => scrollToSection('combustiveis', 80)}
                        >
                            Ver Produtos
                        </Button>
                    </motion.div>

                    {/* Quick info cards with staggered animation */}
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                    >
                        {[
                            { icon: MapPin, title: "Localização Privilegiada", subtitle: "Centro da cidade" },
                            { icon: Clock, title: "24 Horas", subtitle: "Todos os dias" },
                            { icon: Phone, title: "WhatsApp Direto", subtitle: "Pedidos rápidos" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="glass-card p-6 rounded-xl text-primary hover-lift"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <item.icon className="mx-auto mb-3" size={32} weight="bold" />
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-sm opacity-75">{item.subtitle}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Animated scroll indicator */}
            <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-60 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1, delay: 2 }}
                onClick={() => scrollToSection('combustiveis', 80)}
                whileHover={{ opacity: 1, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
                <p className="text-sm mt-2">Role para baixo</p>
            </motion.div>
        </section>
    )
}