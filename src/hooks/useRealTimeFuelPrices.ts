import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'

export interface FuelPrice {
    id: string
    name: string
    type: string
    price: number
    previousPrice: number
    available: boolean
    icon: any
    description: string
    badge?: string
    lastUpdated: Date
}

// Base prices for fuel types
const basePrices = {
    'gasolina-comum': 5.49,
    'gasolina-aditivada': 5.79,
    'etanol': 3.89,
    'diesel-s10': 5.29
}

export function useRealTimeFuelPrices() {
    const [fuelPrices, setFuelPrices] = useKV<FuelPrice[]>("fuel-prices", [])
    const [isLoading, setIsLoading] = useState(false)

    // Initialize prices if empty
    useEffect(() => {
        if (!fuelPrices || fuelPrices.length === 0) {
            const initialPrices: FuelPrice[] = [
                {
                    id: 'gasolina-comum',
                    name: 'Gasolina Comum',
                    type: 'Gasolina',
                    price: basePrices['gasolina-comum'],
                    previousPrice: basePrices['gasolina-comum'],
                    available: true,
                    icon: null, // Will be set in component
                    description: 'Gasolina de qualidade para o dia a dia',
                    badge: 'Popular',
                    lastUpdated: new Date()
                },
                {
                    id: 'gasolina-aditivada',
                    name: 'Gasolina Aditivada',
                    type: 'Gasolina Premium',
                    price: basePrices['gasolina-aditivada'],
                    previousPrice: basePrices['gasolina-aditivada'],
                    available: true,
                    icon: null,
                    description: 'Maior proteção e limpeza para o motor',
                    badge: 'Premium',
                    lastUpdated: new Date()
                },
                {
                    id: 'etanol',
                    name: 'Etanol',
                    type: 'Álcool',
                    price: basePrices['etanol'],
                    previousPrice: basePrices['etanol'],
                    available: true,
                    icon: null,
                    description: 'Combustível renovável e sustentável',
                    lastUpdated: new Date()
                },
                {
                    id: 'diesel-s10',
                    name: 'Diesel S-10',
                    type: 'Diesel',
                    price: basePrices['diesel-s10'],
                    previousPrice: basePrices['diesel-s10'],
                    available: true,
                    icon: null,
                    description: 'Para veículos pesados e utilitários',
                    lastUpdated: new Date()
                }
            ]
            setFuelPrices(initialPrices)
        }
    }, [fuelPrices, setFuelPrices])

    // Simulate real-time price updates
    useEffect(() => {
        const updatePrices = () => {
            setFuelPrices((currentPrices) => {
                if (!currentPrices || currentPrices.length === 0) return currentPrices || []
                
                return currentPrices.map(fuel => {
                    // Random chance of price change (10% per update)
                    if (Math.random() < 0.1) {
                        const basePrice = basePrices[fuel.id as keyof typeof basePrices]
                        // Price can vary ±5% from base price
                        const variation = (Math.random() - 0.5) * 0.1 * basePrice
                        const newPrice = Math.max(0.1, basePrice + variation)
                        
                        return {
                            ...fuel,
                            previousPrice: fuel.price,
                            price: Math.round(newPrice * 100) / 100, // Round to 2 decimal places
                            lastUpdated: new Date()
                        }
                    }
                    return fuel
                })
            })
        }

        // Update prices every 15 seconds
        const interval = setInterval(updatePrices, 15000)

        return () => clearInterval(interval)
    }, [setFuelPrices])

    // Manual update function
    const updateFuelPrices = async () => {
        setIsLoading(true)
        
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            setFuelPrices((currentPrices) => {
                if (!currentPrices || currentPrices.length === 0) return currentPrices || []
                
                return currentPrices.map(fuel => {
                    const basePrice = basePrices[fuel.id as keyof typeof basePrices]
                    // Slightly more variation for manual updates
                    const variation = (Math.random() - 0.5) * 0.15 * basePrice
                    const newPrice = Math.max(0.1, basePrice + variation)
                    
                    return {
                        ...fuel,
                        previousPrice: fuel.price,
                        price: Math.round(newPrice * 100) / 100,
                        lastUpdated: new Date()
                    }
                })
            })
        } finally {
            setIsLoading(false)
        }
    }

    // Get last update time
    const getLastUpdateTime = () => {
        if (!fuelPrices || fuelPrices.length === 0) return null
        
        const mostRecent = fuelPrices.reduce((latest, fuel) => {
            return fuel.lastUpdated > latest ? fuel.lastUpdated : latest
        }, fuelPrices[0].lastUpdated)
        
        return mostRecent
    }

    return {
        fuelPrices,
        isLoading,
        updateFuelPrices,
        lastUpdateTime: getLastUpdateTime()
    }
}