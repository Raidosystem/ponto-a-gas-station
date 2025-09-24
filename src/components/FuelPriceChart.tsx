import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChartLine, Clock } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'

interface PriceHistory {
    timestamp: number
    price: number
    fuelId: string
    date: string
    time: string
}

interface FuelPriceChartProps {
    fuelId: string
    fuelName: string
    currentPrice: number
    color?: string
}

export default function FuelPriceChart({ 
    fuelId, 
    fuelName, 
    currentPrice, 
    color = "hsl(var(--primary))" 
}: FuelPriceChartProps) {
    const [priceHistory, setPriceHistory] = useKV<PriceHistory[]>(`price-history-${fuelId}`, [])
    const [timeRange, setTimeRange] = useState<'1h' | '4h' | '24h'>('4h')
    const [isVisible, setIsVisible] = useState(false)

    // Add current price to history when price changes
    useEffect(() => {
        const now = new Date()
        const newEntry: PriceHistory = {
            timestamp: now.getTime(),
            price: currentPrice,
            fuelId,
            date: now.toLocaleDateString('pt-BR'),
            time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }

        setPriceHistory((history) => {
            if (!history) return [newEntry]
            
            const lastEntry = history[history.length - 1]
            
            // Only add if price changed or it's been more than 5 minutes
            const shouldAdd = !lastEntry || 
                lastEntry.price !== currentPrice || 
                (now.getTime() - lastEntry.timestamp) > 5 * 60 * 1000

            if (shouldAdd) {
                const updatedHistory = [...history, newEntry]
                
                // Keep only last 100 entries to prevent excessive storage
                return updatedHistory.slice(-100)
            }
            
            return history
        })
    }, [currentPrice, fuelId, setPriceHistory])

    // Filter data based on time range
    const getFilteredData = () => {
        if (!priceHistory || priceHistory.length === 0) return []
        
        const now = new Date().getTime()
        const ranges = {
            '1h': 60 * 60 * 1000,
            '4h': 4 * 60 * 60 * 1000,
            '24h': 24 * 60 * 60 * 1000
        }
        
        const cutoff = now - ranges[timeRange]
        return priceHistory
            .filter(entry => entry.timestamp > cutoff)
            .map(entry => ({
                ...entry,
                displayTime: entry.time
            }))
    }

    const filteredData = getFilteredData()
    const hasData = filteredData.length > 1

    // Calculate price change
    const priceChange = hasData ? 
        filteredData[filteredData.length - 1].price - filteredData[0].price : 0
    const changePercentage = hasData ? (priceChange / filteredData[0].price) * 100 : 0

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload
            return (
                <div className="bg-card border rounded-lg p-3 shadow-lg">
                    <p className="text-sm font-semibold">{data.displayTime}</p>
                    <p className="text-sm">
                        <span className="text-muted-foreground">Preço: </span>
                        <span className="font-bold text-primary">R$ {data.price.toFixed(2)}</span>
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
                opacity: isVisible ? 1 : 0, 
                height: isVisible ? 'auto' : 0 
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
        >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-dashed">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <ChartLine size={20} className="text-primary" weight="bold" />
                        <h4 className="font-semibold">{fuelName} - Histórico de Preços</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="flex rounded-lg overflow-hidden border">
                            {(['1h', '4h', '24h'] as const).map((range) => (
                                <Button
                                    key={range}
                                    size="sm"
                                    variant={timeRange === range ? "default" : "ghost"}
                                    onClick={() => setTimeRange(range)}
                                    className="rounded-none px-3 py-1 text-xs"
                                >
                                    {range}
                                </Button>
                            ))}
                        </div>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsVisible(!isVisible)}
                            className="px-2"
                        >
                            {isVisible ? '−' : '+'}
                        </Button>
                    </div>
                </div>

                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                    >
                        {hasData ? (
                            <>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <Badge variant={changePercentage >= 0 ? "destructive" : "default"}>
                                            {changePercentage >= 0 ? '+' : ''}{changePercentage.toFixed(2)}%
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">
                                            Variação em {timeRange}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                        <Clock size={12} />
                                        <span>{filteredData.length} pontos</span>
                                    </div>
                                </div>
                                
                                <div className="h-40">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={filteredData}>
                                            <XAxis 
                                                dataKey="displayTime" 
                                                fontSize={10}
                                                tickFormatter={(value) => value.split(':')[0] + 'h'}
                                            />
                                            <YAxis 
                                                fontSize={10}
                                                domain={['dataMin - 0.05', 'dataMax + 0.05']}
                                                tickFormatter={(value) => `R$${value.toFixed(2)}`}
                                            />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Line 
                                                type="monotone" 
                                                dataKey="price" 
                                                stroke={color}
                                                strokeWidth={2}
                                                dot={{ fill: color, strokeWidth: 2, r: 3 }}
                                                activeDot={{ r: 4, stroke: color, strokeWidth: 2 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </>
                        ) : (
                            <div className="h-40 flex items-center justify-center">
                                <div className="text-center text-muted-foreground">
                                    <ChartLine size={32} className="mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">Dados insuficientes</p>
                                    <p className="text-xs">Aguarde para ver o histórico</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </Card>
        </motion.div>
    )
}