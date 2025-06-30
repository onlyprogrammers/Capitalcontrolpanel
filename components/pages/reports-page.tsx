"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Calendar, TrendingUp, PieChart, BarChart3 } from "lucide-react"

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      title: "Monthly Financial Summary",
      description: "Complete overview of income, expenses, and savings",
      type: "PDF",
      lastGenerated: "2024-12-30",
      icon: FileText,
    },
    {
      id: 2,
      title: "Expense Category Analysis",
      description: "Detailed breakdown of spending by category",
      type: "Excel",
      lastGenerated: "2024-12-29",
      icon: PieChart,
    },
    {
      id: 3,
      title: "Income Trend Report",
      description: "Monthly income trends and projections",
      type: "PDF",
      lastGenerated: "2024-12-28",
      icon: TrendingUp,
    },
    {
      id: 4,
      title: "Budget Performance",
      description: "Budget vs actual spending comparison",
      type: "PDF",
      lastGenerated: "2024-12-27",
      icon: BarChart3,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate and download comprehensive financial reports</p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => {
          const IconComponent = report.icon
          return (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{report.type}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Last generated: {report.lastGenerated}
                  </span>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
