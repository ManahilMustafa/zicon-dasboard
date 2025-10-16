"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

export function CreateAssetDialog({ onCreated }) {
  const [open, setOpen] = useState(false)
  const [assetType, setAssetType] = useState("Carbon Credit")
  const [isCreating, setIsCreating] = useState(false)
  const formRef = useRef(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsCreating(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reset form using ref
    if (formRef.current) {
      formRef.current.reset()
    }
    setAssetType("Carbon Credit")
    setOpen(false)
    setIsCreating(false)
    
    // Call the callback to refresh data
    onCreated?.()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:opacity-90">
          Create Asset
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Asset</DialogTitle>
          <DialogDescription>
            Add a new blockchain asset for credibility monitoring.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Asset Name</Label>
            <Input id="name" name="name" required />
          </div>

          <div className="grid gap-2">
            <Label>Asset Type</Label>
            <Select value={assetType} onValueChange={setAssetType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200">
                <SelectItem value="Carbon Credit">Carbon Credit</SelectItem>
                <SelectItem value="Certificate">Certificate</SelectItem>
                <SelectItem value="Real Estate">Real Estate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">Solana Address</Label>
            <Input id="address" name="address" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="issuer">Issuer</Label>
            <Input id="issuer" name="issuer" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={3} />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Asset"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
