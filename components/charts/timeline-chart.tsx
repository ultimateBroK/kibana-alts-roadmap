"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TimeScale
} from "chart.js"
import 'chartjs-adapter-date-fns'
import { vi } from 'date-fns/locale'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
)

interface TimelineChartProps {
  className?: string
  startDate?: Date
}

export function TimelineChart({ className, startDate = new Date("2025-07-07") }: TimelineChartProps) {
  // Tạo các mốc thời gian từ ngày bắt đầu
  const generateWeekDates = (start: Date) => {
    const dates = []
    for (let i = 0; i < 12; i++) {
      const date = new Date(start)
      date.setDate(date.getDate() + (i * 7))
      dates.push(date.toLocaleDateString('vi-VN', { 
        day: '2-digit', 
        month: '2-digit',
        year: 'numeric'
      }))
    }
    return dates
  }
  
  const weekLabels = generateWeekDates(startDate)
  
  const data = {
    labels: weekLabels,
    datasets: [
      {
        label: "Planned Progress (%)",
        data: [0, 8, 16, 25, 35, 45, 55, 65, 75, 85, 95, 100],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true
      },
      {
        label: "Feature Completion",
        data: [0, 5, 12, 20, 30, 42, 58, 68, 78, 88, 96, 100],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: false,
        borderDash: [5, 5]
      },
      {
        label: "Team Velocity",
        data: [0, 10, 18, 22, 28, 40, 50, 60, 72, 82, 92, 100],
        borderColor: "rgb(245, 158, 11)",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        tension: 0.4,
        fill: false
      }
    ]
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Lộ trình dự án 12 tuần (bắt đầu 07/07/2025)',
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: 20
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}%`
          },
          title: function(context) {
            return `Tuần ${context[0].dataIndex + 1}: ${context[0].label}`
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Thời gian (tuần)',
          font: {
            size: 14
          }
        },
        ticks: {
          maxRotation: 45,
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
          text: 'Tiến độ hoàn thành (%)',
          font: {
            size: 14
          }
        },
        ticks: {
          callback: function(value) {
            return `${value}%`
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
    elements: {
      point: {
        radius: 6,
        hoverRadius: 8
      },
      line: {
        tension: 0.4,
        borderWidth: 3
      }
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="h-96 lg:h-[500px]">
        <Line data={data} options={options} />
      </div>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>Dự án bắt đầu: <strong>{startDate.toLocaleDateString('vi-VN')}</strong></p>
        <p>Dự kiến hoàn thành: <strong>{new Date(startDate.getTime() + 84 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN')}</strong></p>
      </div>
    </div>
  )
}