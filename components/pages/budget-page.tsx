"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Plus, TrendingUp, TrendingDown, AlertTriangle, Target } from "lucide-react"
import { apiService, type Budget } from "@/lib/api"

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBudgets()
  }, [])

  const loadBudgets = async () => {
    try {
      const data = await apiService.getBudgets()
      setBudgets(data)
    } catch (error) {
      console.error("Failed to load budgets:", error)
    } finally {
      setLoading(false)
    }
  }

  const getBudgetStatus = (percentage: number) => {
    if (percentage >= 100)
      return { status: "over", color: "text-red-600", bgColor: "bg-red-100 dark:bg-red-900", icon: AlertTriangle }
    if (percentage >= 80)
      return {
        status: "warning",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100 dark:bg-yellow-900",
        icon: TrendingUp,
      }
    return { status: "good", color: "text-green-600", bgColor: "bg-green-100 dark:bg-green-900", icon: Target }
  }

  const totalBudget = budgets.reduce((sum, b) => sum + b.budget, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)
  const totalRemaining = budgets.reduce((sum, b) => sum + b.remaining, 0)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Budget Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage your spending budgets</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Budget
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${totalBudget.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Across {budgets.length} categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {((totalSpent / totalBudget) * 100).toFixed(1)}% of total budget
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalRemaining >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${totalRemaining.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Available to spend</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((budget) => {
          const budgetStatus = getBudgetStatus(budget.percentage)
          const StatusIcon = budgetStatus.icon

          return (
            <Card key={budget.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg capitalize">{budget.category}</CardTitle>
                  <div className={`p-2 rounded-full ${budgetStatus.bgColor}`}>
                    <StatusIcon className={`h-4 w-4 ${budgetStatus.color}`} />
                  </div>
                </div>
                <CardDescription>{budget.month}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                  <Badge variant="outline" className={`${budgetStatus.color} ${budgetStatus.bgColor}`}>
                    {budget.percentage}%
                  </Badge>
                </div>

                <Progress value={Math.min(budget.percentage, 100)} className="h-2" />

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Budget</p>
                    <p className="font-semibold">${budget.budget.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Spent</p>
                    <p className="font-semibold text-red-600">${budget.spent.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Remaining</p>
                    <p className={`font-semibold ${budget.remaining >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ${budget.remaining.toFixed(2)}
                    </p>
                  </div>
                </div>

                {budget.percentage >= 100 && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-600 font-medium">Budget Exceeded</span>
                    </div>
                    <p className="text-xs text-red-600 mt-1">
                      You've spent ${(budget.spent - budget.budget).toFixed(2)} over your budget
                    </p>
                  </div>
                )}

                {budget.percentage >= 80 && budget.percentage < 100 && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm text-yellow-600 font-medium">Approaching Limit</span>
                    </div>
                    <p className="text-xs text-yellow-600 mt-1">
                      You have ${budget.remaining.toFixed(2)} left to spend
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
