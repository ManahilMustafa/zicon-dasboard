"use client";

import { AssetDetailView } from "@/components/asset-detail-view";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const params = useParams();
  const router = useRouter();

  return (
    <AssetDetailView 
      assetType="carbon-credits" 
      assetId={params.id} 
      onBack={() => router.back()} 
    />
  );
}
