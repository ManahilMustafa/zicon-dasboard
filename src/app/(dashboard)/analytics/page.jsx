"use client"

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const distribution = [
  { t: "Jan", carbon: 18, real: 10, edu: 6 },
  { t: "Feb", carbon: 20, real: 12, edu: 6 },
  { t: "Mar", carbon: 22, real: 13, edu: 7 },
  { t: "Apr", carbon: 24, real: 14, edu: 7 },
  { t: "May", carbon: 25, real: 16, edu: 8 },
  { t: "Jun", carbon: 27, real: 17, edu: 8 },
]

const growth = [
  { t: "Jan", carbon: 18, certificates: 10, real: 6 },
  { t: "Feb", carbon: 20, certificates: 12, real: 6 },
  { t: "Mar", carbon: 22, certificates: 13, real: 7 },
  { t: "Apr", carbon: 24, certificates: 14, real: 7 },
  { t: "May", carbon: 25, certificates: 16, real: 8 },
  { t: "Jun", carbon: 27, certificates: 17, real: 8 },
]

const scoreDist = [
  { bucket: "40-49", assets: 4 },
  { bucket: "50-59", assets: 6 },
  { bucket: "60-69", assets: 8 },
  { bucket: "70-79", assets: 7 },
  { bucket: "80-89", assets: 5 },
  { bucket: "90-100", assets: 2 },
]

const verification = [
  { t: "Jan", verified: 6, pending: 5, flagged: 1 },
  { t: "Feb", verified: 7, pending: 6, flagged: 1 },
  { t: "Mar", verified: 8, pending: 6, flagged: 2 },
  { t: "Apr", verified: 9, pending: 5, flagged: 2 },
  { t: "May", verified: 10, pending: 5, flagged: 2 },
  { t: "Jun", verified: 11, pending: 4, flagged: 2 },
]

// Vibrant color palette for charts
const COLORS = {
  primary: '#3b82f6',      // Blue
  secondary: '#10b981',     // Emerald
  accent: '#f59e0b',        // Amber
  danger: '#ef4444',        // Red
  warning: '#f97316',       // Orange
  success: '#22c55e',       // Green
  info: '#06b6d4',          // Cyan
  purple: '#8b5cf6',        // Purple
  pink: '#ec4899',          // Pink
  indigo: '#6366f1',        // Indigo
}

// Pie chart data for asset distribution
const pieData = [
  { name: 'Carbon Credits', value: 45, color: COLORS.primary },
  { name: 'Real Estate', value: 30, color: COLORS.secondary },
  { name: 'Education', value: 15, color: COLORS.accent },
  { name: 'Other', value: 10, color: COLORS.purple },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-pretty">Analytics</h1>

      {/* Top Row - Two Cards Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-bold" style={{ color: '#352857' }}>
              Asset Mix Over Time
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Track category distribution across months with beautiful gradients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                carbon: { label: "Carbon Credits", color: COLORS.primary },
                real: { label: "Real Estate", color: COLORS.secondary },
                edu: { label: "Education", color: COLORS.accent },
              }}
              className="h-[350px] w-full overflow-hidden"
            >
              <ResponsiveContainer width="100%" height="100%" className="max-w-full">
                <AreaChart data={distribution} stackOffset="expand" margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="realGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.secondary} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.secondary} stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="eduGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                  <XAxis 
                    dataKey="t" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <YAxis 
                    tickFormatter={(v) => `${Math.round(v * 100)}%`}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    cursor={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5 5' }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="rect"
                  />
                  <Area
                    type="monotone"
                    dataKey="carbon"
                    stackId="1"
                    fill="url(#carbonGradient)"
                    stroke={COLORS.primary}
                    strokeWidth={2}
                    dot={{ fill: COLORS.primary, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: COLORS.primary, strokeWidth: 2 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="real" 
                    stackId="1" 
                    fill="url(#realGradient)" 
                    stroke={COLORS.secondary}
                    strokeWidth={2}
                    dot={{ fill: COLORS.secondary, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: COLORS.secondary, strokeWidth: 2 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="edu" 
                    stackId="1" 
                    fill="url(#eduGradient)" 
                    stroke={COLORS.accent}
                    strokeWidth={2}
                    dot={{ fill: COLORS.accent, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: COLORS.accent, strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-bold" style={{ color: '#352857' }}>
              Asset Growth by Type
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Monthly growth trends with interactive hover effects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                carbon: { label: "Carbon Credits", color: COLORS.primary },
                certificates: { label: "Certificates", color: COLORS.info },
                real: { label: "Real Estate", color: COLORS.secondary },
              }}
              className="h-[350px] w-full overflow-hidden"
            >
              <ResponsiveContainer width="100%" height="100%" className="max-w-full">
                <AreaChart data={growth} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="carbonGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="certificatesGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.info} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.info} stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="realGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.secondary} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.secondary} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                  <XAxis 
                    dataKey="t" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    cursor={{ stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5 5' }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="rect"
                  />
                  <Area
                    type="monotone"
                    dataKey="carbon"
                    fill="url(#carbonGrowthGradient)"
                    stroke={COLORS.primary}
                    strokeWidth={3}
                    dot={{ fill: COLORS.primary, strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: COLORS.primary, strokeWidth: 2, fill: '#fff' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="certificates"
                    fill="url(#certificatesGrowthGradient)"
                    stroke={COLORS.info}
                    strokeWidth={3}
                    dot={{ fill: COLORS.info, strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: COLORS.info, strokeWidth: 2, fill: '#fff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="real" 
                    fill="url(#realGrowthGradient)" 
                    stroke={COLORS.secondary}
                    strokeWidth={3}
                    dot={{ fill: COLORS.secondary, strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: COLORS.secondary, strokeWidth: 2, fill: '#fff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Second Row - Two Cards Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-bold" style={{ color: '#352857' }}>
              Credibility Score Distribution
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Beautiful histogram with gradient bars and smooth animations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ assets: { label: "Assets", color: COLORS.purple } }} className="h-[350px] w-full overflow-hidden">
              <ResponsiveContainer width="100%" height="100%" className="max-w-full">
                <BarChart data={scoreDist} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.purple} stopOpacity={0.9}/>
                      <stop offset="95%" stopColor={COLORS.pink} stopOpacity={0.7}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                  <XAxis 
                    dataKey="bucket" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    cursor={{ fill: COLORS.purple, opacity: 0.1 }}
                  />
                  <Bar 
                    dataKey="assets" 
                    fill="url(#barGradient)" 
                    radius={[8, 8, 0, 0]}
                    stroke={COLORS.purple}
                    strokeWidth={1}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-bold" style={{ color: '#352857' }}>
              Verification Trends
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Interactive line chart with smooth curves and vibrant colors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                verified: { label: "Verified", color: COLORS.success },
                pending: { label: "Pending", color: COLORS.warning },
                flagged: { label: "Flagged", color: COLORS.danger },
              }}
              className="h-[350px] w-full overflow-hidden"
            >
              <ResponsiveContainer width="100%" height="100%" className="max-w-full">
                <LineChart data={verification} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                  <XAxis 
                    dataKey="t" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    cursor={{ stroke: '#f97316', strokeWidth: 2, strokeDasharray: '5 5' }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="line"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="verified" 
                    stroke={COLORS.success}
                    strokeWidth={4}
                    dot={{ fill: COLORS.success, strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: COLORS.success, strokeWidth: 2, fill: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pending" 
                    stroke={COLORS.warning}
                    strokeWidth={4}
                    dot={{ fill: COLORS.warning, strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: COLORS.warning, strokeWidth: 2, fill: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="flagged" 
                    stroke={COLORS.danger}
                    strokeWidth={4}
                    dot={{ fill: COLORS.danger, strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: COLORS.danger, strokeWidth: 2, fill: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Full Width Pie Chart */}
      <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-xl font-bold" style={{ color: '#352857' }}>
            Asset Distribution Overview
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Interactive pie chart showing portfolio composition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              'Carbon Credits': { label: 'Carbon Credits', color: COLORS.primary },
              'Real Estate': { label: 'Real Estate', color: COLORS.secondary },
              'Education': { label: 'Education', color: COLORS.accent },
              'Other': { label: 'Other', color: COLORS.purple },
            }}
            className="h-[350px] w-full overflow-hidden"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
