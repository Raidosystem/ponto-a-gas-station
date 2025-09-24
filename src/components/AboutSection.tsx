import { Card } from '@/components/ui/card'
import { MapPin, Clock, Phone, Shield, Medal, Users } from '@phosphor-icons/react'
import AnimatedSection from '@/components/AnimatedSection'
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation'
import { motion } from 'framer-motion'

export default function AboutSection() {
    const featureAnimations = useStaggeredAnimation(3, 0.2)
    const contactAnimations = useStaggeredAnimation(3, 0.15)
    
    const features = [
        {
            icon: Shield,
            title: 'Qualidade Garantida',
            description: 'Combustível certificado e produtos selecionados com rigoroso controle de qualidade.'
        },
        {
            icon: Medal,
            title: 'Tradição na Região',
            description: 'Mais de 15 anos servindo a comunidade com excelência e confiabilidade.'
        },
        {
            icon: Users,
            title: 'Atendimento Premium',
            description: 'Equipe treinada para oferecer o melhor atendimento e experiência personalizada.'
        }
    ]

    const openLocationWhatsApp = () => {
        const message = "Olá! Gostaria de saber como chegar ao PONTO A 📍"
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
    }

    return (
        <AnimatedSection id="sobre" className="py-20 bg-muted/20">
            <div className="container mx-auto px-6">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Sobre o PONTO A
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Seu posto de referência na cidade. Combinamos tradição, qualidade e inovação 
                        para oferecer a melhor experiência em combustível e conveniência.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className="text-3xl font-bold mb-6">Nossa História</h3>
                        <div className="prose prose-lg text-muted-foreground">
                            <p className="mb-4">
                                Fundado com o compromisso de servir nossa comunidade com excelência, 
                                o PONTO A se tornou referência em qualidade e atendimento na região.
                            </p>
                            <p className="mb-4">
                                Nossa paixão por servir bem nos levou a criar um espaço que vai além 
                                do simples abastecimento - oferecemos uma experiência completa com 
                                produtos cuidadosamente selecionados e atendimento personalizado.
                            </p>
                            <p>
                                Hoje, orgulhamo-nos de ser o ponto de encontro preferido para quem 
                                busca qualidade, conveniência e um atendimento que faz a diferença.
                            </p>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        className="grid grid-cols-1 gap-6"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon
                            const animation = featureAnimations[index]
                            return (
                                <motion.div
                                    key={index}
                                    initial={animation.initial}
                                    whileInView={animation.animate}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={animation.transition}
                                    whileHover={{ y: -3, scale: 1.02 }}
                                >
                                    <Card className="p-6 hover-lift bg-card/80 backdrop-blur-sm">
                                        <div className="flex items-start space-x-4">
                                            <motion.div 
                                                className="p-3 rounded-xl bg-primary/10 shrink-0"
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <IconComponent size={24} className="text-primary" weight="bold" />
                                            </motion.div>
                                            <div>
                                                <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                                                <p className="text-muted-foreground">{feature.description}</p>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>

                {/* Location and Contact Info with staggered animation */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    {[
                        {
                            icon: MapPin,
                            iconColor: 'text-primary',
                            bgColor: 'bg-primary/10',
                            title: 'Localização',
                            content: (
                                <>
                                    <p className="text-muted-foreground mb-4">
                                        Av. Principal, 1234<br />
                                        Centro - São Paulo/SP<br />
                                        CEP: 01000-000
                                    </p>
                                    <button 
                                        onClick={openLocationWhatsApp}
                                        className="text-primary hover:text-primary/80 font-medium transition-colors"
                                    >
                                        Ver no mapa →
                                    </button>
                                </>
                            )
                        },
                        {
                            icon: Clock,
                            iconColor: 'text-secondary',
                            bgColor: 'bg-secondary/10',
                            title: 'Funcionamento',
                            content: (
                                <div className="text-muted-foreground space-y-1">
                                    <p><strong>Segunda a Domingo:</strong></p>
                                    <p>24 horas</p>
                                    <p className="text-sm mt-3 text-primary font-medium">
                                        ⭐ Sempre aberto para você
                                    </p>
                                </div>
                            )
                        },
                        {
                            icon: Phone,
                            iconColor: 'text-accent-foreground',
                            bgColor: 'bg-accent/10',
                            title: 'Contato',
                            content: (
                                <div className="text-muted-foreground space-y-2">
                                    <p>📞 (11) 99999-9999</p>
                                    <p>📧 contato@pontoa.com.br</p>
                                    <p className="text-sm mt-3">
                                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        WhatsApp disponível 24h
                                    </p>
                                </div>
                            )
                        }
                    ].map((contact, index) => {
                        const IconComponent = contact.icon
                        const animation = contactAnimations[index]
                        return (
                            <motion.div
                                key={index}
                                initial={animation.initial}
                                whileInView={animation.animate}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={animation.transition}
                                whileHover={{ y: -5 }}
                            >
                                <Card className="p-8 text-center hover-lift bg-card/80 backdrop-blur-sm">
                                    <motion.div 
                                        className={`p-4 rounded-xl ${contact.bgColor} w-fit mx-auto mb-4`}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <IconComponent size={32} className={contact.iconColor} weight="bold" />
                                    </motion.div>
                                    <h3 className="font-semibold text-xl mb-3">{contact.title}</h3>
                                    {contact.content}
                                </Card>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </AnimatedSection>
    )
}