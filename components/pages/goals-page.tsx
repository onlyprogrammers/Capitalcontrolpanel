"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Plus, Target, TrendingUp, Calendar, DollarSign } from "lucide-react"

export default function GoalsPage() {
  const [goals] = useState([
    {
      id: 1,
      title: "Emergency Fund",
      description: "Build 6 months of expenses",
      targetAmount: 15000,
      currentAmount: 8500,
      deadline: "2024-12-31",
      category: "savings",
      priority: "high",
    },
    {
      id: 2,
      title: "Vacation Fund",
      description: "Save for Europe trip",
      targetAmount: 5000,
      currentAmount: 2300,
      deadline: "2024-06-15",
      category: "travel",
      priority: "medium",
    },
    {
      id: 3,
      title: "New Car",
      description: "Down payment for new vehicle",
      targetAmount: 10000,
      currentAmount: 6800,
      deadline: "2024-09-30",
      category: "purchase",
      priority: "high",
    },
    {
      id: 4,
      title: "Investment Portfolio",
      description: "Build diversified investment portfolio",
      targetAmount: 25000,
      currentAmount: 12500,
      deadline: "2025-12-31",
      category: "investment",
      priority: "medium",
    },
  ])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "savings":
        return <DollarSign className="h-4 w-4" />
      case "travel":
        return <Calendar className="h-4 w-4" />
      case "purchase":
        return <Target className="h-4 w-4" />
      case "investment":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Goals</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and achieve your financial objectives</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100
          const remaining = goal.targetAmount - goal.currentAmount

          return (
            <Card key={goal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">{getCategoryIcon(goal.category)}</div>
                    <div>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className={getPriorityColor(goal.priority)}>
                    {goal.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Current</p>
                    <p className="font-semibold text-green-600">${goal.currentAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Target</p>
                    <p className="font-semibold">${goal.targetAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Remaining</p>
                    <p className="font-semibold text-blue-600">${remaining.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Deadline: {goal.deadline}</span>
                  <Button size="sm" variant="outline">
                    Add Funds
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
