import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSmoothScroll } from '@/hooks/useScrollAnimation'

interface SmoothScrollNavProps {
  className?: string
  items: Array<{
    id: string
    label: string
  }>
}

export default function SmoothScrollNav({ className = '', items }: SmoothScrollNavProps) {
  const [activeSection, setActiveSection] = useState('')
  const { scrollToSection } = useSmoothScroll()

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(section => section.element)

      const scrollY = window.scrollY + 100 // Offset for header height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element) {
          const sectionTop = section.element.offsetTop
          if (scrollY >= sectionTop) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [items])

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId, 80) // Offset for fixed header
  }

  return (
    <nav className={className}>
      {items.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => handleNavClick(item.id)}
          className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-white/80 ${
            activeSection === item.id ? 'text-white' : 'text-white/70'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.label}
          {activeSection === item.id && (
            <motion.div
              layoutId="activeNavItem"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
              initial={false}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </nav>
  )
}