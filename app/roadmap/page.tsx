import { NavigationCards } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TimelineChart } from "@/components/charts/timeline-chart"
import { 
  CheckCircle2, 
  Circle, 
  Clock,
  Rocket,
  Target,
  Lightbulb,
  Coffee,
  Brain,
  Heart,
  Zap,
  AlertCircle,
  BookOpen,
  Code,
  Database,
  Gauge
} from "lucide-react"

const milestones = [
  {
    phase: "Phase 1: Foundation",
    duration: "2 tuần",
    status: "current",
    tasks: [
      {
        title: "Setup Development Environment",
        description: "Docker, Git, IDE configuration",
        effort: "2 ngày",
        priority: "high"
      },
      {
        title: "Proof of Concept",
        description: "Mini dashboard với sample data",
        effort: "1 tuần",
        priority: "high"
      },
      {
        title: "Basic Data Pipeline",
        description: "Elasticsearch + simple ingestion",
        effort: "3 ngày",
        priority: "high"
      }
    ]
  },
  {
    phase: "Phase 2: Core Features",
    duration: "4 tuần",
    status: "upcoming",
    tasks: [
      {
        title: "API Development",
        description: "FastAPI endpoints cho data queries",
        effort: "1 tuần",
        priority: "high"
      },
      {
        title: "Basic Dashboard UI",
        description: "Next.js với 3-4 chart types",
        effort: "2 tuần",
        priority: "high"
      },
      {
        title: "Real-time Updates",
        description: "WebSocket integration",
        effort: "1 tuần",
        priority: "medium"
      }
    ]
  },
  {
    phase: "Phase 3: Enhancement",
    duration: "3 tuần",
    status: "future",
    tasks: [
      {
        title: "Advanced Visualizations",
        description: "Complex charts với ECharts",
        effort: "1 tuần",
        priority: "medium"
      },
      {
        title: "Performance Optimization",
        description: "Caching, query optimization",
        effort: "1 tuần",
        priority: "high"
      },
      {
        title: "User Management",
        description: "Auth, permissions, multi-tenant",
        effort: "1 tuần",
        priority: "medium"
      }
    ]
  },
  {
    phase: "Phase 4: Production Ready",
    duration: "3 tuần",
    status: "future",
    tasks: [
      {
        title: "Testing & QA",
        description: "Unit, integration, E2E tests",
        effort: "1 tuần",
        priority: "high"
      },
      {
        title: "Deployment Pipeline",
        description: "CI/CD, monitoring, alerting",
        effort: "1 tuần",
        priority: "high"
      },
      {
        title: "Documentation",
        description: "API docs, user guide, deployment",
        effort: "1 tuần",
        priority: "medium"
      }
    ]
  }
]

const actionableSteps = [
  {
    category: "Khởi động nhẹ nhàng",
    icon: Coffee,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    steps: [
      {
        step: "Tạo một dashboard đơn giản",
        description: "Chỉ cần 1 chart hiển thị data từ JSON file",
        time: "30 phút",
        tools: ["Next.js", "Chart.js"],
        tips: "Bắt đầu với hardcoded data, sau đó mới kết nối database"
      },
      {
        step: "Setup Docker Compose",
        description: "Elasticsearch + Kibana để hiểu cách chúng hoạt động",
        time: "1 giờ",
        tools: ["Docker", "Docker Compose"],
        tips: "Dùng docker-compose.yml có sẵn từ Elastic docs"
      },
      {
        step: "Ingest sample logs",
        description: "Dùng Filebeat để đẩy nginx logs vào Elasticsearch",
        time: "2 giờ",
        tools: ["Filebeat", "Elasticsearch"],
        tips: "Start với sample logs từ internet"
      }
    ]
  },
  {
    category: "Duy trì động lực",
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-50",
    steps: [
      {
        step: "Set micro-goals hàng ngày",
        description: "1 commit/ngày, dù chỉ là update README",
        time: "15 phút/ngày",
        tools: ["Git", "GitHub"],
        tips: "Streak counter giúp tạo thói quen"
      },
      {
        step: "Build in public",
        description: "Tweet progress, write blog posts",
        time: "30 phút/tuần",
        tools: ["Twitter", "Dev.to"],
        tips: "Accountability từ community rất mạnh"
      },
      {
        step: "Reward milestones",
        description: "Tự thưởng khi hoàn thành mỗi phase",
        time: "Tùy ý",
        tools: ["Your favorite treats"],
        tips: "Celebration nhỏ giúp não tiết dopamine"
      }
    ]
  },
  {
    category: "Xử lý ADHD",
    icon: Brain,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    steps: [
      {
        step: "Pomodoro Technique",
        description: "25 phút focus, 5 phút break",
        time: "Cả ngày",
        tools: ["Pomofocus.io", "Forest app"],
        tips: "ADHD brain cần frequent breaks"
      },
      {
        step: "Visual task board",
        description: "Kanban board với colors và icons",
        time: "Setup: 30 phút",
        tools: ["Notion", "Trello"],
        tips: "Visual cues giúp ADHD brain process tốt hơn"
      },
      {
        step: "Body doubling",
        description: "Code cùng bạn qua Discord/Zoom",
        time: "2-3 giờ/session",
        tools: ["Discord", "Focusmate"],
        tips: "Có người bên cạnh giúp maintain focus"
      }
    ]
  },
  {
    category: "Resources học tập",
    icon: BookOpen,
    color: "text-green-600",
    bgColor: "bg-green-50",
    steps: [
      {
        step: "Elasticsearch basics",
        description: "Official Elastic tutorials",
        time: "1 tuần",
        tools: ["elastic.co/guide"],
        tips: "Focus vào indexing và basic queries trước"
      },
      {
        step: "FastAPI crash course",
        description: "YouTube tutorials + docs",
        time: "3-4 ngày",
        tools: ["FastAPI docs", "YouTube"],
        tips: "FastAPI docs rất tốt, có interactive examples"
      },
      {
        step: "Next.js + TypeScript",
        description: "Build 2-3 small projects first",
        time: "1-2 tuần",
        tools: ["Next.js Learn", "TypeScript Handbook"],
        tips: "Learn by doing, đừng đọc quá nhiều theory"
      }
    ]
  }
]

const motivationalTips = [
  {
    icon: Zap,
    title: "Bắt đầu từ những thứ siêu nhỏ",
    description: "Não ADHD mà thấy task to thì sợ rụng rời luôn! Chia nhỏ đến mức \"ez pz lemon squeezy\" - không thể fail được."
  },
  {
    icon: Target,
    title: "Visual progress is your bestie",
    description: "GitHub contribution graph xanh lè te, progress bars tăng dần - dopamine hits differently! Não thích thấy numbers go up."
  },
  {
    icon: Lightbulb,
    title: "Hyperfocus = God mode activated",
    description: "Khi hyperfocus mode bật thì đừng nghĩ gì, cứ ride the wave thôi! Nhớ chuẩn bị snacks, nước, và báo trước với bạn bè là \"tôi mất tích\" nhé."
  },
  {
    icon: AlertCircle,
    title: "Bad days happen, chill!",
    description: "Có ngày não không cooperate, mở VS Code ra mà như nhìn hieroglyphics - totally normal! Chuẩn bị sẵn mấy task \"braindead-friendly\" cho những lúc này."
  },
  {
    icon: Coffee,
    title: "Procrastination hacks",
    description: "Thay vì scroll TikTok, hãy \"procrastinate\" bằng cách làm task khác trong project. Ít ra vẫn productive mà não vẫn được \"rebellion\" feeling."
  },
  {
    icon: Heart,
    title: "Celebrate micro wins",
    description: "Fix được 1 bug? Party time! Commit 1 dòng code? Deserves a happy dance! ADHD brain cần constant validation - tự thưởng đi, đừng ngại."
  },
  {
    icon: Brain,
    title: "Work with your brain, not against it",
    description: "Sáng focus tốt thì code backend logic. Chiều não mệt thì làm CSS cho đẹp. Tối muộn thì viết docs hoặc refactor. Know your energy patterns!"
  },
  {
    icon: Rocket,
    title: "Momentum > perfection",
    description: "Code xấu nhưng chạy được > code đẹp mà chưa viết. Ship it first, refactor later. Progress beats perfection every damn time!"
  }
]

export default function RoadmapPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "current":
        return <Clock className="h-5 w-5 text-blue-600" />
      case "upcoming":
        return <Circle className="h-5 w-5 text-gray-400" />
      case "future":
        return <Circle className="h-5 w-5 text-gray-300" />
      default:
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "border-blue-600 bg-blue-50"
      case "upcoming":
        return "border-gray-300"
      case "future":
        return "border-gray-200"
      default:
        return "border-green-600 bg-green-50"
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Lộ trình và khuyến nghị hành động
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Kế hoạch chi tiết từng bước, được thiết kế cho ADHD-friendly approach
        </p>
      </div>

      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="actions">Actionable Steps</TabsTrigger>
          <TabsTrigger value="motivation">Motivation Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>
                12 tuần từ zero đến production-ready system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <TimelineChart className="mb-8 max-w-6xl" startDate={new Date("2025-07-07")} />
              </div>
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                      milestone.status === "current" ? "bg-blue-600" :
                      milestone.status === "upcoming" ? "bg-gray-300" :
                      "bg-gray-200"
                    }`} />
                    
                    <div className="pl-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`absolute left-[-6px] p-1 bg-white rounded-full ${getStatusColor(milestone.status)}`}>
                          {getStatusIcon(milestone.status)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{milestone.phase}</h3>
                          <p className="text-sm text-muted-foreground">{milestone.duration}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {milestone.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">{task.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {task.description}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-medium">{task.effort}</span>
                                <div className={`text-xs mt-1 ${
                                  task.priority === "high" ? "text-red-600" :
                                  task.priority === "medium" ? "text-yellow-600" :
                                  "text-green-600"
                                }`}>
                                  {task.priority} priority
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          {actionableSteps.map((category) => {
            const Icon = category.icon
            return (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${category.bgColor}`}>
                      <Icon className={`h-5 w-5 ${category.color}`} />
                    </div>
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.steps.map((step, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold">{step.step}</h4>
                          <span className="text-sm text-muted-foreground">
                            ⏱️ {step.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {step.tools.map((tool, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-muted rounded-full">
                              {tool}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm italic text-accent">
                          💡 {step.tips}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="motivation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ADHD Survival Guide 🧠✨</CardTitle>
              <CardDescription>
                Những trick được test bởi hàng triệu não ADHD trên thế giới (và cả của tôi)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {motivationalTips.map((tip, index) => {
                  const Icon = tip.icon
                  return (
                    <div key={index} className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <Icon className="h-5 w-5 text-accent" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{tip.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>The ADHD Startup Reality Check 💯</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Mình totally get it - cảm giác hype max khi có idea mới, 
                rồi 3 giờ sau ngồi stare at blank screen như "what the hell was I thinking?". 
                Đó không phải bug, đó là feature của ADHD brain đấy!
              </p>
              <p>
                Strategy here is not to fight it, mà work with it. 
                Micro-commits (literally 1 line cũng được), visual progress tracking, 
                và immediate rewards - treat yourself như Pavlov's dog nhưng mà cute hơn.
              </p>
              <p className="font-semibold text-foreground">
                Hot take: Perfection is overrated AF. Consistency is where the magic happens. 
                1% improvement daily = you'll be 37x better in a year. Math doesn't lie! 📈
              </p>
              <p className="text-sm italic">
                P.S: Nếu bạn đang đọc cái này lúc 2h sáng thay vì ngủ, 
                then you're definitely on the right track! 😂
              </p>
            </CardContent>
          </Card>

          <Card className="border-accent bg-gradient-to-r from-blue-50 to-orange-50">
            <CardHeader>
              <CardTitle className="text-accent">Your Why 🌊</CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="italic text-muted-foreground border-l-4 border-accent pl-4">
                "Tôi muốn rời xa Hà Nội, sống gần biển ở Hạ Long, 
                có cuộc sống nhẹ nhàng và thanh bình hơn."
              </blockquote>
              <p className="mt-4 text-sm">
                Remember this every time you want to rage quit. 
                Mỗi dòng code bạn viết = 1 step closer to that beach life. 
                Hạ Long is waiting! 🏖️✨
              </p>
              <p className="mt-2 text-xs text-accent font-medium">
                Code today, chill by the sea tomorrow! 💪
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <NavigationCards />
    </div>
  )
}