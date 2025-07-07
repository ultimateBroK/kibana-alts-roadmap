"use client"

import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface ComparisonData {
  name: string
  performance: number
  scalability: number
  cost: number
  learning: number
  ecosystem: number
}

interface ComparisonChartProps {
  data: ComparisonData[]
  title: string
}

export function ComparisonChart({ data, title }: ComparisonChartProps) {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: "Performance",
        data: data.map(item => item.performance),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1
      },
      {
        label: "Scalability", 
        data: data.map(item => item.scalability),
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgb(16, 185, 129)",
        borderWidth: 1
      },
      {
        label: "Cost Efficiency",
        data: data.map(item => item.cost),
        backgroundColor: "rgba(245, 158, 11, 0.8)",
        borderColor: "rgb(245, 158, 11)",
        borderWidth: 1
      },
      {
        label: "Learning Curve",
        data: data.map(item => item.learning),
        backgroundColor: "rgba(139, 92, 246, 0.8)",
        borderColor: "rgb(139, 92, 246)",
        borderWidth: 1
      },
      {
        label: "Ecosystem",
        data: data.map(item => item.ecosystem),
        backgroundColor: "rgba(236, 72, 153, 0.8)",
        borderColor: "rgb(236, 72, 153)",
        borderWidth: 1
      }
    ]
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14
          },
          padding: 20
        }
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: 20
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}/100 điểm`
          }
        },
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Công nghệ',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Điểm số đánh giá',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          callback: function(value) {
            return `${value} điểm`
          },
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    barThickness: 'flex',
    categoryPercentage: 0.8,
    barPercentage: 0.9
  }

  return (
    <div className="w-full">
      <div className="h-64 sm:h-80 md:h-96 lg:h-[500px]">
        <Bar data={chartData} options={options} />
      </div>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>Điểm số được đánh giá trên thang điểm 100, dựa trên kinh nghiệm thực tế và feedback cộng đồng</p>
      </div>
    </div>
  )
}