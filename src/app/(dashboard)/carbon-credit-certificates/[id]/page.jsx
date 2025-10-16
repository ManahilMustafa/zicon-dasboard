"use client";

import { AssetDetailView } from "@/components/asset-detail-view";
import { useParams, useRouter } from "next/navigation";

export default function CarbonDetailPage() {
  const params = useParams();
  const router = useRouter();

  return (
    <AssetDetailView 
      assetType="certificates" 
      assetId={params.id} 
      onBack={() => router.back()} 
    />
  );
}
