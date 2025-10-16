"use client"

import Link from "next/link"
import { useMemo, useState, useCallback } from "react"
import { CredibilityScore } from "./credibility-score"
import { ScoreBadge } from "./score-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const dummyAssets = [
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
]

function AssetTableInner({ title, filterType, limit }) {
  const [q, setQ] = useState("")
  const [debouncedQ, setDebouncedQ] = useState("")
  const [type, setType] = useState(filterType ?? "all")
  const [status, setStatus] = useState("all")

  // Debounce search input to prevent excessive filtering
  useMemo(() => {
    const timer = setTimeout(() => {
      setDebouncedQ(q)
    }, 300)
    return () => clearTimeout(timer)
  }, [q])

  // Always use dummy data - no API calls, no revalidation
  const assets = dummyAssets

  // Memoize filter change handlers to prevent unnecessary re-renders
  const handleTypeChange = useCallback((value) => {
    setType(value)
  }, [])

  const handleStatusChange = useCallback((value) => {
    setStatus(value)
  }, [])

  const handleSearchChange = useCallback((e) => {
    setQ(e.target.value)
  }, [])

  // Memoize the base sorted assets to avoid re-sorting on every filter change
  const sortedAssets = useMemo(() => {
    return assets.slice().sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
  }, [assets])

  // Memoize filtered results with stable dependencies
  const filtered = useMemo(() => {
    let rows = sortedAssets
    
    // Apply type filter
    if (type !== "all") {
      rows = rows.filter((a) => a.type === type)
    }
    
    // Apply status filter
    if (status !== "all") {
      rows = rows.filter((a) => a.status === status)
    }
    
    // Apply search filter using debounced value
    if (debouncedQ.trim()) {
      const needle = debouncedQ.toLowerCase()
      rows = rows.filter(
        (a) =>
          a.name.toLowerCase().includes(needle) ||
          a.issuer.toLowerCase().includes(needle) ||
          a.hash.toLowerCase().includes(needle),
      )
    }
    
    // Apply limit
    if (limit) {
      rows = rows.slice(0, limit)
    }
    
    return rows
  }, [sortedAssets, type, status, debouncedQ, limit])

  return (
    <Card>
      {title ? (
        <CardHeader className="pb-2">
          <CardTitle className="text-pretty text-sm sm:text-base">{title}</CardTitle>
        </CardHeader>
      ) : null}
      <CardContent className="space-y-3 sm:space-y-4">
        <div className="flex flex-col gap-2 sm:gap-3 md:flex-row md:items-center md:justify-between">
          <Input
            value={q}
            onChange={handleSearchChange}
            placeholder="Search by name, issuer, or address"
            aria-label="Search"
            className="w-full md:max-w-sm"
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={type} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Asset Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="carbon-credits">Carbon Credits</SelectItem>
                <SelectItem value="certificates">Certificates</SelectItem>
                <SelectItem value="real-estate">Real Estate</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Verified">Verified</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto rounded-md border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 font-normal">
              <tr className="text-left">
                <th className="px-3 py-2 font-normal">Name</th>
                <th className="px-3 py-2 font-normal">Type</th>
                <th className="px-3 py-2 font-normal">Blockchain Address</th>
                <th className="px-3 py-2 font-normal">Issuer</th>
                <th className="px-3 py-2 font-normal">Score</th>
                <th className="px-3 py-2 font-normal">Status</th>
                <th className="px-3 py-2 font-normal">Last Updated</th>
                <th className="px-3 py-2 font-normal" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">{a.name}</td>
                  <td className="px-3 py-2 capitalize">{a.type.replace("-", " ")}</td>
                  <td className="px-3 py-2 font-mono text-xs">{a.hash}</td>
                  <td className="px-3 py-2">{a.issuer}</td>
                  <td className="px-3 py-2">
                    <CredibilityScore score={a.credibilityScore} />
                  </td>
                  <td className="px-3 py-2">{a.status}</td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {new Date(a.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2">
                    <Link href={`/${a.type === "certificates" ? "carbon-credit-certificates" : a.type}/${a.id}`}>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className="px-3 py-6 text-center text-muted-foreground" colSpan={8}>
                    No assets found. Adjust filters or search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Tablet Table View */}
        <div className="hidden md:block lg:hidden overflow-x-auto rounded-md border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 font-normal">
              <tr className="text-left">
                <th className="px-3 py-2 font-normal">Name</th>
                <th className="px-3 py-2 font-normal">Type</th>
                <th className="px-3 py-2 font-normal">Issuer</th>
                <th className="px-3 py-2 font-normal">Score</th>
                <th className="px-3 py-2 font-normal">Status</th>
                <th className="px-3 py-2 font-normal" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-t border-border">
                  <td className="px-3 py-2 font-medium max-w-[150px] truncate">{a.name}</td>
                  <td className="px-3 py-2 capitalize">{a.type.replace("-", " ")}</td>
                  <td className="px-3 py-2 max-w-[120px] truncate">{a.issuer}</td>
                  <td className="px-3 py-2">
                    <CredibilityScore score={a.credibilityScore} />
                  </td>
                  <td className="px-3 py-2">{a.status}</td>
                  <td className="px-3 py-2">
                    <Link href={`/${a.type === "certificates" ? "carbon-credit-certificates" : a.type}/${a.id}`}>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className="px-3 py-6 text-center text-muted-foreground" colSpan={6}>
                    No assets found. Adjust filters or search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden space-y-3">
          {filtered.map((a) => (
            <Card key={a.id} className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900 truncate">{a.name}</h3>
                    <p className="text-xs text-gray-500 capitalize mt-1">{a.type.replace("-", " ")}</p>
                  </div>
                  <div className="ml-2">
                    <Link href={`/${a.type}/${a.id}`}>
                      <Button size="sm" variant="outline" className="text-xs">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500">Issuer:</span>
                    <p className="font-medium truncate">{a.issuer}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <p className="font-medium">{a.status}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Score:</span>
                    <div className="mt-1">
                      <CredibilityScore score={a.credibilityScore} />
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Updated:</span>
                    <p className="font-medium">{new Date(a.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="text-xs text-gray-500 font-mono break-all">
                    {a.hash}
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="text-center text-muted-foreground py-6">
              No assets found. Adjust filters or search.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function AssetTable(props) {
  return <AssetTableInner {...props} />
}

export { AssetTableInner as AssetTable }
