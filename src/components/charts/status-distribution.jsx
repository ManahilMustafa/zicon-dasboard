"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer, defs, linearGradient, stop } from "recharts"

export function StatusDistributionChart({ data }) {
  // ✅ Dummy fallback data (for now)
  const chartData = data?.length
    ? data
    : [
        { status: "Verified", value: 45 },
        { status: "Pending", value: 25 },
        { status: "Flagged", value: 15 },
      ]

  return (
    <Card className="bg-background border-border">
      <CardHeader className="pb-2 text-[#352857] dark:text-white">
        <CardTitle className="text-sm sm:text-base">Asset Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: { label: "Assets", color: "hsl(var(--chart-1))" },
          }}
          className="h-[200px] sm:h-[240px] lg:h-[280px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {/* ✅ Light Theme Gradients */}
                <linearGradient id="gradVerified" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#35C759" />
                  <stop offset="100%" stopColor="#A3E635" />
                </linearGradient>
                <linearGradient id="gradPending" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#FCD34D" />
                </linearGradient>
                <linearGradient id="gradFlagged" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#F87171" />
                </linearGradient>

                {/* ✅ Dark Theme Gradients */}
                <linearGradient id="gradVerifiedDark" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4ADE80" />
                  <stop offset="100%" stopColor="#166534" />
                </linearGradient>
                <linearGradient id="gradPendingDark" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FACC15" />
                  <stop offset="100%" stopColor="#854D0E" />
                </linearGradient>
                <linearGradient id="gradFlaggedDark" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F87171" />
                  <stop offset="100%" stopColor="#7F1D1D" />
                </linearGradient>
              </defs>

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="status"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                stroke="none"
              >
                {chartData.map((entry, idx) => {
                  const gradientIds = [
                    "gradVerified",
                    "gradPending",
                    "gradFlagged",
                  ]
                  const darkGradientIds = [
                    "gradVerifiedDark",
                    "gradPendingDark",
                    "gradFlaggedDark",
                  ]
                  return (
                    <Cell
                      key={idx}
                      fill={`url(#${gradientIds[idx % gradientIds.length]})`}
                      className={`dark:fill-[url(#${darkGradientIds[idx % darkGradientIds.length]})]`}
                    />
                  )
                })}
              </Pie>

              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
