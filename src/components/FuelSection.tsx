import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Drop, Lightning, Car, Phone, ArrowClockwise } from '@phosphor-icons/react'
import AnimatedPriceDisplay, { LiveIndicator } from '@/components/AnimatedPriceDisplay'
import FuelPriceChart from '@/components/FuelPriceChart'
import { useRealTimeFuelPrices } from '@/hooks/useRealTimeFuelPrices'
import { motion } from 'framer-motion'

export default function FuelSection() {
    const { fuelPrices, isLoading, updateFuelPrices, lastUpdateTime } = useRealTimeFuelPrices()

    // Icon mapping
    const iconMap = {
        'gasolina-comum': Car,
        'gasolina-aditivada': Lightning,
        'etanol': Drop,
        'diesel-s10': Car
    }

    const openFuelWhatsApp = (fuel: any) => {
        const message = `Olá! Gostaria de abastecer com ${fuel.name} (R$ ${fuel.price.toFixed(2)}/L) no PONTO A 🚗⛽`
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
    }

    const formatLastUpdate = (date: Date) => {
        return date.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit'
        })
    }

    return (
        <section id="combustiveis" className="py-20 bg-muted/30">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Combustíveis
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
                        Preços atualizados em tempo real com combustível de qualidade garantida. 
                        Consulte disponibilidade via WhatsApp.
                    </p>
                    
                    {/* Live indicator and manual update button */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <LiveIndicator />
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={updateFuelPrices}
                            disabled={isLoading}
                            className="flex items-center gap-2"
                        >
                            <motion.div
                                animate={isLoading ? { rotate: 360 } : {}}
                                transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
                            >
                                <ArrowClockwise size={16} />
                            </motion.div>
                            {isLoading ? 'Atualizando...' : 'Atualizar Preços'}
                        </Button>
                        {lastUpdateTime && (
                            <span className="text-sm text-muted-foreground">
                                Última atualização: {formatLastUpdate(lastUpdateTime)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {fuelPrices?.map((fuel) => {
                        const IconComponent = iconMap[fuel.id as keyof typeof iconMap] || Car
                        return (
                            <motion.div
                                key={fuel.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Card className="p-0 overflow-hidden hover-lift bg-card/80 backdrop-blur-sm">
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-3 rounded-xl bg-primary/10">
                                                <IconComponent size={32} className="text-primary" weight="bold" />
                                            </div>
                                            {fuel.badge && (
                                                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                                                    {fuel.badge}
                                                </Badge>
                                            )}
                                        </div>
                                        
                                        <h3 className="text-xl font-bold mb-2">{fuel.name}</h3>
                                        <p className="text-muted-foreground text-sm mb-4">{fuel.description}</p>
                                        
                                        {/* Animated Price Display */}
                                        <div className="flex items-center justify-between mb-6">
                                            <AnimatedPriceDisplay 
                                                price={fuel.price}
                                                previousPrice={fuel.previousPrice}
                                                label="por litro"
                                                className="flex-1"
                                            />
                                            <div className={`px-3 py-1 rounded-full text-sm font-medium ml-4 ${
                                                fuel.available 
                                                    ? 'bg-green-100 text-green-700' 
                                                    : 'bg-red-100 text-red-700'
                                            }`}>
                                                {fuel.available ? 'Disponível' : 'Indisponível'}
                                            </div>
                                        </div>
                                        
                                        <Button 
                                            className="w-full bg-secondary hover:bg-secondary/90 hover-lift"
                                            onClick={() => openFuelWhatsApp(fuel)}
                                            disabled={!fuel.available}
                                        >
                                            <Phone className="mr-2" weight="bold" size={16} />
                                            Consultar no WhatsApp
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>

                <div className="text-center mt-12 mb-8">
                    <p className="text-muted-foreground text-sm">
                        Preços sujeitos a alteração. Confirme valores pelo WhatsApp.
                    </p>
                </div>

                {/* Price History Charts */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-center mb-6">Histórico de Preços</h3>
                    {fuelPrices?.map((fuel) => (
                        <FuelPriceChart
                            key={fuel.id}
                            fuelId={fuel.id}
                            fuelName={fuel.name}
                            currentPrice={fuel.price}
                            color={fuel.id === 'gasolina-comum' ? 'hsl(var(--primary))' : 
                                   fuel.id === 'gasolina-aditivada' ? 'hsl(var(--secondary))' :
                                   fuel.id === 'etanol' ? 'hsl(var(--accent))' : 
                                   'hsl(var(--muted-foreground))'}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}