"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Database, 
  GitCompare, 
  Map, 
  ChevronRight,
  Layers,
  Search,
  BarChart3
} from "lucide-react"

const navItems = [
  {
    title: "Giải mã công nghệ",
    href: "/",
    icon: Layers,
    description: "Hiểu rõ từng thành phần"
  },
  {
    title: "So sánh và phân tích",
    href: "/comparison",
    icon: GitCompare,
    description: "Đánh giá ưu nhược điểm"
  },
  {
    title: "Lộ trình thực hiện",
    href: "/roadmap",
    icon: Map,
    description: "Các bước triển khai"
  },
  {
    title: "Danh sách kiểm tra",
    href: "/checklist",
    icon: Search,
    description: "Theo dõi tiến độ chi tiết"
  }
]

export function Navigation() {
  const pathname = usePathname()
  
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Hệ thống Phân tích Dữ liệu</span>
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{item.title}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export function NavigationCards() {
  const pathname = usePathname()
  const currentIndex = navItems.findIndex(item => item.href === pathname)
  const nextItem = navItems[currentIndex + 1]
  
  return (
    <div className="grid gap-4 md:grid-cols-3 mt-8">
      {navItems.map((item, index) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        const isPast = index < currentIndex
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative group block p-6 rounded-lg border transition-all",
              isActive && "border-primary bg-primary/5",
              isPast && "border-green-500 bg-green-500/5",
              !isActive && !isPast && "hover:border-primary/50"
            )}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon className={cn(
                    "h-5 w-5",
                    isActive && "text-primary",
                    isPast && "text-green-500"
                  )} />
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <ChevronRight className={cn(
                "h-5 w-5 transition-transform",
                "group-hover:translate-x-1",
                isActive && "text-primary",
                isPast && "text-green-500"
              )} />
            </div>
            {isPast && (
              <div className="absolute top-2 right-2 text-xs text-green-500">
                Đã hoàn thành
              </div>
            )}
          </Link>
        )
      })}
    </div>
  )
}