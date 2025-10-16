"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export default function SettingsPage() {
  const [network, setNetwork] = useState("mainnet-beta")
  const [rpcUrl, setRpcUrl] = useState("")
  const [alerts, setAlerts] = useState({
    newAsset: true,
    scoreChanges: true,
    verificationUpdates: true,
  })
  const [thresholds, setThresholds] = useState({ minScore: 60, autoFlag: 45 })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-pretty">Settings</h1>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Solana Network</CardTitle>
          <CardDescription>Configure your blockchain connection settings</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="grid gap-2">
            <label className="text-sm">RPC URL</label>
            <Input value={rpcUrl} onChange={(e) => setRpcUrl(e.target.value)} placeholder="https://..." />
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Network</label>
            <Select value={network} onValueChange={setNetwork}>
              <SelectTrigger>
                <SelectValue placeholder="Select Network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mainnet-beta">Mainnet Beta</SelectItem>
                <SelectItem value="testnet">Testnet</SelectItem>
                <SelectItem value="devnet">Devnet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-fit">Save Network Settings</Button>
        </CardContent>
      </Card>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure how you receive updates</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">New Asset Alerts</div>
              <div className="text-sm text-muted-foreground">Get notified when new assets are added</div>
            </div>
            <Switch checked={alerts.newAsset} onCheckedChange={(v) => setAlerts({ ...alerts, newAsset: v })} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Credibility Score Changes</div>
              <div className="text-sm text-muted-foreground">Receive updates on score fluctuations</div>
            </div>
            <Switch checked={alerts.scoreChanges} onCheckedChange={(v) => setAlerts({ ...alerts, scoreChanges: v })} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Verification Updates</div>
              <div className="text-sm text-muted-foreground">Get notified about verification status</div>
            </div>
            <Switch
              checked={alerts.verificationUpdates}
              onCheckedChange={(v) => setAlerts({ ...alerts, verificationUpdates: v })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Credibility Thresholds</CardTitle>
          <CardDescription>Set minimum scores for asset verification</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="grid gap-2">
            <label className="text-sm">Minimum Credibility Score</label>
            <Input
              type="number"
              min={0}
              max={100}
              value={thresholds.minScore}
              onChange={(e) => setThresholds({ ...thresholds, minScore: Number(e.target.value) })}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Auto-flag Threshold</label>
            <Input
              type="number"
              min={0}
              max={100}
              value={thresholds.autoFlag}
              onChange={(e) => setThresholds({ ...thresholds, autoFlag: Number(e.target.value) })}
            />
          </div>
          <Button className="w-fit">Save Thresholds</Button>
        </CardContent>
      </Card>
    </div>
  )
}
