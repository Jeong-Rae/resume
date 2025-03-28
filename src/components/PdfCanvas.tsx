import React, { useRef, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";

interface PdfCanvasProps {
    pdf: pdfjsLib.PDFDocumentProxy;
    pageNumber: number;
}

export const PdfCanvas: React.FC<PdfCanvasProps> = ({ pdf, pageNumber }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const renderPage = async () => {
            const page = await pdf.getPage(pageNumber);
            const availableWidth = window.innerWidth;
            const unscaledViewport = page.getViewport({ scale: 1 });
            const scale = availableWidth / unscaledViewport.width;
            const viewport = page.getViewport({ scale });

            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const context = canvas.getContext("2d");
            await page.render({ canvasContext: context!, viewport }).promise;
        };

        renderPage();
    }, [pdf, pageNumber]);

    return (
        <canvas
            ref={canvasRef}
            id={`page-${pageNumber}`}
            style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
            }}
        />
    );
};
