"use client";

import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, Download, CheckCircle, AlertTriangle, Clock, Shield } from "lucide-react";
import { CredibilityScore } from "./credibility-score";
import { StarRating } from "./star-rating";
import jsPDF from "jspdf";

// Mock data for different asset types
const mockAssetData = {
  "carbon-credits": {
    "1": {
      id: "1",
      name: "Carbon Offset Project",
      type: "carbon-credits",
      hash: "0xA23B45C9F8E...",
      issuer: "GreenEarth Org",
      credibilityScore: 88,
      status: "Verified",
      updatedAt: "2025-10-01",
      description: "Forest regeneration project in the Amazon rainforest",
      projectType: "Forest Conservation",
      carbonCredits: 1000,
      location: "Brazil",
      verificationStandard: "VCS",
      vintage: "2024",
      riskLevel: "Low",
      anomalyScore: 0.23,
      features: [
        { name: "text_length", value: "2,450", normalRange: "2,000-3,500", interpretation: "Normal", deviation: "+0.2σ" },
        { name: "num_numbers", value: "18", normalRange: "15-25", interpretation: "Normal", deviation: "+0.1σ" },
        { name: "coordinate_presence", value: "Yes", normalRange: "Yes/No", interpretation: "Normal", deviation: "0.0σ" },
        { name: "round_number_fraction", value: "0.15", normalRange: "0.1-0.3", interpretation: "Normal", deviation: "+0.3σ" }
      ]
    },
    "4": {
      id: "4",
      name: "Forest Regeneration Credits",
      type: "carbon-credits",
      hash: "0xFA12BC34DE9...",
      issuer: "EcoFuture",
      credibilityScore: 68,
      status: "Flagged",
      updatedAt: "2025-09-22",
      description: "Reforestation project in Southeast Asia",
      projectType: "Reforestation",
      carbonCredits: 500,
      location: "Indonesia",
      verificationStandard: "Gold Standard",
      vintage: "2023",
      riskLevel: "High",
      anomalyScore: 0.91,
      features: [
        { name: "text_length", value: "12,450", normalRange: "2,000-3,500", interpretation: "Abnormally large", deviation: "+2.0σ" },
        { name: "num_numbers", value: "36", normalRange: "15-25", interpretation: "Slightly high", deviation: "+1.2σ" },
        { name: "coordinate_presence", value: "No", normalRange: "Yes/No", interpretation: "Missing", deviation: "-0.8σ" },
        { name: "round_number_fraction", value: "0.05", normalRange: "0.1-0.3", interpretation: "Suspiciously low", deviation: "-3.1σ" }
      ]
    }
  },
  "certificates": {
    "2": {
      id: "2",
      name: "Solar Farm Certificate",
      type: "certificates",
      hash: "0xC9B17F65E0A...",
      issuer: "SolarTech Ltd",
      credibilityScore: 75,
      status: "Pending",
      updatedAt: "2025-09-28",
      description: "Renewable energy certificate for solar farm",
      projectType: "Solar Energy",
      energyGenerated: "500 MWh",
      location: "California, USA",
      certificationBody: "I-REC",
      issueDate: "2025-09-28",
      riskLevel: "Medium",
      anomalyScore: 0.45,
      features: [
        { name: "text_length", value: "3,200", normalRange: "2,000-3,500", interpretation: "Normal", deviation: "+0.1σ" },
        { name: "num_numbers", value: "22", normalRange: "15-25", interpretation: "Normal", deviation: "+0.2σ" },
        { name: "coordinate_presence", value: "Yes", normalRange: "Yes/No", interpretation: "Normal", deviation: "0.0σ" },
        { name: "round_number_fraction", value: "0.25", normalRange: "0.1-0.3", interpretation: "Normal", deviation: "+0.5σ" }
      ]
    }
  },
  "real-estate": {
    "3": {
      id: "3",
      name: "Luxury Apartment Token",
      type: "real-estate",
      hash: "0xDEADBEEF012...",
      issuer: "Skyline Holdings",
      credibilityScore: 93,
      status: "Verified",
      updatedAt: "2025-10-05",
      description: "Tokenized luxury apartment in downtown",
      projectType: "Residential",
      propertyValue: "$2.5M",
      location: "New York, USA",
      propertyType: "Apartment",
      squareFootage: "2,500 sq ft",
      riskLevel: "Low",
      anomalyScore: 0.12,
      features: [
        { name: "text_length", value: "2,800", normalRange: "2,000-3,500", interpretation: "Normal", deviation: "+0.0σ" },
        { name: "num_numbers", value: "19", normalRange: "15-25", interpretation: "Normal", deviation: "+0.0σ" },
        { name: "coordinate_presence", value: "Yes", normalRange: "Yes/No", interpretation: "Normal", deviation: "0.0σ" },
        { name: "round_number_fraction", value: "0.18", normalRange: "0.1-0.3", interpretation: "Normal", deviation: "+0.1σ" }
      ]
    },
    "5": {
      id: "5",
      name: "Commercial Plaza Token",
      type: "real-estate",
      hash: "0xBC98E712A34...",
      issuer: "UrbanTrust",
      credibilityScore: 81,
      status: "Pending",
      updatedAt: "2025-09-30",
      description: "Tokenized commercial property",
      projectType: "Commercial",
      propertyValue: "$15M",
      location: "London, UK",
      propertyType: "Office Building",
      squareFootage: "50,000 sq ft",
      riskLevel: "Medium",
      anomalyScore: 0.34,
      features: [
        { name: "text_length", value: "3,100", normalRange: "2,000-3,500", interpretation: "Normal", deviation: "+0.2σ" },
        { name: "num_numbers", value: "24", normalRange: "15-25", interpretation: "Normal", deviation: "+0.3σ" },
        { name: "coordinate_presence", value: "Yes", normalRange: "Yes/No", interpretation: "Normal", deviation: "0.0σ" },
        { name: "round_number_fraction", value: "0.22", normalRange: "0.1-0.3", interpretation: "Normal", deviation: "+0.2σ" }
      ]
    }
  }
};

export function AssetDetailView({ assetType, assetId, onBack }) {
  const [asset, setAsset] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // Simulate fetching asset data
    const assetData = mockAssetData[assetType]?.[assetId];
    if (assetData) {
      setAsset(assetData);
    }
  }, [assetType, assetId]);

  const handleFileUpload = (file) => {
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
      setIsAnalyzing(true);
      setAnalysisComplete(false);
      
      // Simulate analysis process
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 3000);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case "Low": return "text-green-600 dark:text-green-400";
      case "Medium": return "text-yellow-600 dark:text-yellow-400";
      case "High": return "text-red-600 dark:text-red-400";
      default: return "text-gray-600 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Verified": return <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />;
      case "Pending": return <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />;
      case "Flagged": return <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />;
      default: return null;
    }
  };

  const downloadReport = async () => {
    if (!asset || isDownloading) return;

    setIsDownloading(true);
    
    try {
      const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Helper function to add text with word wrapping
    const addText = (text, x, y, maxWidth = pageWidth - 40, fontSize = 12) => {
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return y + (lines.length * fontSize * 0.4) + 5;
    };

    // Helper function to add a line
    const addLine = (y) => {
      doc.setLineWidth(0.5);
      doc.line(20, y, pageWidth - 20, y);
      return y + 10;
    };

    // Header
    doc.setFillColor(240, 248, 255);
    doc.rect(0, 0, pageWidth, 50, 'F');
    
    // SABZA Logo (placeholder - you can add actual logo if needed)
    doc.setFontSize(20);
    doc.setTextColor(0, 100, 0);
    doc.text('SABZA', pageWidth - 50, 20);
    doc.text('Risk Analysis Report', pageWidth - 50, 30);

    yPosition = 60;

    // Title
    yPosition = addText(`Asset Risk Analysis Report`, 20, yPosition, pageWidth - 40, 18);
    yPosition = addText(`Generated on: ${new Date().toLocaleDateString()}`, 20, yPosition, pageWidth - 40, 10);
    yPosition = addLine(yPosition);

    // Asset Overview
    yPosition = addText('Asset Overview', 20, yPosition, pageWidth - 40, 14);
    yPosition = addText(`Asset Name: ${asset.name}`, 20, yPosition);
    yPosition = addText(`Asset Type: ${asset.type.replace('-', ' ').toUpperCase()}`, 20, yPosition);
    yPosition = addText(`Issuer: ${asset.issuer}`, 20, yPosition);
    yPosition = addText(`Status: ${asset.status}`, 20, yPosition);
    yPosition = addText(`Credibility Score: ${asset.credibilityScore}%`, 20, yPosition);
    yPosition = addText(`Risk Level: ${asset.riskLevel}`, 20, yPosition);
    yPosition = addText(`Anomaly Score: ${asset.anomalyScore}`, 20, yPosition);
    yPosition = addText(`Blockchain Address: ${asset.hash}`, 20, yPosition);
    yPosition = addLine(yPosition);

    // Analysis Results
    yPosition = addText('Analysis Results', 20, yPosition, pageWidth - 40, 14);
    yPosition = addText(`Based on ${asset.features.length} extracted features`, 20, yPosition);
    yPosition = addText(`Risk Assessment: ${asset.riskLevel} Risk`, 20, yPosition);
    yPosition = addText(`Anomaly Detection Score: ${asset.anomalyScore}`, 20, yPosition);
    yPosition = addLine(yPosition);

    // Feature Analysis
    yPosition = addText('Feature Analysis', 20, yPosition, pageWidth - 40, 14);
    
    // Create table for features
    const tableData = asset.features.map(feature => [
      feature.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      feature.value,
      feature.normalRange,
      feature.interpretation,
      feature.deviation
    ]);

    // Table headers
    const headers = ['Feature', 'Value', 'Normal Range', 'Interpretation', 'Deviation'];
    const colWidths = [40, 30, 35, 40, 25];
    const startX = 20;
    let currentY = yPosition;

    // Draw table headers
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    let currentX = startX;
    headers.forEach((header, index) => {
      doc.text(header, currentX, currentY);
      currentX += colWidths[index];
    });
    currentY += 8;

    // Draw table rows
    doc.setFont(undefined, 'normal');
    tableData.forEach(row => {
      if (currentY > pageHeight - 30) {
        doc.addPage();
        currentY = 20;
      }
      
      currentX = startX;
      row.forEach((cell, index) => {
        doc.text(cell.toString(), currentX, currentY);
        currentX += colWidths[index];
      });
      currentY += 6;
    });

    yPosition = currentY + 10;

    // Footer
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = 20;
    }
    
    yPosition = addLine(yPosition);
    yPosition = addText('This report was generated by SABZA Risk Analyzer', 20, yPosition, pageWidth - 40, 10);
    yPosition = addText('Powered by ZiCON Cloud', 20, yPosition, pageWidth - 40, 10);

      // Download the PDF
      const fileName = `sabza-risk-analysis-${asset.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF report. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!asset) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Asset not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-transparent">
      {/* Header with SABZA branding */}
      <div className="bg-white dark:bg-transparent border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{asset.name}</h1>
          </div>
         
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - PDF Upload and Analysis */}
          <div className="space-y-6">
            {/* PDF Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Document Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? "border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20" 
                      : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div className="mx-auto w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Upload className="w-6 h-6 text-gray-400 dark:text-gray-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Drop a Project Design Document to analyze anomalies in real time
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Supports PDF files up to 10MB
                      </p>
                    </div>
                    <Button
                      onClick={() => document.getElementById('file-upload').click()}
                      className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500"
                    >
                      Upload PDF
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </div>
                </div>

                {uploadedFile && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm text-green-800 dark:text-green-300">
                        {uploadedFile.name} uploaded successfully
                      </span>
                    </div>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Real-time backend analysis</span>
                    </div>
                    <Progress value={66} className="h-2" />
                  </div>
                )}

                {analysisComplete && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm text-green-800 dark:text-green-300">Analysis complete</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {analysisComplete && (
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Risk Level Gauge */}
                  <div className="text-center">
                    <div className="relative inline-block">
                      <div className="w-32 h-16 bg-gray-200 dark:bg-gray-700 rounded-t-full relative overflow-hidden">
                        <div 
                          className="absolute bottom-0 left-0 h-full bg-red-500 dark:bg-red-400 transition-all duration-1000"
                          style={{ width: `${asset.anomalyScore * 100}%` }}
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-red-600 dark:text-red-400">
                          {asset.riskLevel}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Risk Level</p>
                  </div>

                  {/* Anomaly Score */}
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                      {asset.anomalyScore}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Anomaly Score</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Based on {asset.features.length} extracted features</p>
                    <Button 
                      className="mt-2" 
                      size="sm" 
                      onClick={downloadReport}
                      disabled={isDownloading}
                    >
                      {isDownloading ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Download report
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Feature Deviations */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Feature Deviations from Normal Baseline</h4>
                    <div className="space-y-3">
                      {asset.features.map((feature, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-gray-900 dark:text-gray-100">{feature.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                            <span className={`font-mono ${feature.deviation.startsWith('+') ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
                              {feature.deviation}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                feature.deviation.startsWith('+') ? 'bg-blue-500 dark:bg-blue-400' : 'bg-red-500 dark:bg-red-400'
                              }`}
                              style={{ 
                                width: `${Math.min(Math.abs(parseFloat(feature.deviation)) * 25, 100)}%`,
                                marginLeft: feature.deviation.startsWith('+') ? '50%' : `${50 - Math.min(Math.abs(parseFloat(feature.deviation)) * 25, 50)}%`
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <span>-4</span>
                      <span>0</span>
                      <span>+4</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Asset Details */}
          <div className="space-y-6">
            {/* Asset Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Asset Overview
                  <div className="flex items-center gap-2">
                    {getStatusIcon(asset.status)}
                    <Badge variant={asset.status === "Verified" ? "default" : asset.status === "Pending" ? "secondary" : "destructive"}>
                      {asset.status}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Credibility Score</p>
                    <div className="flex items-center gap-2 mt-1">
                      <CredibilityScore score={asset.credibilityScore} />
                      <StarRating score={asset.credibilityScore} size={16} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Risk Level</p>
                    <p className={`font-medium ${getRiskColor(asset.riskLevel)}`}>
                      {asset.riskLevel}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                  <p className="text-sm text-gray-900 dark:text-gray-100 mt-1">{asset.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Issuer</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{asset.issuer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{new Date(asset.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Blockchain Address</p>
                  <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded mt-1 break-all">
                    {asset.hash}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Asset-Specific Details */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {asset.type === "carbon-credits" && "Project Details"}
                  {asset.type === "certificates" && "Certificate Details"}
                  {asset.type === "real-estate" && "Property Details"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {asset.type === "carbon-credits" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Project Type</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{asset.projectType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Carbon Credits</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{asset.carbonCredits}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{asset.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Verification Standard</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{asset.verificationStandard}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Vintage</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{asset.vintage}</p>
                      </div>
                    </div>
                  </>
                )}

                {asset.type === "certificates" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Project Type</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{asset.projectType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Energy Generated</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{asset.energyGenerated}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{asset.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Certification Body</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{asset.certificationBody}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Issue Date</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{asset.issueDate}</p>
                      </div>
                    </div>
                  </>
                )}

                {asset.type === "real-estate" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Project Type</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{asset.projectType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Property Value</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{asset.propertyValue}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{asset.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Property Type</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{asset.propertyType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Square Footage</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{asset.squareFootage}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Feature Analysis Table */}
            {analysisComplete && (
              <Card>
                <CardHeader>
                  <CardTitle>Feature List</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Feature</th>
                          <th className="text-left py-2">Value</th>
                          <th className="text-left py-2">Normal Range</th>
                          <th className="text-left py-2">Interpretation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {asset.features.map((feature, index) => (
                          <tr key={index} className="border-b dark:border-gray-700">
                            <td className="py-2 font-medium text-gray-900 dark:text-gray-100">{feature.name}</td>
                            <td className="py-2 text-gray-900 dark:text-gray-100">{feature.value}</td>
                            <td className="py-2 text-gray-500 dark:text-gray-400">{feature.normalRange}</td>
                            <td className="py-2">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  feature.interpretation === "Normal" ? "bg-green-500 dark:bg-green-400" :
                                  feature.interpretation === "Slightly high" || feature.interpretation === "Slightly low" ? "bg-yellow-500 dark:bg-yellow-400" :
                                  "bg-red-500 dark:bg-red-400"
                                }`} />
                                <span className={feature.interpretation === "Normal" ? "text-green-600 dark:text-green-400" : 
                                  feature.interpretation === "Slightly high" || feature.interpretation === "Slightly low" ? "text-yellow-600 dark:text-yellow-400" : 
                                  "text-red-600 dark:text-red-400"}>
                                  {feature.interpretation}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
