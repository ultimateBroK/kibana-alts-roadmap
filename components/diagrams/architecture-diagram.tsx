"use client"

import { useEffect, useRef } from "react"
import mermaid from "mermaid"

interface ArchitectureDiagramProps {
  className?: string
}

export function ArchitectureDiagram({ className }: ArchitectureDiagramProps) {
  const diagramRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "default",
      securityLevel: "loose",
      flowchart: {
        htmlLabels: true,
        curve: "basis",
        padding: 20
      },
      themeVariables: {
        primaryColor: "#3b82f6",
        primaryTextColor: "#1f2937",
        primaryBorderColor: "#2563eb",
        lineColor: "#6b7280",
        secondaryColor: "#f3f4f6",
        tertiaryColor: "#fef3c7",
        fontSize: "16px",
        fontFamily: "system-ui, sans-serif"
      }
    })

    const diagram = `
    graph TD
        subgraph DL ["🔷 TẦNG DỮ LIỆU"]
            direction TB
            ES["🔍 Elasticsearch<br/><b>Tìm kiếm & Phân tích</b><br/>- Full-text search<br/>- Real-time analytics<br/>- Distributed storage"]
            FB["📄 Filebeat<br/><b>Thu thập Log</b><br/>- Log collection<br/>- File monitoring<br/>- Lightweight shipper"]
            LS["⚙️ Logstash<br/><b>Xử lý Dữ liệu</b><br/>- Data processing<br/>- Transform & filter<br/>- Multiple inputs"]
            K["🚀 Kafka<br/><b>Message Queue</b><br/>- Stream processing<br/>- High throughput<br/>- Fault tolerance"]
        end
        
        subgraph BL ["🔶 TẦNG BACKEND"]
            direction TB
            API["🌐 FastAPI<br/><b>REST APIs</b><br/>- High performance<br/>- Auto documentation<br/>- Type validation"]
            R["⚡ Redis<br/><b>Cache Layer</b><br/>- In-memory storage<br/>- Session management<br/>- Pub/Sub messaging"]
            PG["💾 PostgreSQL<br/><b>Metadata Store</b><br/>- ACID compliance<br/>- Rich data types<br/>- Extensible"]
            C["🔄 Celery<br/><b>Task Queue</b><br/>- Background tasks<br/>- Distributed processing<br/>- Retry mechanisms"]
        end
        
        subgraph FL ["🔸 TẦNG GIAO DIỆN"]
            direction TB
            UI["⚛️ Next.js<br/><b>React Framework</b><br/>- Server-side rendering<br/>- Static generation<br/>- Route optimization"]
            EC["📊 ECharts<br/><b>Visualization</b><br/>- Interactive charts<br/>- Rich animations<br/>- Multiple chart types"]
            TW["🎨 Tailwind CSS<br/><b>Styling Framework</b><br/>- Utility-first<br/>- Responsive design<br/>- Custom themes"]
        end
        
        subgraph OL ["🔹 TẦNG DEVOPS"]
            direction TB
            D["🐳 Docker<br/><b>Containerization</b><br/>- Application packaging<br/>- Environment isolation<br/>- Scalable deployment"]
            GF["📈 Grafana<br/><b>Monitoring</b><br/>- Visual dashboards<br/>- Alerting system<br/>- Multi-datasource"]
            PR["📉 Prometheus<br/><b>Metrics Collection</b><br/>- Time-series DB<br/>- Service monitoring<br/>- Alert manager"]
        end
        
        %% Data Flow
        FB -."logs".-> LS
        LS -."processed data".-> K
        K -."streaming".-> ES
        
        %% API Connections
        API <-."queries".-> ES
        API <-."cache".-> R
        API <-."metadata".-> PG
        API <-."tasks".-> C
        
        %% Frontend Connections
        UI <-."HTTP requests".-> API
        UI -."components".-> EC
        UI -."styling".-> TW
        
        %% DevOps Connections
        D -."containers".-> API
        D -."containers".-> ES
        GF <-."visualization".-> PR
        PR -."metrics".-> API
        PR -."metrics".-> ES
        
        %% Styling
        classDef dataStyle fill:#dbeafe,stroke:#2563eb,stroke-width:4px,color:#1e40af,font-weight:bold
        classDef backendStyle fill:#dcfce7,stroke:#16a34a,stroke-width:4px,color:#15803d,font-weight:bold
        classDef frontendStyle fill:#fce7f3,stroke:#ec4899,stroke-width:4px,color:#be185d,font-weight:bold
        classDef devopsStyle fill:#fef3c7,stroke:#f59e0b,stroke-width:4px,color:#d97706,font-weight:bold
        
        class ES,FB,LS,K dataStyle
        class API,R,PG,C backendStyle
        class UI,EC,TW frontendStyle
        class D,GF,PR devopsStyle
    `

    if (diagramRef.current) {
      diagramRef.current.innerHTML = `<div class="mermaid" style="font-size: 14px; width: 100%; height: 100%;">${diagram}</div>`
      mermaid.init(undefined, diagramRef.current.querySelector('.mermaid'))
      
      // Scale and add zoom functionality after rendering
      setTimeout(() => {
        const svg = diagramRef.current?.querySelector('svg')
        if (svg) {
          const isMobile = window.innerWidth < 768
          const defaultScale = isMobile ? '0.8' : '1.1'
          const zoomedScale = isMobile ? '1.2' : '1.5'
          
          svg.style.width = '100%'
          svg.style.height = 'auto'
          svg.style.maxWidth = 'none'
          svg.style.transform = `scale(${defaultScale})`
          svg.style.transformOrigin = 'center center'
          svg.style.cursor = 'zoom-in'
          
          // Add zoom functionality
          let isZoomed = false
          svg.addEventListener('click', () => {
            if (!isZoomed) {
              svg.style.transform = `scale(${zoomedScale})`
              svg.style.cursor = 'zoom-out'
              svg.style.transition = 'transform 0.3s ease'
              isZoomed = true
            } else {
              svg.style.transform = `scale(${defaultScale})`
              svg.style.cursor = 'zoom-in'
              isZoomed = false
            }
          })
        }
      }, 100)
    }
  }, [])

  return (
    <div className={`w-full overflow-auto ${className}`}>
      <div className="mb-4 text-center">
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
          Kiến trúc hệ thống Kibana Alternative
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground px-2">
          Sơ đồ tổng quan về cách các thành phần tương tác với nhau
        </p>
      </div>
      <div 
        ref={diagramRef} 
        className="w-full overflow-x-auto"
        style={{ 
          minHeight: window.innerWidth < 768 ? '600px' : '1000px',
          padding: window.innerWidth < 768 ? '10px' : '20px'
        }}
      />
    </div>
  )
}