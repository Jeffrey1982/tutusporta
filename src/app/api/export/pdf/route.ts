import React from "react";
import { NextRequest, NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { PDFReport } from "@/lib/pdf-generator";

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const { scanId } = await req.json();

    if (!scanId) {
      return NextResponse.json(
        { error: "Scan ID is required" },
        { status: 400 }
      );
    }

    // Fetch scan data with all necessary relations
    const scan = await prisma.scan.findFirst({
      where: {
        id: scanId,
        site: {
          OR: [
            { userId: user.id },
            {
              teams: {
                some: {
                  members: {
                    some: {
                      userId: user.id
                    }
                  }
                }
              }
            }
          ]
        }
      },
      include: {
        site: true
      }
    });

    if (!scan) {
      return NextResponse.json(
        { error: "Scan not found or access denied" },
        { status: 404 }
      );
    }

    // Parse violations data
    let violations = [];
    try {
      if (scan.raw && typeof scan.raw === 'object' && 'violations' in scan.raw) {
        violations = (scan.raw as any).violations || [];
      }
    } catch (error) {
      console.error("Failed to parse violations:", error);
      violations = [];
    }

    // Prepare scan data for PDF
    const scanData = {
      id: scan.id,
      url: scan.site.url,
      score: scan.score || 0,
      violations: violations,
      createdAt: scan.createdAt
    };

    // Generate PDF using React PDF
    const pdfDoc = React.createElement(PDFReport, {
      scanData,
      brandName: "TutuSporta",
      primaryColor: "#3B82F6"
    });

    // Convert to buffer
    const pdfBuffer = await pdf(pdfDoc as any).toBuffer();

    // Return PDF as downloadable file
    return new NextResponse(pdfBuffer as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="tutusporta-accessibility-report-${scanId}.pdf"`,
      },
    });

  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}