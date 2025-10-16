"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CreateAssetDialog } from "@/components/create-asset-dialog";
import { AssetsByTypeChart } from "@/components/charts/assets-by-type";
import { StatusDistributionChart } from "@/components/charts/status-distribution";
import { AssetTable } from "@/components/asset-table";
import {
  Database,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

export default function DashboardPage() {
  // Use static dummy data instead of API calls
  const assets = [
    {
      id: "1",
      name: "Carbon Offset Project",
      type: "carbon-credits",
      hash: "0xA23B45C9F8E...",
      issuer: "GreenEarth Org",
      credibilityScore: 88,
      status: "Verified",
      updatedAt: "2025-10-01",
    },
    {
      id: "2",
      name: "Solar Farm Certificate",
      type: "certificates",
      hash: "0xC9B17F65E0A...",
      issuer: "SolarTech Ltd",
      credibilityScore: 75,
      status: "Pending",
      updatedAt: "2025-09-28",
    },
    {
      id: "3",
      name: "Luxury Apartment Token",
      type: "real-estate",
      hash: "0xDEADBEEF012...",
      issuer: "Skyline Holdings",
      credibilityScore: 93,
      status: "Verified",
      updatedAt: "2025-10-05",
    },
    {
      id: "4",
      name: "Forest Regeneration Credits",
      type: "carbon-credits",
      hash: "0xFA12BC34DE9...",
      issuer: "EcoFuture",
      credibilityScore: 68,
      status: "Flagged",
      updatedAt: "2025-09-22",
    },
    {
      id: "5",
      name: "Commercial Plaza Token",
      type: "real-estate",
      hash: "0xBC98E712A34...",
      issuer: "UrbanTrust",
      credibilityScore: 81,
      status: "Pending",
      updatedAt: "2025-09-30",
    },
  ];

  const totalAssets = assets.length;
  const avgCredibility = totalAssets
    ? Math.round(
        assets.reduce((s, a) => s + a.credibilityScore, 0) / totalAssets
      )
    : 0;
  const verified = assets.filter((a) => a.status === "Verified").length;
  const flagged = assets.filter((a) => a.status === "Flagged").length;

  // ✅ FIX 1 — Correct chart data keys for “Assets By Type”
const byTypeData = [
  { type: "Carbon Credits", count: 10 },
  { type: "Certificates", count: 6 },
  { type: "Real Estate", count: 8 },
];


  const statusData = [
    { name: "Verified", value: 12 },
    { name: "Pending", value: 5 },
    { name: "Flagged", value: 3 },
  ];

  const timeSeries = [
    { t: "Jan", credibility: 68, risk: 5 },
    { t: "Feb", credibility: 70, risk: 6 },
    { t: "Mar", credibility: 72, risk: 6 },
    { t: "Apr", credibility: 73, risk: 5 },
    { t: "May", credibility: 74, risk: 5 },
    { t: "Jun", credibility: 76, risk: 4 },
  ];

  // ✅ FIX 2 — Add visible dummy table data for now
  const dummyAssets = [
    {
      id: 1,
      name: "Green Energy NFT",
      type: "Carbon Credits",
      status: "Verified",
      credibilityScore: 89,
    },
    {
      id: 2,
      name: "Solar Power Project",
      type: "Certificates",
      status: "Pending",
      credibilityScore: 76,
    },
    {
      id: 3,
      name: "Urban Property Token",
      type: "Real Estate",
      status: "Verified",
      credibilityScore: 82,
    },
    {
      id: 4,
      name: "Eco Forest NFT",
      type: "Carbon Credits",
      status: "Flagged",
      credibilityScore: 61,
    },
    {
      id: 5,
      name: "Renewable Bond",
      type: "Certificates",
      status: "Verified",
      credibilityScore: 90,
    },
    {
      id: 6,
      name: "Wind Farm NFT",
      type: "Carbon Credits",
      status: "Pending",
      credibilityScore: 73,
    },
    {
      id: 7,
      name: "Green Estate Token",
      type: "Real Estate",
      status: "Verified",
      credibilityScore: 80,
    },
    {
      id: 8,
      name: "Clean Energy NFT",
      type: "Carbon Credits",
      status: "Flagged",
      credibilityScore: 67,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-pretty">
            Asset Credibility Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Monitor and verify blockchain assets on Solana
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <CreateAssetDialog />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="pb-2 flex items-center gap-2">
            <Database className="h-4 w-4 sm:h-5 sm:w-5 text-[#5c4b99]" />
            <CardTitle className="text-sm sm:text-base">Total Assets</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl sm:text-3xl font-normal">{totalAssets}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-[#5c4b99]" />
            <CardTitle className="text-sm sm:text-base">Avg. Credibility</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl sm:text-3xl font-normal">{avgCredibility}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-[#5c4b99]" />
            <CardTitle className="text-sm sm:text-base">Verified Assets</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl sm:text-3xl font-normal">{verified}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-[#5c4b99]" />
            <CardTitle className="text-sm sm:text-base">Flagged Assets</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl sm:text-3xl font-normal">{flagged}</CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <AssetsByTypeChart data={byTypeData} />
        <StatusDistributionChart data={statusData} />
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-pretty text-sm sm:text-base">
              Portfolio Credibility
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Average credibility across all tracked assets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] sm:h-[240px] lg:h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeries} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="t" 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="credibility"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-pretty text-sm sm:text-base">Risk Trend</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Risk flags per month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] sm:h-[240px] lg:h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeries} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="t" 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="risk"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-base sm:text-lg font-semibold">Recent Assets</h2>
        <AssetTable title="Recent Assets" limit={8} />
      </section>
    </div>
  );
}
