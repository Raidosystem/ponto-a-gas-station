import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Phone, ShoppingCart, X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

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

    const products: Product[] = [
        // Bebidas
        {
            id: 'coca-cola',
            name: 'Coca-Cola 350ml',
            description: 'Refrigerante gelado',
            price: 4.50,
            category: 'bebidas',
            available: true,
            popular: true
        },
        {
            id: 'agua-mineral',
            name: 'Água Mineral 500ml',
            description: 'Água mineral natural',
            price: 2.50,
            category: 'bebidas',
            available: true
        },
        {
            id: 'cafe-expresso',
            name: 'Café Expresso',
            description: 'Café fresco e aromático',
            price: 3.50,
            category: 'bebidas',
            available: true
        },
        {
            id: 'suco-laranja',
            name: 'Suco de Laranja',
            description: 'Natural da fruta',
            price: 6.00,
            category: 'bebidas',
            available: true
        },
        // Lanches
        {
            id: 'pao-queijo',
            name: 'Pão de Queijo',
            description: 'Fresquinho e quentinho',
            price: 8.00,
            category: 'lanches',
            available: true
        },
        {
            id: 'coxinha',
            name: 'Coxinha de Frango',
            description: 'Tradicional salgadinho',
            price: 5.50,
            category: 'lanches',
            available: true,
            popular: true
        },
        {
            id: 'sanduiche-natural',
            name: 'Sanduíche Natural',
            description: 'Com peito de peru e queijo',
            price: 12.90,
            category: 'lanches',
            available: true
        },
        {
            id: 'pao-de-acucar',
            name: 'Pão de Açúcar',
            description: 'Doce tradicional mineiro',
            price: 4.00,
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
    ]

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

                <div className="grid lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                        <Tabs defaultValue="bebidas" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 mb-8">
                                {categories.map(category => (
                                    <TabsTrigger 
                                        key={category.id} 
                                        value={category.id}
                                        className="text-sm font-medium"
                                    >
                                        {category.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {categories.map(category => (
                                <TabsContent key={category.id} value={category.id}>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {getProductsByCategory(category.id).map((product, index) => (
                                            <motion.div
                                                key={product.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                                viewport={{ once: true }}
                                            >
                                                <Card className="p-6 hover-lift glass-card group cursor-pointer">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                                                    {product.name}
                                                                </h3>
                                                                {product.popular && (
                                                                    <Badge variant="secondary" className="text-xs">
                                                                        Popular
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <p className="text-muted-foreground text-sm mb-3">
                                                                {product.description}
                                                            </p>
                                                            <p className="text-2xl font-bold text-primary tabular-nums">
                                                                R$ {product.price.toFixed(2)}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <Button 
                                                            onClick={() => openProductWhatsApp(product)}
                                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                                            size="sm"
                                                        >
                                                            <Phone className="mr-2 h-4 w-4" />
                                                            WhatsApp
                                                        </Button>
                                                        <Button 
                                                            onClick={() => addToCart(product)}
                                                            variant="outline"
                                                            size="sm"
                                                            className="hover:bg-primary hover:text-primary-foreground"
                                                        >
                                                            <ShoppingCart className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>

                    {/* Carrinho lateral */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="sticky top-24"
                        >
                            <Card className="p-6 glass-card">
                                <div className="flex items-center gap-2 mb-6">
                                    <ShoppingCart className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold text-lg">Carrinho</h3>
                                    {cart.length > 0 && (
                                        <Badge variant="secondary" className="ml-auto">
                                            {cart.length}
                                        </Badge>
                                    )}
                                </div>

                                {cart.length === 0 ? (
                                    <p className="text-muted-foreground text-center py-8">
                                        Seu carrinho está vazio
                                    </p>
                                ) : (
                                    <>
                                        <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                                            {cart.map((item, index) => (
                                                <div key={`${item.id}-${index}`} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-sm truncate">{item.name}</p>
                                                        <p className="text-primary font-semibold text-sm tabular-nums">
                                                            R$ {item.price.toFixed(2)}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="ml-2 h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="border-t pt-4">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="font-semibold">Total:</span>
                                                <span className="text-xl font-bold text-primary tabular-nums">
                                                    R$ {getCartTotal().toFixed(2)}
                                                </span>
                                            </div>
                                            <Button 
                                                onClick={openCartWhatsApp}
                                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                                            >
                                                <Phone className="mr-2 h-4 w-4" />
                                                Finalizar no WhatsApp
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    )
}