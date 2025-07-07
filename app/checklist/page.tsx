"use client"

import { useState, useEffect } from "react"
import { NavigationCards } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  Circle, 
  Clock,
  Calendar,
  Target,
  TrendingUp,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Edit2
} from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  category: "foundation" | "core" | "enhancement" | "production"
  priority: "high" | "medium" | "low"
  estimatedHours: number
  completed: boolean
  startDate?: Date
  completedDate?: Date
  dependencies?: string[]
}

const initialTasks: Task[] = [
  // Phase 1: Foundation
  {
    id: "setup-env",
    title: "Thiết lập môi trường phát triển",
    description: "Cài đặt Docker, Git, IDE configuration, tạo repository",
    category: "foundation",
    priority: "high",
    estimatedHours: 16,
    completed: false
  },
  {
    id: "poc-dashboard",
    title: "Xây dựng Proof of Concept",
    description: "Tạo mini dashboard với dữ liệu mẫu, hiển thị 2-3 biểu đồ cơ bản",
    category: "foundation", 
    priority: "high",
    estimatedHours: 40,
    completed: false,
    dependencies: ["setup-env"]
  },
  {
    id: "elasticsearch-setup",
    title: "Thiết lập Elasticsearch cluster",
    description: "Cài đặt ES, cấu hình cơ bản, tạo index đầu tiên",
    category: "foundation",
    priority: "high", 
    estimatedHours: 24,
    completed: false
  },
  {
    id: "data-pipeline",
    title: "Xây dựng pipeline dữ liệu cơ bản",
    description: "Filebeat → Logstash → Elasticsearch, test với nginx logs",
    category: "foundation",
    priority: "high",
    estimatedHours: 20,
    completed: false,
    dependencies: ["elasticsearch-setup"]
  },
  
  // Phase 2: Core Features
  {
    id: "fastapi-dev",
    title: "Phát triển API với FastAPI",
    description: "Tạo endpoints cho query ES, aggregations, data filtering",
    category: "core",
    priority: "high",
    estimatedHours: 40,
    completed: false,
    dependencies: ["elasticsearch-setup"]
  },
  {
    id: "redis-cache",
    title: "Tích hợp Redis caching",
    description: "Cache query results, session management, performance tuning",
    category: "core",
    priority: "medium",
    estimatedHours: 16,
    completed: false,
    dependencies: ["fastapi-dev"]
  },
  {
    id: "dashboard-ui",
    title: "Xây dựng giao diện Dashboard",
    description: "Next.js UI với 5-6 loại chart, responsive design",
    category: "core",
    priority: "high",
    estimatedHours: 60,
    completed: false,
    dependencies: ["poc-dashboard"]
  },
  {
    id: "realtime-updates",
    title: "Cập nhật thời gian thực",
    description: "WebSocket integration, live data streaming",
    category: "core",
    priority: "medium",
    estimatedHours: 32,
    completed: false,
    dependencies: ["dashboard-ui", "fastapi-dev"]
  },

  // Phase 3: Enhancement
  {
    id: "advanced-charts",
    title: "Biểu đồ nâng cao với ECharts",
    description: "Heatmaps, complex aggregations, drill-down capabilities",
    category: "enhancement",
    priority: "medium", 
    estimatedHours: 40,
    completed: false,
    dependencies: ["dashboard-ui"]
  },
  {
    id: "performance-optimization",
    title: "Tối ưu hóa hiệu suất",
    description: "Query optimization, caching strategies, database tuning",
    category: "enhancement",
    priority: "high",
    estimatedHours: 32,
    completed: false,
    dependencies: ["redis-cache", "fastapi-dev"]
  },
  {
    id: "user-management",
    title: "Quản lý người dùng",
    description: "Authentication, authorization, multi-tenant support",
    category: "enhancement",
    priority: "medium",
    estimatedHours: 48,
    completed: false,
    dependencies: ["dashboard-ui"]
  },

  // Phase 4: Production Ready
  {
    id: "testing-qa",
    title: "Testing & Quality Assurance",
    description: "Unit tests, integration tests, E2E testing với Playwright",
    category: "production",
    priority: "high",
    estimatedHours: 40,
    completed: false,
    dependencies: ["user-management", "performance-optimization"]
  },
  {
    id: "ci-cd-pipeline",
    title: "CI/CD & Deployment",
    description: "GitHub Actions, Docker deployment, monitoring setup",
    category: "production",
    priority: "high",
    estimatedHours: 32,
    completed: false,
    dependencies: ["testing-qa"]
  },
  {
    id: "documentation",
    title: "Tài liệu hệ thống",
    description: "API docs, user guide, deployment instructions",
    category: "production",
    priority: "medium",
    estimatedHours: 24,
    completed: false,
    dependencies: ["ci-cd-pipeline"]
  }
]

export default function ChecklistPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [projectStartDate] = useState(new Date("2025-07-07"))
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Tính toán thống kê
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const totalHours = tasks.reduce((sum, task) => sum + task.estimatedHours, 0)
  const completedHours = tasks.filter(task => task.completed).reduce((sum, task) => sum + task.estimatedHours, 0)
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100)

  // Lọc tasks theo category
  const filteredTasks = selectedCategory === "all" 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory)

  // Toggle task completion
  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            completed: !task.completed,
            completedDate: !task.completed ? new Date() : undefined
          }
        : task
    ))
  }

  // Get category stats
  const getCategoryStats = (category: string) => {
    const categoryTasks = tasks.filter(task => task.category === category)
    const completed = categoryTasks.filter(task => task.completed).length
    return `${completed}/${categoryTasks.length}`
  }

  const categories = [
    { id: "all", name: "Tất cả", color: "bg-gray-100" },
    { id: "foundation", name: "Nền tảng", color: "bg-blue-100" },
    { id: "core", name: "Tính năng chính", color: "bg-green-100" },
    { id: "enhancement", name: "Cải tiến", color: "bg-yellow-100" },
    { id: "production", name: "Production", color: "bg-purple-100" }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50"
      case "medium": return "text-yellow-600 bg-yellow-50"
      case "low": return "text-green-600 bg-green-50"
      default: return ""
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "foundation": return "border-l-blue-500"
      case "core": return "border-l-green-500"
      case "enhancement": return "border-l-yellow-500"
      case "production": return "border-l-purple-500"
      default: return "border-l-gray-500"
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
          Danh sách kiểm tra dự án
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
          Theo dõi tiến độ chi tiết từng task trong lộ trình 12 tuần
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tiến độ tổng thể</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              {completedTasks}/{totalTasks} tasks hoàn thành
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Thời gian ước tính</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours}h</div>
            <p className="text-xs text-muted-foreground">
              {completedHours}h đã hoàn thành
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ngày bắt đầu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">07/07</div>
            <p className="text-xs text-muted-foreground">
              2025
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Dự kiến hoàn thành</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">29/09</div>
            <p className="text-xs text-muted-foreground">
              2025 (12 tuần)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 px-4 sm:px-0">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="gap-2"
          >
            <div className={`w-3 h-3 rounded ${category.color}`} />
            {category.name}
            {category.id !== "all" && (
              <span className="text-xs">({getCategoryStats(category.id)})</span>
            )}
          </Button>
        ))}
      </div>

      {/* Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Tiến độ dự án
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Hoàn thành: {completedTasks}/{totalTasks} tasks</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-primary h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách nhiệm vụ</CardTitle>
          <CardDescription>
            Click vào checkbox để đánh dấu hoàn thành
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`border rounded-lg p-3 sm:p-4 transition-all hover:shadow-md border-l-4 ${getCategoryColor(task.category)} ${
                  task.completed ? "bg-green-50 opacity-75" : ""
                }`}
              >
                <div className="flex items-start gap-2 sm:gap-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-1"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                  
                  <div className="flex-1 space-y-1 sm:space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <h4 className={`font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>
                        {task.title}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                          {task.estimatedHours}h
                        </span>
                      </div>
                    </div>
                    
                    <p className={`text-sm text-muted-foreground ${task.completed ? "line-through" : ""}`}>
                      {task.description}
                    </p>
                    
                    {task.dependencies && (
                      <div className="text-xs text-orange-600">
                        Phụ thuộc: {task.dependencies.map(dep => 
                          tasks.find(t => t.id === dep)?.title
                        ).join(", ")}
                      </div>
                    )}
                    
                    {task.completedDate && (
                      <div className="text-xs text-green-600">
                        Hoàn thành: {task.completedDate.toLocaleDateString("vi-VN")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <NavigationCards />
    </div>
  )
}