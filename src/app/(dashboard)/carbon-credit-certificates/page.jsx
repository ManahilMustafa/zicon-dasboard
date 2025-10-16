import AssetTable from "@/components/asset-table"

export default function CarbonCreditsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-pretty">Carbon Credit Certificates</h1>
      <p className="text-muted-foreground">Monitor project design docs and issuance credibility.</p>
      <AssetTable type="carbon" />
    </div>
  )
}
