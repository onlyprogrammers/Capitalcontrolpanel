"use client"

import type React from "react"

import {
  BarChart2,
  Receipt,
  CreditCard,
  Folder,
  Wallet,
  Users2,
  Settings,
  HelpCircle,
  Menu,
  PieChart,
  TrendingUp,
  Target,
  Calendar,
  FileText,
  Bell,
  DollarSign,
  Briefcase,
  Home,
  ArrowUpDown,
} from "lucide-react"

import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import mainlogo from "@/components/images/logos/mainlogo.PNG"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({
    href,
    icon: Icon,
    children,
    badge,
  }: {
    href: string
    icon: any
    children: React.ReactNode
    badge?: string
  }) {
    const isActive = pathname === href

    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className={`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
          isActive
            ? "bg-gray-100 dark:bg-[#1F1F23] text-gray-900 dark:text-white font-medium"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
        }`}
      >
        <div className="flex items-center">
          <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
          {children}
        </div>
        {badge && (
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex flex-col">
          <Link
            href="https://kokonutui.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]"
          >
            <div className="flex items-center gap-3">
              <Image
                src={mainlogo}
                alt="Acme"
                width={32}
                height={32}
                className="flex-shrink-0 hidden dark:block"
              />
              <Image
                src="https://kokonutui.com/logo-black.svg"
                alt="Acme"
                width={32}
                height={32}
                className="flex-shrink-0 block dark:hidden"
              />
              <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white">
                Capital Monitor
              </span>
            </div>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Overview
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard" icon={Home}>
                    Dashboard
                  </NavItem>
                  <NavItem href="/transactions" icon={ArrowUpDown}>
                    Transactions
                  </NavItem>
                  <NavItem href="/budget" icon={Target}>
                    Budget
                  </NavItem>
                  <NavItem href="/analytics" icon={BarChart2}>
                    Analytics
                  </NavItem>
                  <NavItem href="/reports" icon={FileText}>
                    Reports
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Finance Management
                </div>
                <div className="space-y-1">
                  <NavItem href="/accounts" icon={Wallet}>
                    Accounts
                  </NavItem>
                  <NavItem href="/investments" icon={TrendingUp}>
                    Investments
                  </NavItem>
                  <NavItem href="/goals" icon={Target}>
                    Financial Goals
                  </NavItem>
                  <NavItem href="/bills" icon={Receipt} badge="3">
                    Bills & Subscriptions
                  </NavItem>
                  <NavItem href="/cards" icon={CreditCard}>
                    Credit Cards
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Planning & Tools
                </div>
                <div className="space-y-1">
                  <NavItem href="/calculator" icon={DollarSign}>
                    Calculator
                  </NavItem>
                  <NavItem href="/calendar" icon={Calendar}>
                    Financial Calendar
                  </NavItem>
                  <NavItem href="/insights" icon={PieChart}>
                    AI Insights
                  </NavItem>
                  <NavItem href="/alerts" icon={Bell} badge="2">
                    Alerts
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Business
                </div>
                <div className="space-y-1">
                  <NavItem href="/business" icon={Briefcase}>
                    Business Overview
                  </NavItem>
                  <NavItem href="/invoices" icon={Receipt}>
                    Invoices
                  </NavItem>
                  <NavItem href="/expenses" icon={Folder}>
                    Expense Reports
                  </NavItem>
                  <NavItem href="/team" icon={Users2}>
                    Team Management
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem href="/settings" icon={Settings}>
                Settings
              </NavItem>
              <NavItem href="/help" icon={HelpCircle}>
                Help & Support
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
