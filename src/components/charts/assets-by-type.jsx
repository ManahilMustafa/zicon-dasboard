"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, defs, linearGradient, stop } from "recharts"

export function AssetsByTypeChart({ data }) {
  // ✅ Dummy fallback data (for now)
  const chartData = data?.length
    ? data
    : [
        { type: "Carbon Credits", count: 25 },
        { type: "Certificates", count: 15 },
        { type: "Real Estate", count: 10 },
        { type: "Energy Tokens", count: 18 },
      ]

  return (
    <Card className="bg-background border-border">
      <CardHeader className="pb-2 text-[#352857] dark:text-white">
        <CardTitle className="text-sm sm:text-base">Assets by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: { label: "Count", color: "var(--chart-bar)" },
          }}
          className="h-[200px] sm:h-[240px] lg:h-[280px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
              <defs>
                {/* ✅ Gradient that looks good in both themes */}
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4435F9" />
                  <stop offset="100%" stopColor="#6281FF" />
                </linearGradient>
                <linearGradient id="barGradientDark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C5CFF" />
                  <stop offset="100%" stopColor="#3D2B7F" />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.3)" />
              <XAxis
                dataKey="type"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(var(--foreground))", fontSize: 10 }}
                interval="preserveStartEnd"
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(var(--foreground))", fontSize: 10 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />

              {/* ✅ Automatically switch gradient in dark mode */}
              <Bar
                dataKey="count"
                fill="url(#barGradient)"
                className="dark:fill-[url(#barGradientDark)]"
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
