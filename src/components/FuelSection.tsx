import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Drop, Lightning, Car, Phone } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'

interface FuelPrice {
    id: string
    name: string
    type: string
    price: number
    available: boolean
    icon: any
    description: string
    badge?: string
}

export default function FuelSection() {
    const [fuelPrices] = useKV<FuelPrice[]>('fuel-prices', [
        {
            id: 'gasolina-comum',
            name: 'Gasolina Comum',
            type: 'Gasolina',
            price: 5.49,
            available: true,
            icon: Car,
            description: 'Gasolina de qualidade para o dia a dia',
            badge: 'Popular'
        },
        {
            id: 'gasolina-aditivada',
            name: 'Gasolina Aditivada',
            type: 'Gasolina Premium',
            price: 5.79,
            available: true,
            icon: Lightning,
            description: 'Maior proteção e limpeza para o motor',
            badge: 'Premium'
        },
        {
            id: 'etanol',
            name: 'Etanol',
            type: 'Álcool',
            price: 3.89,
            available: true,
            icon: Drop,
            description: 'Combustível renovável e sustentável',
        },
        {
            id: 'diesel-s10',
            name: 'Diesel S-10',
            type: 'Diesel',
            price: 5.29,
            available: true,
            icon: Car,
            description: 'Para veículos pesados e utilitários',
        }
    ])

    const openFuelWhatsApp = (fuel: FuelPrice) => {
        const message = `Olá! Gostaria de abastecer com ${fuel.name} (R$ ${fuel.price.toFixed(2)}/L) no PONTO A 🚗⛽`
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
    }

    return (
        <section id="combustiveis" className="py-20 bg-muted/30">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Combustíveis
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Preços atualizados e combustível de qualidade garantida. 
                        Consulte disponibilidade via WhatsApp.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {fuelPrices?.map((fuel) => {
                        const IconComponent = fuel.icon
                        return (
                            <Card key={fuel.id} className="p-0 overflow-hidden hover-lift bg-card/80 backdrop-blur-sm">
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
                                    
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <div className="text-3xl font-bold text-primary">
                                                R$ {fuel.price.toFixed(2)}
                                            </div>
                                            <div className="text-sm text-muted-foreground">por litro</div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
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
                        )
                    })}
                </div>

                <div className="text-center mt-12">
                    <p className="text-muted-foreground text-sm">
                        Preços sujeitos a alteração. Confirme valores pelo WhatsApp.
                    </p>
                </div>
            </div>
        </section>
    )
}