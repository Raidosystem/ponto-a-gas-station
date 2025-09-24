import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigg
import AnimatedSection from '@/components/Ani
import { motion } from 'framer-motion'
interface Product {
    name: string
    price: number
import { motion } from 'framer-motion'

interface Product {
    id: string
    name: string
    description: string
    price: number
    category: string
    // Pre-calculate a
    image?: string
    popular?: boolean
}

export default function ConvenienceSection() {
    const [cart, setCart] = useState<Product[]>([])
    
    const [products] = useState<Product[]>([
        // Bebidas
         
            id: 'cafe-expresso',
            name: 'Café Expresso Premium',
            description: 'Café artesanal feito na hora',
            price: 4.50,
            category: 'bebidas',
            available: true,
            popular: true
          
        {
            id: 'agua-500ml',
            name: 'Água Mineral 500ml',
            description: 'Água natural gelada',
            price: 2.50,
            category: 'bebidas',
            available: true
          
        {
            id: 'pao-de-acuca
            name: 'Energético Premium',
            description: 'Para manter a energia na estrada',
            price: 8.90,
        },
            available: true
          
        
        // Lanches
        {
            id: 'sanduiche-natural',
            name: 'Sanduíche Natural',
            description: 'Frango, salada e maionese caseira',
            price: 12.90,
            price: 4.90,
            available: true,
            popular: true
        },
         
            id: 'pao-de-acucar',
    }
    const openProductWhatsApp = (product: Product) =
        const whatsappUr
    }
    const openCartWhatsApp 
        
        c
        const whatsappUrl = `https:
        setCart([])

        return products?

        <AnimatedSection id=
          
        
                
         
                        Conveniên
                    <p className="text
                        Faça seu pedido pelo WhatsApp e 
                </motion
                {/* Cart summa
                    <motion
          
         
                    >
                            <h3 classN
                                    animate={{ rotate
                         
                              
                           
          
        
                       
         
                          
                            
                                    <span>{item.name}</span>
                        
                            {cart.len
                           
          
         
                        
                          
                        </div>
                )}
                <motion.div
                    whileIn
         
      

                        
                                        key={category.id}
                                        whileInView={{ opaci
                                        transition={{ d
                                        <TabsTrigger value={cate
     

                            })}

     

                                    whileInView={{ opac
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    {getProductsByCategory(category.id).map((product, product
                                        
     

                                    
                                     
        
                                                        <div className="flex justify-between item
                                                                <h3 c
                                                                    <Badge className="mb-2 bg-accent text-accent-foreground">P
                                                            </div>
                                          
                   
     

                                                        <p 
                                                        <div className="flex item
     

            
                                                                >
                                                    
                            
                                                 
                                                   
                                                      
                                                          
                                                  
                 
                                                                        
                                    
                         
                                                        </div>
                                                </Card>
                                        )
                        
                        ))}

                        className="text-center mt-1
                        whileInView={
                        transiti
                        <p className="text-muted-foreground text-sm">
                        </p>
                </motion.div>
        </AnimatedSection>
}

















































































                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                                    {product.available ? '✓' : '✗'}
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
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>

                <div className="text-center mt-12">
                    <p className="text-muted-foreground text-sm">
                        Produtos e preços sujeitos a disponibilidade. Confirme pelo WhatsApp.
                    </p>
                </div>
            </div>
        </section>
    )
}