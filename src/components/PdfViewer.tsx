import React, { useEffect } from "react";
import { usePdfDocument } from "../hooks/usePdfDocument";
import { PdfCanvas } from "./PdfCanvas";

interface PdfViewerProps {
    file: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ file }) => {
    const pdf = usePdfDocument(file);

    // 스크롤 앵커 처리 (pdf 로딩 후)
    useEffect(() => {
        if (!pdf) return;
        const anchorId = window.location.hash.replace("#", "");
        if (anchorId) {
            const element = document.getElementById(anchorId);
            element?.scrollIntoView({ behavior: "smooth" });
        }
    }, [pdf]);

    if (!pdf)
        return <div style={{ color: "#fff", padding: "2rem" }}>Loading...</div>;

    const pages = Array.from({ length: pdf.numPages }, (_, i) => i + 1);

    return (
        <div
            style={{
                padding: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2rem",
            }}
        >
            {pages.map((pageNum) => (
                <PdfCanvas key={pageNum} pdf={pdf} pageNumber={pageNum} />
            ))}
        </div>
    );
};
