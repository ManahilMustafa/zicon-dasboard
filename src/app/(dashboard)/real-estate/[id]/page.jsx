"use client";

import { AssetDetailView } from "@/components/asset-detail-view";
import { useParams, useRouter } from "next/navigation";

export default function RealEstateDetailPage() {
  const params = useParams();
  const router = useRouter();

  return (
    <AssetDetailView 
      assetType="real-estate" 
      assetId={params.id} 
      onBack={() => router.back()} 
    />
  );
}
