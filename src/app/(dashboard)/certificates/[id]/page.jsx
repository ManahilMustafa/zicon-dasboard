"use client";

import { Certificate_Card } from "@/components/certificate_card";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Mock data for frontend-only testing
const mockCertificates = [
  {
    _id: "1",
    serialNumber: "12345",
    txHash: "0xabc123",
    projectName: "Carbon Project A",
    proID: "P001",
    issueDate: "2025-10-14",
    dateOfRetirement: "2025-10-14",
    beneficialOwner: "Alice",
    projectCountry: "Pakistan",
    quantityRetired: 10,
    reason: "Offset",
    status: "Active",
    registry: "SABZA Carbon Registry",
    credibilityScore: 85,
  },
  {
    _id: "2",
    serialNumber: "67890",
    txHash: "0xdef456",
    projectName: "Carbon Project B",
    proID: "P002",
    issueDate: "2025-10-10",
    dateOfRetirement: "2025-10-10",
    beneficialOwner: "Bob",
    projectCountry: "India",
    quantityRetired: 5,
    reason: "Offset",
    status: "Verified",
    registry: "SABZA Carbon Registry",
    credibilityScore: 45,
  },
  {
    _id: "3",
    serialNumber: "11111",
    txHash: "0xghi789",
    projectName: "Carbon Project C",
    proID: "P003",
    issueDate: "2025-10-08",
    dateOfRetirement: "2025-10-08",
    beneficialOwner: "Charlie",
    projectCountry: "Brazil",
    quantityRetired: 15,
    reason: "Offset",
    status: "Verified",
    registry: "SABZA Carbon Registry",
    credibilityScore: 95,
  },
  {
    _id: "4",
    serialNumber: "22222",
    txHash: "0xjkl012",
    projectName: "Carbon Project D",
    proID: "P004",
    issueDate: "2025-10-05",
    dateOfRetirement: "2025-10-05",
    beneficialOwner: "Diana",
    projectCountry: "Kenya",
    quantityRetired: 8,
    reason: "Offset",
    status: "Verified",
    registry: "SABZA Carbon Registry",
    credibilityScore: 25,
  },
  {
    _id: "5",
    serialNumber: "33333",
    txHash: "0xmno345",
    projectName: "Carbon Project E",
    proID: "P005",
    issueDate: "2025-10-02",
    dateOfRetirement: "2025-10-02",
    beneficialOwner: "Eve",
    projectCountry: "Indonesia",
    quantityRetired: 12,
    reason: "Offset",
    status: "Verified",
    registry: "SABZA Carbon Registry",
    credibilityScore: 70,
  },
];

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const certificateId = params.id;
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    // Find the certificate from mock data
    const foundCertificate = mockCertificates.find(cert => cert._id === certificateId);
    if (foundCertificate) {
      setCertificate(foundCertificate);
    }
  }, [certificateId]);

  if (!certificate) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-4 sm:mb-6">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </div>
        <div className="text-center text-gray-600 mt-8 sm:mt-10 text-sm sm:text-base">
          Certificate not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="mb-4 sm:mb-6">
        <Button 
          variant="outline" 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Certificates</span>
          <span className="sm:hidden">Back</span>
        </Button>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        <Certificate_Card certificate={certificate} />
      </div>
    </div>
  );
}
