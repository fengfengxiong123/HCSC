"use client";

import { LineChart } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "11/20", value: 5 },
  { date: "11/21", value: 4 },
  { date: "11/22", value: 6 },
  { date: "11/23", value: 5 },
  { date: "11/24", value: 7 },
  { date: "11/25", value: 5 },
  { date: "11/26", value: 6 },
  { date: "11/27", value: 4 },
  { date: "11/28", value: 5 },
  { date: "11/29", value: 6 },
];

const bloodMetrics = [
  { title: "White Blood Cells", value: "7.2", unit: "" },
  { title: "Red Blood Cells", value: "4.43", unit: "" },
  { title: "Globulins", value: "150", unit: "RBC" },
  { title: "C-Reactive Protein", value: "4.43", unit: "RBC" },
];

export default function MedicalDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      <div className="z-50 w-full p-8">
        <div className="z-50 grid w-full gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            {/* Patient Card */}
            <Card className="relative overflow-hidden bg-blue-600 p-6 text-white">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/50" />
              <div className="relative">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <span className="text-2xl">+</span>
                </div>
                <div className="mb-2 text-lg opacity-90">dsdfwfw452</div>
                <div className="mb-1 text-4xl font-bold">24</div>
                <div className="mb-4 flex items-center gap-2 text-sm opacity-75">
                  <span>23</span>
                  <span>years old</span>
                  <span>25</span>
                  <div className="ml-4 flex items-center gap-1">
                    <span>gender</span>
                    <span className="text-pink-300">♀</span>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30"
                >
                  View the diagnostic ticket
                </Button>
              </div>
            </Card>

            {/* Blood Sample Visualization */}
            <Card className="aspect-square overflow-hidden p-6">
              <div className="flex h-full items-center justify-center">
                <div className="relative h-4/5 w-4/5 rounded-full bg-red-100">
                  <div className="absolute inset-4 rounded-full bg-red-500/20" />
                  <div className="absolute inset-8 rounded-full bg-red-500/30" />
                  <div className="absolute inset-12 rounded-full bg-red-500/40" />
                  <div className="absolute inset-16 rounded-full bg-red-500/50" />
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
                    <RechartsLineChart data={data}>
                      <Line
                        type="monotone"
                        dataKey="value"
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
              <RechartsLineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

