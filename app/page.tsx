import { NavigationCards } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArchitectureDiagram } from "@/components/diagrams/architecture-diagram"
import { 
  Database, 
  Server, 
  Globe, 
  BarChart, 
  Package, 
  Zap,
  Shield,
  Cloud,
  GitBranch,
  Cpu
} from "lucide-react"

const techStackLayers = [
  {
    id: "data",
    title: "Data Storage & Analytics Layer",
    icon: Database,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "Trái tim của hệ thống - nơi lưu trữ và xử lý dữ liệu",
    components: [
      {
        name: "Elasticsearch",
        description: "Công cụ tìm kiếm và phân tích phân tán mạnh mẽ",
        pros: ["Tìm kiếm toàn văn", "Aggregations mạnh mẽ", "Hệ sinh thái hoàn thiện"],
        cons: ["Tốn tài nguyên", "Cấu hình phức tạp"],
        alternatives: ["ClickHouse", "Apache Druid"]
      },
      {
        name: "Data Ingestion",
        description: "Logstash / Filebeat / Kafka để đưa dữ liệu vào hệ thống",
        pros: ["Đa dạng nguồn dữ liệu", "Xử lý realtime", "Độ tin cậy cao"],
        cons: ["Cần quản lý pipeline", "Monitoring phức tạp"],
        alternatives: ["Apache NiFi", "Fluentd"]
      }
    ]
  },
  {
    id: "backend",
    title: "Backend & API Layer",
    icon: Server,
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "Xử lý logic nghiệp vụ và cung cấp API",
    components: [
      {
        name: "FastAPI",
        description: "Framework Python hiệu năng cao cho RESTful APIs",
        pros: ["Hiệu suất cao", "Auto documentation", "Type hints"],
        cons: ["Ecosystem nhỏ hơn Django", "Async complexity"],
        alternatives: ["Django REST", "Node.js + Express"]
      },
      {
        name: "Redis",
        description: "In-memory cache cho query results",
        pros: ["Cực nhanh", "Đa dạng data structures", "Pub/Sub"],
        cons: ["Data volatility", "Memory limitations"],
        alternatives: ["Memcached", "Hazelcast"]
      }
    ]
  },
  {
    id: "frontend",
    title: "Frontend Layer",
    icon: Globe,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "Giao diện người dùng và trực quan hóa dữ liệu",
    components: [
      {
        name: "Next.js",
        description: "React framework với SSR/SSG",
        pros: ["SEO tốt", "Performance", "Developer experience"],
        cons: ["Learning curve", "Build complexity"],
        alternatives: ["Remix", "Nuxt.js", "SvelteKit"]
      },
      {
        name: "ECharts",
        description: "Thư viện visualization mạnh mẽ",
        pros: ["Đa dạng chart types", "Performance tốt", "Customization cao"],
        cons: ["File size lớn", "API phức tạp"],
        alternatives: ["Chart.js", "D3.js", "Plotly"]
      }
    ]
  }
]

export default function Home() {
  return (
    <>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Giải mã công nghệ sử dụng
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hiểu rõ từng thành phần trong hệ thống trực quan hóa dữ liệu mạnh mẽ tương tự Kibana
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="details">Phân tích chi tiết</TabsTrigger>
            <TabsTrigger value="architecture">Kiến trúc hệ thống</TabsTrigger>
            <TabsTrigger value="why">Lý do lựa chọn</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tổng quan công nghệ sử dụng</CardTitle>
                <CardDescription>
                  Cái nhìn tổng quan về các tầng trong hệ thống
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  {techStackLayers.map((layer) => {
                    const Icon = layer.icon
                    return (
                      <div
                        key={layer.id}
                        className={`relative overflow-hidden rounded-lg border p-6 ${layer.bgColor}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <Icon className={`h-8 w-8 ${layer.color}`} />
                            <h3 className="font-semibold">{layer.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {layer.description}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          {layer.components.map((comp) => (
                            <div
                              key={comp.name}
                              className="flex items-center gap-2 text-sm"
                            >
                              <Package className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{comp.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Điểm mạnh của Công nghệ Được chọn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Hiệu suất cao</h4>
                      <p className="text-sm text-muted-foreground">
                        FastAPI kết hợp Redis cache đảm bảo thời gian phản hồi nhanh chóng
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Độ tin cậy</h4>
                      <p className="text-sm text-muted-foreground">
                        Cụm Elasticsearch với khả năng sẵn sàng cao
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Cloud className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Tương thích Đám mây</h4>
                      <p className="text-sm text-muted-foreground">
                        Docker và Kubernetes sẵn sàng cho việc mở rộng
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GitBranch className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Linh hoạt</h4>
                      <p className="text-sm text-muted-foreground">
                        Kiến trúc module, dễ dàng thay thế các thành phần
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            {techStackLayers.map((layer) => (
              <Card key={layer.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <layer.icon className={`h-5 w-5 ${layer.color}`} />
                    {layer.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {layer.components.map((comp) => (
                      <div key={comp.name} className="space-y-3">
                        <h4 className="font-semibold text-lg">{comp.name}</h4>
                        <p className="text-muted-foreground">{comp.description}</p>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <h5 className="font-medium text-green-600 mb-2">Thế mạnh</h5>
                            <ul className="space-y-1">
                              {comp.pros.map((pro, i) => (
                                <li key={i} className="text-sm flex items-start gap-2">
                                  <span className="text-green-600">•</span>
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-orange-600 mb-2">Hạn chế</h5>
                            <ul className="space-y-1">
                              {comp.cons.map((con, i) => (
                                <li key={i} className="text-sm flex items-start gap-2">
                                  <span className="text-orange-600">•</span>
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="pt-2">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Lựa chọn thay thế:</span>{" "}
                            {comp.alternatives.join(", ")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="architecture" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Kiến trúc hệ thống</CardTitle>
                <CardDescription>
                  Sơ đồ tổng quan về cách các thành phần tương tác với nhau
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2">
                <div className="w-full bg-muted/30 rounded-lg">
                  <ArchitectureDiagram className="w-full" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="why" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tại sao lựa chọn công nghệ này?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">1. Phù hợp với mục tiêu dự án</h4>
                  <p className="text-muted-foreground">
                    Bộ công nghệ này được thiết kế để xử lý dữ liệu lớn, phân tích thời gian thực 
                    và trực quan hóa phức tạp - chính xác những gì một hệ thống tương tự Kibana cần.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">2. Cân bằng giữa hiệu suất và trải nghiệm lập trình</h4>
                  <p className="text-muted-foreground">
                    FastAPI kết hợp Next.js cho phép phát triển nhanh chóng nhưng vẫn đảm bảo hiệu suất. 
                    Kiểm tra kiểu dữ liệu với TypeScript giúp giảm thiểu lỗi.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">3. Hệ sinh thái mạnh mẽ</h4>
                  <p className="text-muted-foreground">
                    Tất cả các công nghệ được chọn đều có cộng đồng lớn, tài liệu chất lượng, 
                    và nhiều tài nguyên hỗ trợ học tập.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">4. Sẵn sàng cho tương lai</h4>
                  <p className="text-muted-foreground">
                    Kiến trúc sẵn sàng cho vi dịch vụ, tương thích đám mây, và dễ dàng mở rộng khi 
                    dự án phát triển.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <NavigationCards />
      </div>
    </>
  )
}