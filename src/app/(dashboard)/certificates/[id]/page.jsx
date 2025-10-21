"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Download, Eye, FileCheck } from "lucide-react"
import { CredibilityScore } from "@/components/credibility-score"
import { useRouter } from "next/navigation"
import jsPDF from "jspdf"

// Mock data for frontend-only testing
const mockCertificates = [
  {
    _id: "1",
    serialNumber: "12345",
    txHash: "0xabc123def4567890123456789012345678901234567890abcdef1234567890",
    projectName: "Renewable Energy Solar Farm Development Project in Northern Pakistan",
    proID: "P001",
    issueDate: "2025-10-14",
    dateOfRetirement: "2025-10-14",
    beneficialOwner: "Alice Johnson-Smith Corporation",
    projectCountry: "Pakistan",
    quantityRetired: 10,
    reason: "Corporate Carbon Neutrality Initiative",
    status: "Active",
    registry: "SABZA Carbon Registry & International Carbon Standards Board",
    credibilityScore: 85,
  },
  {
    _id: "2",
    serialNumber: "67890",
    txHash: "0xdef4567890123456789012345678901234567890abcdef1234567890abcdef",
    projectName: "Wind Energy Farm Development and Community Sustainability Program",
    proID: "P002",
    issueDate: "2025-10-10",
    dateOfRetirement: "2025-10-10",
    beneficialOwner: "Bob Anderson Renewable Energy Solutions Ltd.",
    projectCountry: "India",
    quantityRetired: 5,
    reason: "Voluntary Carbon Offset Program",
    status: "Verified",
    registry: "SABZA Carbon Registry",
    credibilityScore: 45,
  },
  {
    _id: "3",
    serialNumber: "11111",
    txHash: "0xghi7890123456789012345678901234567890abcdef1234567890abcdef12",
    projectName: "Amazon Rainforest Conservation and Reforestation Initiative",
    proID: "P003",
    issueDate: "2025-10-08",
    dateOfRetirement: "2025-10-08",
    beneficialOwner: "Charlie Environmental Protection Foundation",
    projectCountry: "Brazil",
    quantityRetired: 15,
    reason: "Environmental Conservation and Biodiversity Protection",
    status: "Verified",
    registry: "SABZA Carbon Registry & Global Environmental Standards",
    credibilityScore: 95,
  },
  {
    _id: "4",
    serialNumber: "22222",
    txHash: "0xjkl0123456789012345678901234567890abcdef1234567890abcdef1234",
    projectName: "Hydropower Development and Water Management System",
    proID: "P004",
    issueDate: "2025-10-05",
    dateOfRetirement: "2025-10-05",
    beneficialOwner: "Diana Sustainable Development Corporation",
    projectCountry: "Kenya",
    quantityRetired: 8,
    reason: "Clean Energy Transition Program",
    status: "Verified",
    registry: "SABZA Carbon Registry",
    credibilityScore: 25,
  },
  {
    _id: "5",
    serialNumber: "33333",
    txHash: "0xmno3456789012345678901234567890abcdef1234567890abcdef123456",
    projectName: "Geothermal Energy Plant and Community Development Project",
    proID: "P005",
    issueDate: "2025-10-02",
    dateOfRetirement: "2025-10-02",
    beneficialOwner: "Eve Green Technology Solutions International",
    projectCountry: "Indonesia",
    quantityRetired: 12,
    reason: "Sustainable Development Goals Implementation",
    status: "Verified",
    registry: "SABZA Carbon Registry & United Nations Framework",
    credibilityScore: 70,
  },
  {
    _id: "6",
    serialNumber: "44444",
    txHash: "0xpqr6789012345678901234567890abcdef1234567890abcdef1234567890",
    projectName: "Ocean Wave Energy Conversion and Marine Ecosystem Protection",
    proID: "P006",
    issueDate: "2025-09-28",
    dateOfRetirement: "2025-09-28",
    beneficialOwner: "Frank Oceanic Renewable Energy Consortium",
    projectCountry: "Australia",
    quantityRetired: 20,
    reason: "Marine Conservation and Clean Energy Production",
    status: "Verified",
    registry: "SABZA Carbon Registry & International Marine Standards",
    credibilityScore: 88,
  },
  {
    _id: "7",
    serialNumber: "55555",
    txHash: "0xstu789012345678901234567890abcdef1234567890abcdef123456789012",
    projectName: "Biomass Energy from Agricultural Waste Management System",
    proID: "P007",
    issueDate: "2025-09-25",
    dateOfRetirement: "2025-09-25",
    beneficialOwner: "Grace Agricultural Sustainability Foundation",
    projectCountry: "Thailand",
    quantityRetired: 7,
    reason: "Agricultural Waste Reduction and Energy Production",
    status: "Verified",
    registry: "SABZA Carbon Registry",
    credibilityScore: 62,
  },
  {
    _id: "8",
    serialNumber: "66666",
    txHash: "0xvwx89012345678901234567890abcdef1234567890abcdef1234567890123",
    projectName: "Urban Green Infrastructure and Carbon Sequestration Program",
    proID: "P008",
    issueDate: "2025-09-20",
    dateOfRetirement: "2025-09-20",
    beneficialOwner: "Henry Urban Development and Environmental Solutions Inc.",
    projectCountry: "Canada",
    quantityRetired: 25,
    reason: "Urban Sustainability and Climate Change Mitigation",
    status: "Verified",
    registry: "SABZA Carbon Registry & North American Environmental Standards",
    credibilityScore: 92,
  },
]

export default function Page() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [certificates, setCertificates] = useState([])
  const [filteredCertificates, setFilteredCertificates] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const certPerPage = 20

  const indexOfLast = currentPage * certPerPage
  const indexOfFirst = indexOfLast - certPerPage
  const currentCertificates = filteredCertificates.slice(indexOfFirst, indexOfLast)

  useEffect(() => {
    // Load mock certificates for frontend-only testing
    setCertificates(mockCertificates)
    setFilteredCertificates(mockCertificates)
  }, [])

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredCertificates(certificates)
      setCurrentPage(1)
      return
    }
    const filtered = certificates.filter(cert =>
      cert.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.beneficialOwner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.serialNumber.includes(searchTerm)
    )
    setFilteredCertificates(filtered)
    setCurrentPage(1)
  }

  const onViewCertificate = (cert) => {
    router.push(`/certificates/${cert._id}`)
  }

 const handleDownloadPDF = async (certificateId) => {
  const certificate = certificates.find(cert => cert._id === certificateId)
  if (!certificate) {
    alert("Certificate not found")
    return
  }

  try {
    console.log("Starting PDF generation...")

    // Create PDF - A4 size portrait
    const pdf = new jsPDF("portrait", "mm", "a4")

    // Set up dimensions
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 15
    const contentWidth = pageWidth - (margin * 2)

    // Add background gradient (light green) matching Certificate Card
    pdf.setFillColor(249, 255, 251) // #F9FFFB
    pdf.rect(0, 0, pageWidth, pageHeight, 'F')

    // Add border (light green) matching Certificate Card
    pdf.setDrawColor(223, 242, 225) // #DFF2E1
    pdf.setLineWidth(1)
    pdf.rect(margin, margin, contentWidth, pageHeight - (margin * 2))

    // Logo - Top Right (matching Certificate Card)
    try {
      let logoResponse = await fetch('/logo.jpg')
      if (!logoResponse.ok) {
        logoResponse = await fetch('/logo.png')
      }

      if (logoResponse.ok) {
        const logoBlob = await logoResponse.blob()
        const logoDataUrl = await new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.readAsDataURL(logoBlob)
        })

        const logoWidth = 15
        const logoHeight = 13
        // ✅ Moved slightly to the left
        pdf.addImage(logoDataUrl, 'PNG', pageWidth - margin - logoWidth - 5, margin + 15, logoWidth, logoHeight)
      } else {
        throw new Error('Logo not found')
      }
    } catch (logoError) {
      console.warn("Could not load logo, using fallback:", logoError)
      // Fallback logo
      const logoWidth = 30
      const logoHeight = 30
      pdf.setFillColor(16, 138, 72)
      pdf.rect(pageWidth - margin - logoWidth - 5, margin + 8, logoWidth, logoHeight, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(8)
      pdf.setFont(undefined, 'bold')
      pdf.text('SABZA', pageWidth - margin - logoWidth + 2 - 5, margin + 20)
    }

    // Verification Badge - Centered (matching Certificate Card)
    try {
      const verifyResponse = await fetch('/sabza-verify.png')

      if (verifyResponse.ok) {
        const verifyBlob = await verifyResponse.blob()
        const verifyDataUrl = await new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.readAsDataURL(verifyBlob)
        })

        const verifySize = 15
        const verifyY = margin + 35
        pdf.addImage(verifyDataUrl, 'PNG', (pageWidth / 2) - (verifySize / 2), verifyY, verifySize, verifySize)
      } else {
        throw new Error('Verify image not found')
      }
    } catch (verifyError) {
      console.warn("Could not load verification badge, using fallback:", verifyError)
      // Fallback verification badge
      const verifyY = margin + 40
      const verifyRadius = 6

      pdf.setFillColor(16, 138, 72)
      pdf.circle(pageWidth / 2, verifyY, verifyRadius, 'F')

      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(12)
      pdf.setFont(undefined, 'bold')
      pdf.text('✓', pageWidth / 2 - 2, verifyY + 3)
    }

    // Title (matching Certificate Card)
    pdf.setTextColor(6, 62, 36) // #063E24
    pdf.setFontSize(18)
    pdf.setFont(undefined, 'bold')
    const title = 'Certificate of Retirement (Validated Carbon Units)'
    pdf.text(title, pageWidth / 2, margin + 70, { align: 'center', maxWidth: contentWidth - 10 })

    // Description - Line by line (matching Certificate Card)
    pdf.setTextColor(102, 102, 102) // Gray
    pdf.setFontSize(12)
    pdf.setFont(undefined, 'normal')

    let descY = margin + 83
    pdf.text('SABZA, in its capacity as administrator of the', pageWidth / 2, descY, { align: 'center' })

    descY += 6
    pdf.setFont(undefined, 'bold')
    pdf.text('SABZA Carbon Notary', pageWidth / 2, descY, { align: 'center' })

    descY += 6
    pdf.setFont(undefined, 'normal')
    pdf.text(', does hereby certify that', pageWidth / 2, descY, { align: 'center' })

    // Quantity - Bold and Green (matching Certificate Card)
    descY += 10
    pdf.setTextColor(16, 138, 72) // Green
    pdf.setFontSize(15)
    pdf.setFont(undefined, 'bold')
    const quantityText = `${certificate.quantityRetired} Verified SABZA Carbon Unit${certificate.quantityRetired > 1 ? 's' : ''} (VCU${certificate.quantityRetired > 1 ? 's' : ''})`
    pdf.text(quantityText, pageWidth / 2, descY, { align: 'center', maxWidth: contentWidth - 10 })

    // "were/was retired on behalf of" (matching Certificate Card)
    descY += 10
    pdf.setTextColor(102, 102, 102) // Gray
    pdf.setFontSize(12)
    pdf.setFont(undefined, 'normal')
    pdf.text(`${certificate.quantityRetired > 1 ? 'were' : 'was'} retired on behalf of:`, pageWidth / 2, descY, { align: 'center' })

    // Beneficial Owner - Green and Bold (matching Certificate Card)
    descY += 12
    pdf.setTextColor(16, 138, 72) // Green
    pdf.setFontSize(16)
    pdf.setFont(undefined, 'bold')
    pdf.text(certificate.beneficialOwner, pageWidth / 2, descY, { align: 'center' })

    // Date of Retirement (matching Certificate Card)
    descY += 10
    pdf.setTextColor(102, 102, 102) // Gray
    pdf.setFontSize(11)
    pdf.setFont(undefined, 'italic')
    pdf.text(`Date of Retirement: ${certificate.dateOfRetirement}`, pageWidth / 2, descY, { align: 'center' })

    // Details Box (matching Certificate Card)
    const boxY = descY + 10
    const boxHeight = 80  // Increased height to accommodate wrapped text
    const boxPadding = 5

    // White background
    pdf.setFillColor(255, 255, 255)
    pdf.rect(margin + boxPadding, boxY, contentWidth - (boxPadding * 2), boxHeight, 'F')

    // Light green border
    pdf.setDrawColor(233, 248, 238) // #E9F8EE
    pdf.setLineWidth(0.5)
    pdf.rect(margin + boxPadding, boxY, contentWidth - (boxPadding * 2), boxHeight)

    // Details content - Two columns
    const leftX = margin + boxPadding + 5
    const rightX = pageWidth / 2 + 5
    let leftY = boxY + 8
    let rightY = boxY + 8
    const lineSpacing = 10

    const addDetail = (x, y, label, value) => {
      pdf.setTextColor(16, 138, 72)
      pdf.setFontSize(10)
      pdf.setFont(undefined, 'bold')
      pdf.text(label, x, y)

      pdf.setTextColor(51, 51, 51)
      pdf.setFont(undefined, 'normal')
      
      // Calculate available width for the value text
      const availableWidth = x === leftX ? (rightX - leftX - 10) : (pageWidth - margin - rightX - 10)
      
      // Split text into lines that fit within the available width
      const lines = pdf.splitTextToSize(value, availableWidth)
      
      // Add each line
      lines.forEach((line, index) => {
        pdf.text(line, x, y + 4 + (index * 4))
      })

      // Return y position accounting for multiple lines
      return y + lineSpacing + ((lines.length - 1) * 4)
    }

    // Left column
    leftY = addDetail(leftX, leftY, 'Project Name:', certificate.projectName)
    leftY = addDetail(leftX, leftY, 'Project ID:', certificate.proID || "—")
    leftY = addDetail(leftX, leftY, 'Serial Number:', certificate.serialNumber)

    // Right column
    rightY = addDetail(rightX, rightY, 'Blockchain Hash:', certificate.txHash)
    rightY = addDetail(rightX, rightY, 'Additional Certifications:', certificate.registry || "—")
    rightY = addDetail(rightX, rightY, 'Reason:', certificate.reason || "—")

    // ✅ Credibility Score Section (now with bar instead of circles)
    if (certificate.credibilityScore !== undefined) {
      const scoreY = boxY + boxHeight + 8

      pdf.setTextColor(16, 138, 72)
      pdf.setFontSize(10)
      pdf.setFont(undefined, 'bold')
      pdf.text('Credibility Score:', leftX, scoreY)

      // Progress bar
      const barX = leftX + 35
      const barY = scoreY - 3
      const barWidth = 40
      const barHeight = 4

      // Outline (gray)
      pdf.setDrawColor(200, 200, 200)
      pdf.setFillColor(229, 231, 235)
      pdf.rect(barX, barY, barWidth, barHeight, 'F')

      // Filled part (green)
      const fillWidth = (certificate.credibilityScore / 100) * barWidth
      pdf.setFillColor(16, 138, 72)
      pdf.rect(barX, barY, fillWidth, barHeight, 'F')

      // Percentage text
      pdf.setTextColor(102, 102, 102)
      pdf.setFont(undefined, 'normal')
      pdf.text(`${certificate.credibilityScore}%`, barX + barWidth + 5, scoreY)
    }

    // Footer
    pdf.setTextColor(153, 153, 153)
    pdf.setFontSize(9)
    pdf.setFont(undefined, 'italic')
    pdf.text('Powered by ZiCON Cloud', pageWidth - margin - 5, pageHeight - margin - 5, { align: 'right' })

    // Save PDF
    pdf.save(`certificate_${certificate.serialNumber}.pdf`)

    console.log("PDF generated successfully!")

  } catch (err) {
    console.error("Error generating PDF:", err)
    alert(`Failed to generate PDF: ${err.message}`)
  }
}

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Certificates</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Manage carbon offset certificates</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
          <FileCheck className="w-4 h-4 mr-2" /> 
          <span className="hidden sm:inline">Generate Certificate</span>
          <span className="sm:hidden">Generate</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="text-lg sm:text-xl">All Certificates</CardTitle>
            <CardDescription className="text-sm">{filteredCertificates.length} certificates found</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
                onKeyDown={(e) => { if (e.key === "Enter") handleSearch() }}
              />
            </div>
            <Button variant="outline" onClick={handleSearch} className="w-full sm:w-auto">
              <Filter className="w-4 h-4 mr-2" /> 
              <span className="hidden sm:inline">Filter</span>
              <span className="sm:hidden">Search</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Certificate ID</TableHead>
                  <TableHead>Blockchain Hash</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Beneficial Owner</TableHead>
                  <TableHead>Project Country</TableHead>
                  <TableHead>CO₂ Retired</TableHead>
                  <TableHead>Credibility Score</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCertificates.map((cert) => (
                  <TableRow key={cert._id}>
                    <TableCell>{cert.serialNumber}</TableCell>
                    <TableCell className="max-w-[120px] truncate">{cert.txHash}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{cert.projectName}</TableCell>
                    <TableCell>{cert.issueDate}</TableCell>
                    <TableCell className="max-w-[120px] truncate">{cert.beneficialOwner}</TableCell>
                    <TableCell>{cert.projectCountry}</TableCell>
                    <TableCell>{cert.quantityRetired} tCO₂e</TableCell>
                    <TableCell>
                      <CredibilityScore score={cert.credibilityScore} />
                    </TableCell>
                    <TableCell>{cert.reason}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onViewCertificate(cert)}>
                            <Eye className="w-4 h-4 mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownloadPDF(cert._id)}>
                            <Download className="w-4 h-4 mr-2" /> Download PDF
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Tablet Table View */}
          <div className="hidden md:block lg:hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate ID</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentCertificates.map((cert) => (
                    <TableRow key={cert._id}>
                      <TableCell className="font-medium">{cert.serialNumber}</TableCell>
                      <TableCell className="max-w-[120px] truncate">{cert.projectName}</TableCell>
                      <TableCell className="max-w-[100px] truncate">{cert.beneficialOwner}</TableCell>
                      <TableCell>
                        <CredibilityScore score={cert.credibilityScore} />
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onViewCertificate(cert)}>
                              <Eye className="w-4 h-4 mr-2" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownloadPDF(cert._id)}>
                              <Download className="w-4 h-4 mr-2" /> Download PDF
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden space-y-4">
            {currentCertificates.map((cert) => (
              <Card key={cert._id} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900">{cert.projectName}</h3>
                      <p className="text-xs text-gray-500">ID: {cert.serialNumber}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewCertificate(cert)}>
                          <Eye className="w-4 h-4 mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownloadPDF(cert._id)}>
                          <Download className="w-4 h-4 mr-2" /> Download PDF
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-500">Owner:</span>
                      <p className="font-medium truncate">{cert.beneficialOwner}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Country:</span>
                      <p className="font-medium">{cert.projectCountry}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">CO₂ Retired:</span>
                      <p className="font-medium">{cert.quantityRetired} tCO₂e</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Score:</span>
                      <div className="mt-1">
                        <CredibilityScore score={cert.credibilityScore} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Issue Date: {cert.issueDate}</span>
                      <span className="text-gray-500">Reason: {cert.reason}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}