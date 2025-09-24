import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Phone, ShoppingCart, X } from '@phosphor-icons/react'
import AnimatedSection from '@/components/AnimatedSection'

interface Product {
    id: string
    name: string
    description: string
    price: number
    category: string
    available: boolean
    image?: string
    popular?: boolean
}

export default function ConvenienceSection() {
    const [cart, setCart] = useState<Product[]>([])
    
    const [products] = useState<Product[]>([
        // Bebidas
        {
            id: 'cafe-expresso',
            name: 'Café Expresso Premium',
            description: 'Café artesanal feito na hora',
            price: 4.50,
            category: 'bebidas',
            available: true,
            popular: true
        },
        {
            id: 'agua-500ml',
            name: 'Água Mineral 500ml',
            description: 'Água natural gelada',
            price: 2.50,
            category: 'bebidas',
            available: true
        },
        {
            id: 'energetico',
            name: 'Energético Premium',
            description: 'Para manter a energia na estrada',
            price: 8.00,
            category: 'bebidas',
            available: true
        },
        
        // Lanches
        {
            id: 'sanduiche-natural',
            name: 'Sanduíche Natural',
            description: 'Frango, salada e maionese caseira',
            price: 12.90,
            category: 'lanches',
            available: true,
            popular: true
        },
        {
            id: 'pao-de-acucar',
            name: 'Pão de Açúcar',
            description: 'Pão francês fresquinho',
            price: 4.90,
            category: 'lanches',
            available: true
        },
        
        // Conveniência
        {
            id: 'carregador-celular',
            name: 'Carregador de Celular',
            description: 'Universal USB-C e Lightning',
            price: 25.00,
            category: 'conveniencia',
            available: true
        },
        {
            id: 'oleo-motor',
            name: 'Óleo de Motor',
            description: 'Lubrificante automotivo premium',
            price: 45.00,
            category: 'conveniencia',
            available: true
        }
    ])

    const categories = [
        { id: 'bebidas', label: 'Bebidas' },
        { id: 'lanches', label: 'Lanches' },
        { id: 'conveniencia', label: 'Conveniência' }
    ]

    const addToCart = (product: Product) => {
        setCart(prev => [...prev, product])
    }

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter((_, index) => index !== prev.findIndex(p => p.id === productId)))
    }

    const getProductsByCategory = (category: string) => {
        return products.filter(product => product.category === category)
    }

    const getCartTotal = () => {
        return cart.reduce((total, product) => total + product.price, 0)
    }

    const openProductWhatsApp = (product: Product) => {
        const message = `Olá! Gostaria de comprar: ${product.name} - R$ ${product.price.toFixed(2)}`
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
    }

    const openCartWhatsApp = () => {
        const cartItems = cart.map(item => `${item.name} - R$ ${item.price.toFixed(2)}`).join('\n')
        const total = getCartTotal()
        const message = `Olá! Gostaria de fazer o seguinte pedido:\n\n${cartItems}\n\nTotal: R$ ${total.toFixed(2)}`
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
        setCart([])
    }

    return (
        <AnimatedSection id="conveniencia">
            <div className="max-w-6xl mx-auto">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Conveniência
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Faça seu pedido pelo WhatsApp e retire no balcão
                    </p>
                </motion.div>

                {/* Cart summary */}
                {cart.length > 0 && (
                    <motion.div 
                        className="mb-8 p-4 bg-card rounded-xl border glass-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <ShoppingCart size={20} className="text-primary" />
                            Carrinho ({cart.length} itens)
                        </h3>
                        <div className="space-y-2 mb-4">
                            {cart.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="flex justify-between items-center text-sm">
                                    <span>{item.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span>R$ {item.price.toFixed(2)}</span>
                                        <Button 
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => removeFromCart(item.id)}
                                            className="h-6 w-6 p-0"
                                        >
                                            <X size={12} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t">
                            <span className="font-semibold">Total: R$ {getCartTotal().toFixed(2)}</span>
                            <Button onClick={openCartWhatsApp} className="bg-secondary hover:bg-secondary/90">
                                <Phone size={16} className="mr-2" />
                                Finalizar Pedido
                            </Button>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <Tabs defaultValue="bebidas" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-8">
                            {categories.map((category) => (
                                <TabsTrigger key={category.id} value={category.id}>
                                    {category.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {categories.map((category) => (
                            <TabsContent key={category.id} value={category.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {getProductsByCategory(category.id).map((product) => (
                                        <Card key={product.id} className="overflow-hidden hover-lift bg-card/80 backdrop-blur-sm">
                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                                                        {product.popular && (
                                                            <Badge className="mb-2 bg-accent text-accent-foreground">Popular</Badge>
                                                        )}
                                                    </div>
                                                    <div className={`px-2 py-1 rounded-full text-xs ${
                                                        product.available 
                                                            ? 'bg-green-100 text-green-700' 
                                                            : 'bg-red-100 text-red-700'
                                                    }`}>
                                                        {product.available ? 'Disponível' : 'Indisponível'}
                                                    </div>
                                                </div>

                                                <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                                                
                                                <div className="flex items-center justify-between">
                                                    <div className="text-2xl font-bold text-primary">
                                                        R$ {product.price.toFixed(2)}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button 
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => addToCart(product)}
                                                            disabled={!product.available}
                                                        >
                                                            +
                                                        </Button>
                                                        <Button 
                                                            size="sm"
                                                            className="bg-secondary hover:bg-secondary/90"
                                                            onClick={() => openProductWhatsApp(product)}
                                                            disabled={!product.available}
                                                        >
                                                            <Phone size={14} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </motion.div>
                            </TabsContent>
                        ))}
                    </Tabs>

                    <motion.div 
                        className="text-center mt-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-muted-foreground text-sm">
                            Produtos e preços sujeitos a disponibilidade. Confirme pelo WhatsApp.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </AnimatedSection>
    )
}