import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Coffee, Hamburger, IceCream, Pill, Phone, ShoppingCart } from '@phosphor-icons/react'
import AnimatedSection from '@/components/AnimatedSection'
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation'
import { motion } from 'framer-motion'

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
    
    // Pre-calculate animations for up to 9 products (max likely in a category)
    const productAnimations = useStaggeredAnimation(9, 0.1)
    
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
            price: 8.90,
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
            description: 'Tradicional doce mineiro',
            price: 3.50,
            category: 'lanches',
            available: true
        },
        {
            id: 'biscoito-cookies',
            name: 'Cookies Artesanais',
            description: 'Cookies de chocolate caseiros',
            price: 5.90,
            category: 'lanches',
            available: false
        },
        
        // Doces
        {
            id: 'sorvete-palito',
            name: 'Sorvete no Palito',
            description: 'Diversos sabores disponíveis',
            price: 4.90,
            category: 'doces',
            available: true
        },
        {
            id: 'chocolate-premium',
            name: 'Chocolate Premium',
            description: 'Chocolate belga importado',
            price: 15.90,
            category: 'doces',
            available: true
        },
        
        // Medicamentos
        {
            id: 'dorflex',
            name: 'Dorflex',
            description: 'Para dores de cabeça e musculares',
            price: 8.50,
            category: 'medicamentos',
            available: true
        },
        {
            id: 'engov',
            name: 'Engov',
            description: 'Para mal estar',
            price: 7.90,
            category: 'medicamentos',
            available: true
        }
    ])

    const categories = [
        { id: 'bebidas', name: 'Bebidas', icon: Coffee },
        { id: 'lanches', name: 'Lanches', icon: Hamburger },
        { id: 'doces', name: 'Doces', icon: IceCream },
        { id: 'medicamentos', name: 'Medicamentos', icon: Pill }
    ]

    const addToCart = (product: Product) => {
        setCart(prev => [...prev, product])
    }

    const openProductWhatsApp = (product: Product) => {
        const message = `Olá! Gostaria de comprar: ${product.name} - R$ ${product.price.toFixed(2)} do PONTO A 🛒`
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
    }

    const openCartWhatsApp = () => {
        if (cart.length === 0) return
        
        const items = cart.map(item => `• ${item.name} - R$ ${item.price.toFixed(2)}`).join('\n')
        const total = cart.reduce((sum, item) => sum + item.price, 0)
        const message = `Olá! Gostaria de fazer o seguinte pedido no PONTO A:\n\n${items}\n\nTotal: R$ ${total.toFixed(2)} 🛒`
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
        setCart([])
    }

    const getProductsByCategory = (categoryId: string) => {
        return products?.filter(product => product.category === categoryId) || []
    }

    return (
        <AnimatedSection id="conveniencia" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Conveniência
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Produtos selecionados para sua comodidade. 
                        Faça seu pedido pelo WhatsApp e retire rapidamente.
                    </p>
                </motion.div>

                {/* Cart summary with animation */}
                {cart.length > 0 && (
                    <motion.div 
                        className="mb-8 glass-card rounded-xl p-6 max-w-md mx-auto"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -2 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold flex items-center">
                                <motion.div
                                    animate={{ rotate: cart.length > 0 ? [0, 10, -10, 0] : 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <ShoppingCart className="mr-2" />
                                </motion.div>
                                Carrinho ({cart.length})
                            </h3>
                            <Button variant="outline" size="sm" onClick={() => setCart([])}>
                                Limpar
                            </Button>
                        </div>
                        <div className="space-y-2 mb-4">
                            {cart.slice(0, 3).map((item, index) => (
                                <motion.div 
                                    key={index} 
                                    className="flex justify-between text-sm"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <span>{item.name}</span>
                                    <span>R$ {item.price.toFixed(2)}</span>
                                </motion.div>
                            ))}
                            {cart.length > 3 && (
                                <div className="text-sm text-muted-foreground">
                                    +{cart.length - 3} items...
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between items-center">
                            <strong>Total: R$ {cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</strong>
                            <Button onClick={openCartWhatsApp} className="bg-secondary hover:bg-secondary/90">
                                <Phone className="mr-2" size={16} />
                                Pedir
                            </Button>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Tabs defaultValue="bebidas" className="w-full">
                        <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-12">
                            {categories.map((category, index) => {
                                const IconComponent = category.icon
                                return (
                                    <motion.div
                                        key={category.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                    >
                                        <TabsTrigger value={category.id} className="flex-col py-3 text-xs">
                                            <IconComponent size={20} className="mb-1" />
                                            {category.name}
                                        </TabsTrigger>
                                    </motion.div>
                                )
                            })}
                        </TabsList>

                        {categories.map((category, categoryIndex) => (
                            <TabsContent key={category.id} value={category.id}>
                                <motion.div 
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    {getProductsByCategory(category.id).map((product, productIndex) => {
                                        const animation = productAnimations[productIndex] || productAnimations[0]
                                        
                                        return (
                                            <motion.div
                                                key={product.id}
                                                initial={animation.initial}
                                                whileInView={animation.animate}
                                                viewport={{ once: true, amount: 0.3 }}
                                                transition={animation.transition}
                                                whileHover={{ y: -5 }}
                                            >
                                                <Card className="overflow-hidden hover-lift bg-card/80 backdrop-blur-sm">
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
                                                                {product.available ? '✓' : '✗'}
                                                            </div>
                                                        </div>
                                                        
                                                        <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                                                        
                                                        <div className="flex items-center justify-between">
                                                            <div className="text-2xl font-bold text-primary">
                                                                R$ {product.price.toFixed(2)}
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <motion.div
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                >
                                                                    <Button 
                                                                        size="sm"
                                                                        variant="outline"
                                                                        onClick={() => addToCart(product)}
                                                                        disabled={!product.available}
                                                                    >
                                                                        +
                                                                    </Button>
                                                                </motion.div>
                                                                <motion.div
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                >
                                                                    <Button 
                                                                        size="sm"
                                                                        className="bg-secondary hover:bg-secondary/90"
                                                                        onClick={() => openProductWhatsApp(product)}
                                                                        disabled={!product.available}
                                                                    >
                                                                        <Phone size={14} />
                                                                    </Button>
                                                                </motion.div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </motion.div>
                                        )
                                    })}
                                </motion.div>
                            </TabsContent>
                        ))}
                    </Tabs>

                    <motion.div 
                        className="text-center mt-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
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