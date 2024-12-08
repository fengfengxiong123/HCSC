'use client'

import React from 'react'
import { LineChart, UserIcon as Male } from 'lucide-react'
import { Card } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { UseData } from '../../../hooks/detailHook'

// Utility function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

// Utility function to get the latest report
const getLatestReport = (reports: any[]) => {
  return reports.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest
  })
}

export default function MedicalDashboard() {
  const { userTableId, userObject, reportAllInfos, loading, error } = UseData()

  if (loading) {
    return <div>加载中...</div>
  }

  if (error) {
    return <div>错误: {error}</div>
  }

  if (userObject && reportAllInfos.length > 0) {
    const latestReport = getLatestReport(reportAllInfos)

    const bloodMetrics = [
      { title: '白细胞', value: latestReport.wbc, unit: '' },
      { title: '红细胞', value: latestReport.rbc, unit: '' },
      { title: '血小板', value: latestReport.platelets, unit: '' },
      { title: 'C反应蛋白', value: latestReport.crp, unit: '' },
    ]

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <header className="mb-8 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
            H
          </div>
          <span className="text-xl font-bold">HCSC</span>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            {/* Patient Card */}
            <Card className="relative overflow-hidden bg-blue-600 p-6 text-white">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/50" />
              <div className="relative">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <span className="text-2xl">+</span>
                </div>
                <div className="mb-2 text-lg opacity-90">{userTableId}</div>
                <div className="mb-1 text-4xl font-bold">{userObject.name}</div>
                <div className="mb-4 flex items-center gap-2 text-sm opacity-75">
                  <span>{userObject.age}</span>
                  <span>岁</span>
                  <div className="ml-4 flex items-center gap-1">
                    <span>性别</span>
                    <Male className="h-4 w-4 text-blue-300" />
                  </div>
                </div>
                <Button variant="secondary" className="bg-white/20 hover:bg-white/30">
                  查看诊断单
                </Button>
              </div>
            </Card>

            {/* Blood Sample Visualization */}
            <Card className="aspect-square overflow-hidden p-6">
              <div className="flex h-full items-center justify-center">
                <div className="relative h-4/5 w-4/5 rounded-full overflow-hidden">
                  <img
                    src="/img1.png"
                    alt="红细胞"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Metrics Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {bloodMetrics.map((metric, index) => (
              <Card key={index} className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600">{metric.title}</span>
                </div>
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <span className="text-sm text-gray-500">{metric.unit}</span>
                </div>
                <div className="h-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={reportAllInfos}>
                      <Line
                        type="monotone"
                        dataKey={metric.title.toLowerCase().replace(/ /g, '_')}
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={false}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Trend Chart */}
        <Card className="mt-8 p-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={reportAllInfos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis />
                <Tooltip labelFormatter={formatDate} />
                <Line type="monotone" dataKey="wbc" name="白细胞" stroke="#2563eb" strokeWidth={2} />
                <Line type="monotone" dataKey="rbc" name="红细胞" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="platelets" name="血小板" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="crp" name="C反应蛋白" stroke="#ef4444" strokeWidth={2} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    )
  }

  return <div>没有可用数据</div>
}

