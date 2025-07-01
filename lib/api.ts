import axios from "axios"

const api = axios.create({
  baseURL: "/public",
  timeout: 10000,
})

export interface Transaction {
  id: string
  title: string
  amount: number
  type: "incoming" | "outgoing"
  category: string
  date: string
  time: string
  status: "completed" | "pending" | "failed"
  description: string
}

export interface Budget {
  id: string
  category: string
  budget: number
  spent: number
  remaining: number
  percentage: number
  month: string
}

export interface Analytics {
  monthlySummary: {
    totalIncome: number
    totalExpenses: number
    netIncome: number
    savingsRate: number
  }
  categoryBreakdown: Array<{
    category: string
    amount: number
    percentage: number
  }>
  weeklyTrend: Array<{
    week: string
    income: number
    expenses: number
  }>
}

export const apiService = {
  async getTransactions(): Promise<Transaction[]> {
    try {
      const response = await api.get("/data/transactions.json")
      console.log("Transactions response:", response.data) // Debug log
      return response.data.transactions || []
    } catch (error) {
      console.error("Error fetching transactions:", error)
      return []
    }
  },

  async getBudgets(): Promise<Budget[]> {
    try {
      const response = await api.get("/data/budgets.json")
      console.log("Budgets response:", response.data) // Debug log
      return response.data.budgets || []
    } catch (error) {
      console.error("Error fetching budgets:", error)
      return []
    }
  },

  async getAnalytics(): Promise<Analytics> {
    try {
      const response = await api.get("/data/analytics.json")
      console.log("Analytics response:", response.data) // Debug log
      return (
        response.data.analytics || {
          monthlySummary: { totalIncome: 0, totalExpenses: 0, netIncome: 0, savingsRate: 0 },
          categoryBreakdown: [],
          weeklyTrend: [],
        }
      )
    } catch (error) {
      console.error("Error fetching analytics:", error)
      return {
        monthlySummary: { totalIncome: 0, totalExpenses: 0, netIncome: 0, savingsRate: 0 },
        categoryBreakdown: [],
        weeklyTrend: [],
      }
    }
  },

  async createTransaction(transaction: Omit<Transaction, "id">): Promise<Transaction> {
    // Simulate API call - in real app, this would post to server
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    }
    return newTransaction
  },

  async updateBudget(budgetId: string, updates: Partial<Budget>): Promise<Budget> {
    // Simulate API call
    const budgets = await this.getBudgets()
    const budget = budgets.find((b) => b.id === budgetId)
    if (!budget) throw new Error("Budget not found")

    return { ...budget, ...updates }
  },
}
