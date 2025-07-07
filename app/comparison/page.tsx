"use client"

import { useState } from "react"
import { NavigationCards } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ComparisonChart } from "@/components/charts/comparison-chart"
import { 
  BarChart, 
  AlertTriangle, 
  CheckCircle2,
  XCircle,
  TrendingUp,
  DollarSign,
  Users,
  Gauge,
  Database,
  Server,
  Globe
} from "lucide-react"

const comparisons = {
  data: {
    title: "Giải pháp lưu trữ dữ liệu",
    options: [
      {
        name: "Elasticsearch",
        score: {
          performance: 82,
          scalability: 88,
          cost: 55,
          learning: 72,
          ecosystem: 92
        },
        pros: [
          "Tìm kiếm toàn văn xuất sắc",
          "Hệ sinh thái trường thành",
          "Khả năng tổng hợp mạnh mẽ",
          "Cộng đồng hỗ trợ rộng lớn"
        ],
        cons: [
          "Tiêu thụ tài nguyên cao",
          "Quản lý cluster phức tạp",
          "Chi phí cao khi mở rộng",
          "Cần tối ưu JVM"
        ],
        bestFor: "Yêu cầu tìm kiếm phức tạp, phân tích log"
      },
      {
        name: "ClickHouse",
        score: {
          performance: 94,
          scalability: 89,
          cost: 85,
          learning: 68,
          ecosystem: 74
        },
        pros: [
          "Truy vấn OLAP cực nhanh",
          "Nén dữ liệu hiệu quả",
          "Chi phí vận hành thấp",
          "Giao diện SQL quen thuộc"
        ],
        cons: [
          "Tìm kiếm toàn văn hạn chế",
          "Hệ sinh thái nhỏ hơn",
          "Schema ít linh hoạt",
          "Ít công cụ trực quan hóa"
        ],
        bestFor: "Dữ liệu chuỗi thời gian, tải phân tích"
      },
      {
        name: "Apache Druid",
        score: {
          performance: 86,
          scalability: 84,
          cost: 72,
          learning: 58,
          ecosystem: 69
        },
        pros: [
          "Nhập dữ liệu thời gian thực",
          "Truy vấn dưới giây",
          "Tốt cho dữ liệu chuỗi thời gian",
          "Tự động quản lý dữ liệu cũ"
        ],
        cons: [
          "Kiến trúc phức tạp",
          "Hỗ trợ join hạn chế",
          "Khó học và triển khai",
          "Tiêu thụ nhiều tài nguyên"
        ],
        bestFor: "Dashboard phân tích thời gian thực"
      }
    ]
  },
  backend: {
    title: "Framework backend",
    options: [
      {
        name: "FastAPI",
        score: {
          performance: 91,
          scalability: 83,
          cost: 88,
          learning: 76,
          ecosystem: 78
        },
        pros: [
          "Tự động tạo tài liệu API",
          "Kiểm tra kiểu và xác thực",
          "Hiệu suất cao",
          "Tính năng Python hiện đại"
        ],
        cons: [
          "Hệ sinh thái nhỏ hơn Django",
          "Ít tính năng sẵn có",
          "Phức tạp bất đồng bộ",
          "Framework tương đối mới"
        ],
        bestFor: "Ứng dụng ưu tiên API, vi dịch vụ"
      },
      {
        name: "Django REST",
        score: {
          performance: 73,
          scalability: 79,
          cost: 82,
          learning: 81,
          ecosystem: 93
        },
        pros: [
          "Trường thành và ổn định",
          "Hệ sinh thái rộng lớn",
          "Giao diện quản trị tích hợp",
          "ORM toàn diện"
        ],
        cons: [
          "Hiệu suất chậm hơn",
          "Xu hướng nguyên khối",
          "Mặc định đồng bộ",
          "Nặng cho API đơn giản"
        ],
        bestFor: "Ứng dụng đầy đủ tính năng, nguyên mẫu nhanh"
      },
      {
        name: "Node.js + Express",
        score: {
          performance: 85,
          scalability: 87,
          cost: 89,
          learning: 74,
          ecosystem: 88
        },
        pros: [
          "JavaScript toàn stack",
          "Hệ sinh thái NPM rộng lớn",
          "I/O không chặn",
          "Tốt cho thời gian thực"
        ],
        cons: [
          "Phức tạp callback",
          "Vấn đề type safety",
          "Hạn chế xử lý CPU nặng",
          "Chất lượng package không đồng đều"
        ],
        bestFor: "Ứng dụng thời gian thực, team JavaScript"
      }
    ]
  },
  frontend: {
    title: "Thư viện trực quan hóa",
    options: [
      {
        name: "ECharts",
        score: {
          performance: 89,
          scalability: 86,
          cost: 95,
          learning: 67,
          ecosystem: 82
        },
        pros: [
          "Nhiều loại biểu đồ đa dạng",
          "Hiệu suất tốt",
          "Tương thích mobile",
          "Tương tác phong phú"
        ],
        cons: [
          "Kích thước bundle lớn",
          "API phức tạp",
          "Tài liệu chủ yếu tiếng Trung",
          "Khó học ban đầu"
        ],
        bestFor: "Dashboard phức tạp, bộ dữ liệu lớn"
      },
      {
        name: "Chart.js",
        score: {
          performance: 78,
          scalability: 71,
          cost: 95,
          learning: 87,
          ecosystem: 83
        },
        pros: [
          "Dễ học và sử dụng",
          "Tài liệu rõ ràng",
          "Nhẹ và nhanh",
          "Hiệu ứng mượt mà"
        ],
        cons: [
          "Loại biểu đồ hạn chế",
          "Tùy chỉnh hạn chế",
          "Hiệu suất với dữ liệu lớn",
          "Tương tác cơ bản"
        ],
        bestFor: "Dashboard đơn giản, nguyên mẫu nhanh"
      },
      {
        name: "D3.js",
        score: {
          performance: 84,
          scalability: 93,
          cost: 95,
          learning: 42,
          ecosystem: 89
        },
        pros: [
          "Linh hoạt tối đa",
          "Có thể tạo bất kỳ trực quan nào",
          "Kiểm soát DOM trực tiếp",
          "Cộng đồng rộng lớn"
        ],
        cons: [
          "Rất khó học",
          "Cần viết nhiều code hơn",
          "Không có biểu đồ sẵn có",
          "Mất thời gian phát triển"
        ],
        bestFor: "Trực quan hóa tùy chỉnh, yêu cầu đặc biệt"
      }
    ]
  }
}

const riskCategories = [
  {
    category: "Rủi ro kỹ thuật",
    icon: AlertTriangle,
    risks: [
      {
        risk: "Cụm Elasticsearch gặp sự cố",
        impact: "High",
        likelihood: "Medium",
        mitigation: "Thiết lập đa node, sao lưu định kỳ, giám sát liên tục"
      },
      {
        risk: "Hiệu suất giảm khi mở rộng",
        impact: "High",
        likelihood: "Medium",
        mitigation: "Chiến lược cache, tối ưu truy vấn, mở rộng theo chiều ngang"
      },
      {
        risk: "Nghắn cổ chai nhập dữ liệu",
        impact: "Medium",
        likelihood: "High",
        mitigation: "Hệ thống hàng đợi (Kafka), xử lý batch, giới hạn tốc độ"
      }
    ]
  },
  {
    category: "Rủi ro vận hành",
    icon: Gauge,
    risks: [
      {
        risk: "Chi phí hạ tầng cao",
        impact: "High",
        likelihood: "High",
        mitigation: "Giám sát chi phí, chính sách tự động mở rộng, instance dự trữ"
      },
      {
        risk: "Quy trình triển khai phức tạp",
        impact: "Medium",
        likelihood: "Medium",
        mitigation: "Pipeline CI/CD, Infrastructure as Code, container hóa"
      },
      {
        risk: "Điểm mù trong giám sát",
        impact: "Medium",
        likelihood: "Medium",
        mitigation: "Ghi log toàn diện, công cụ APM, hệ thống cảnh báo"
      }
    ]
  },
  {
    category: "Rủi ro phát triển",
    icon: Users,
    risks: [
      {
        risk: "Thiếu kỹ năng trong team",
        impact: "High",
        likelihood: "Medium",
        mitigation: "Chương trình đào tạo, tuyển chuyên gia, lập trình đôi"
      },
      {
        risk: "Tích hợp phức tạp",
        impact: "Medium",
        likelihood: "High",
        mitigation: "Kiến trúc module, API rõ ràng, kiểm thử tích hợp"
      },
      {
        risk: "Mở rộng phạm vi không kiểm soát",
        impact: "High",
        likelihood: "High",
        mitigation: "Phương pháp MVP, đánh giá định kỳ, yêu cầu rõ ràng"
      }
    ]
  }
]

export default function ComparisonPage() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof comparisons>("data")

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "text-red-600 bg-red-50"
      case "Medium": return "text-yellow-600 bg-yellow-50"
      case "Low": return "text-green-600 bg-green-50"
      default: return ""
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
          So sánh và phân tích rủi ro
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
          Đánh giá chi tiết các lựa chọn công nghệ và những rủi ro tiềm ẩn
        </p>
      </div>

      <Tabs defaultValue="comparison" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="comparison">So sánh công nghệ</TabsTrigger>
          <TabsTrigger value="risks">Phân tích rủi ro</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-6">
          <div className="flex flex-wrap gap-2 justify-center px-4">
            <Button
              variant={selectedCategory === "data" ? "default" : "outline"}
              onClick={() => setSelectedCategory("data")}
              className="gap-2"
            >
              <Database className="h-4 w-4" />
              Data Layer
            </Button>
            <Button
              variant={selectedCategory === "backend" ? "default" : "outline"}
              onClick={() => setSelectedCategory("backend")}
              className="gap-2"
            >
              <Server className="h-4 w-4" />
              Backend
            </Button>
            <Button
              variant={selectedCategory === "frontend" ? "default" : "outline"}
              onClick={() => setSelectedCategory("frontend")}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              Frontend
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{comparisons[selectedCategory].title}</CardTitle>
              <CardDescription>
                So sánh chi tiết các lựa chọn trong {comparisons[selectedCategory].title.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-full max-w-4xl">
                    <ComparisonChart 
                      data={comparisons[selectedCategory].options.map(option => ({
                        name: option.name,
                        performance: option.score.performance,
                        scalability: option.score.scalability,
                        cost: option.score.cost,
                        learning: option.score.learning,
                        ecosystem: option.score.ecosystem
                      }))}
                      title={`So sánh ${comparisons[selectedCategory].title}`}
                    />
                  </div>
                </div>
                {comparisons[selectedCategory].options.map((option) => (
                  <div key={option.name} className="border rounded-lg p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-semibold">{option.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        Phù hợp cho: {option.bestFor}
                      </span>
                    </div>

                    <div className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                      {Object.entries(option.score).map(([metric, score]) => (
                        <div key={metric} className="text-center">
                          <div className="text-sm text-muted-foreground capitalize">
                            {metric}
                          </div>
                          <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                            {score}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className={`h-2 rounded-full ${
                                score >= 80 ? "bg-green-600" :
                                score >= 60 ? "bg-yellow-600" :
                                "bg-red-600"
                              }`}
                              style={{ width: `${score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <div>
                        <h4 className="font-medium text-green-600 mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Thế mạnh
                        </h4>
                        <ul className="space-y-1">
                          {option.pros.map((pro, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-green-600">•</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-orange-600 mb-2 flex items-center gap-2">
                          <XCircle className="h-4 w-4" />
                          Hạn chế
                        </h4>
                        <ul className="space-y-1">
                          {option.cons.map((con, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-orange-600">•</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          {riskCategories.map((category) => {
            const Icon = category.icon
            return (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.risks.map((risk, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium">{risk.risk}</h4>
                          <div className="flex gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(risk.impact)}`}>
                              Tác động: {risk.impact === 'High' ? 'Cao' : risk.impact === 'Medium' ? 'Trung bình' : 'Thấp'}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(risk.likelihood)}`}>
                              Khả năng: {risk.likelihood === 'High' ? 'Cao' : risk.likelihood === 'Medium' ? 'Trung bình' : 'Thấp'}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Biện pháp giảm thiểu: </span>
                          {risk.mitigation}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}

          <Card>
            <CardHeader>
              <CardTitle>Tổng quan Ma trận Rủi ro</CardTitle>
              <CardDescription>
                Tổng quan về mức độ rủi ro của dự án
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">3</div>
                  <div className="text-sm text-muted-foreground">Mục Rủi ro Thấp</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600">5</div>
                  <div className="text-sm text-muted-foreground">Mục Rủi ro Trung bình</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600">4</div>
                  <div className="text-sm text-muted-foreground">Mục Rủi ro Cao</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <NavigationCards />
    </div>
  )
}