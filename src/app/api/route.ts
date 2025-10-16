import { NextResponse } from "next/server"

type AssetType = "carbon-credits" | "certificates" | "real-estate"
type AssetStatus = "Verified" | "Flagged" | "Pending"

type Asset = {
  id: string
  type: AssetType
  name: string
  issuer: string
  hash: string
  credibilityScore: number
  status: AssetStatus
  updatedAt: string
}

declare global {
  // eslint-disable-next-line no-var
  var ASSETS: Asset[] | undefined
}

function initStore() {
  if (!globalThis.ASSETS) {
    globalThis.ASSETS = [
      {
        id: "cc-001",
        type: "carbon-credits",
        name: "REDD+ Project - Amazon Basin",
        issuer: "Verra",
        hash: "6r1kwU...a9c",
        credibilityScore: 82,
        status: "Verified",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "cc-002",
        type: "carbon-credits",
        name: "Wind Farm - Gujarat",
        issuer: "Gold Standard",
        hash: "9QT7zP...x4L",
        credibilityScore: 74,
        status: "Pending",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "ce-500",
        type: "certificates",
        name: "Diploma - Blockchain Systems",
        issuer: "Open University",
        hash: "4yK8Lm...pd0",
        credibilityScore: 88,
        status: "Verified",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "ce-501",
        type: "certificates",
        name: "Professional Course - Smart Contracts",
        issuer: "ChainLearn",
        hash: "B8f22s...mN1",
        credibilityScore: 61,
        status: "Flagged",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "re-100",
        type: "real-estate",
        name: "Tokenized Condo - NYC",
        issuer: "Registry NYC",
        hash: "E55aaA...999",
        credibilityScore: 66,
        status: "Pending",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "re-101",
        type: "real-estate",
        name: "Office SPV - Berlin",
        issuer: "Berlin Land Registry",
        hash: "333aAa...777",
        credibilityScore: 58,
        status: "Verified",
        updatedAt: new Date().toISOString(),
      },
    ]
  }
  return globalThis.ASSETS!
}

export async function GET(req: Request) {
  const assets = initStore()
  const { searchParams } = new URL(req.url)
  const type = searchParams.get("type") as AssetType | null
  const id = searchParams.get("id")

  if (id) {
    const asset = assets.find((a) => a.id === id)
    if (!asset) return NextResponse.json({ error: "Not found" }, { status: 404 })
    const history = Array.from({ length: 12 }).map((_, i) => ({
      t: `M${i + 1}`,
      score: Math.max(35, Math.min(95, Math.round(asset.credibilityScore + (Math.random() - 0.5) * 12))),
      verified: Math.round(Math.random() * 8),
      flagged: Math.round(Math.random() * 3),
    }))
    return NextResponse.json({ asset, history })
  }

  const filtered = type ? assets.filter((a) => a.type === type) : assets
  return NextResponse.json({ assets: filtered })
}

export async function POST(req: Request) {
  const assets = initStore()
  const body = await req.json().catch(() => null)
  if (!body || !body.name || !body.type || !body.address || !body.issuer) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }
  const newAsset: Asset = {
    id: `${body.type.slice(0, 2)}-${Math.random().toString(36).slice(2, 6)}`,
    type:
      body.type === "Carbon Credit" ? "carbon-credits" : body.type === "Certificate" ? "certificates" : "real-estate",
    name: String(body.name),
    issuer: String(body.issuer),
    hash: String(body.address),
    credibilityScore: Math.round(40 + Math.random() * 50),
    status: "Pending",
    updatedAt: new Date().toISOString(),
  }
  assets.unshift(newAsset)
  return NextResponse.json({ asset: newAsset })
}
