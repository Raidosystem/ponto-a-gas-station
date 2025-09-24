import { Button } from '@/components/ui/button'
import { MapPin, Clock, Phone, InstagramLogo, FacebookLogo, WhatsappLogo } from '@phosphor-icons/react'
import { useSmoothScroll } from '@/hooks/useScrollAnimation'
import { motion } from 'framer-motion'

export default function Footer() {
    const { scrollToSection } = useSmoothScroll()
    
    const openWhatsApp = () => {
        const message = "Olá! Vim através do site do PONTO A e gostaria de mais informações 😊"
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
    }

    const openInstagram = () => {
        window.open('https://instagram.com/pontoaposto', '_blank')
    }

    const openFacebook = () => {
        window.open('https://facebook.com/pontoaposto', '_blank')
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <h3 className="text-3xl font-bold mb-4">PONTO A</h3>
                        <p className="text-primary-foreground/80 mb-6 text-lg leading-relaxed">
                            Seu posto e conveniência de referência. Qualidade, conveniência e 
                            atendimento premium em um só lugar.
                        </p>
                        <div className="flex space-x-4">
                            <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                                onClick={openWhatsApp}
                            >
                                <WhatsappLogo className="mr-2" weight="bold" />
                                WhatsApp
                            </Button>
                            <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                                onClick={openInstagram}
                            >
                                <InstagramLogo className="mr-2" weight="bold" />
                                Instagram
                            </Button>
                            <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                                onClick={openFacebook}
                            >
                                <FacebookLogo className="mr-2" weight="bold" />
                                Facebook
                            </Button>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-xl mb-4">Contato</h4>
                        <div className="space-y-3 text-primary-foreground/80">
                            <div className="flex items-start space-x-3">
                                <MapPin className="shrink-0 mt-1" size={18} weight="bold" />
                                <div>
                                    <p>Av. Principal, 1234</p>
                                    <p>Centro - São Paulo/SP</p>
                                    <p>CEP: 01000-000</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="shrink-0" size={18} weight="bold" />
                                <p>(11) 99999-9999</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Clock className="shrink-0" size={18} weight="bold" />
                                <p>24 horas - Todos os dias</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-xl mb-4">Links Rápidos</h4>
                        <div className="space-y-2">
                            <button 
                                onClick={() => scrollToSection('combustiveis', 80)}
                                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                            >
                                Combustíveis
                            </button>
                            <button 
                                onClick={() => scrollToSection('conveniencia', 80)}
                                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                            >
                                Conveniência
                            </button>
                            <button 
                                onClick={() => scrollToSection('sobre', 80)}
                                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                            >
                                Sobre Nós
                            </button>
                            <button 
                                onClick={openWhatsApp}
                                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                            >
                                Fazer Pedido
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-primary-foreground/20 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-primary-foreground/60 text-sm">
                            © 2024 PONTO A. Todos os direitos reservados.
                        </p>
                        <div className="flex items-center space-x-4 mt-4 md:mt-0">
                            <button 
                                onClick={scrollToTop}
                                className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors"
                            >
                                Voltar ao topo ↑
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* WhatsApp Float Button with enhanced animation */}
            <motion.div 
                className="fixed bottom-6 right-6 z-50"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <motion.div
                    animate={{ 
                        y: [0, -5, 0],
                        boxShadow: [
                            "0 10px 30px rgba(34, 197, 94, 0.3)",
                            "0 15px 40px rgba(34, 197, 94, 0.5)",
                            "0 10px 30px rgba(34, 197, 94, 0.3)"
                        ]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Button
                        size="lg"
                        className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-2xl"
                        onClick={openWhatsApp}
                    >
                        <WhatsappLogo size={28} weight="bold" />
                    </Button>
                </motion.div>
            </motion.div>
        </footer>
    )
}