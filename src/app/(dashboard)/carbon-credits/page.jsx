"use client"

import { CreateAssetDialog } from "@/components/create-asset-dialog"
import { AssetTable } from "@/components/asset-table"

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-balance">Carbon Credits</h1>
          <p className="text-muted-foreground">Monitor carbon offset projects and credits</p>
        </div>
        <CreateAssetDialog />
      </div>
      <AssetTable title="All Carbon Credits" filterType="carbon-credits" />
    </div>
  )
}
