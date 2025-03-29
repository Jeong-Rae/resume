import React, { useEffect } from "react";
import { usePdfDocument } from "../hooks/usePdfDocument";
import { PdfCanvas } from "./PdfCanvas";
import styles from "./PdfViewer.module.scss";
import { cn } from "../utils/cn";
import { PDFDocumentProxy } from "pdfjs-dist";

interface PdfViewerProps {
    file: string;
}

const scrollToAnchorIfExists = (pdf: PDFDocumentProxy | undefined) => {
    if (!pdf) return;

    const anchorId = window.location.hash.replace("#", "");
    const element = anchorId ? document.getElementById(anchorId) : null;

    if (element instanceof HTMLElement) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};

const renderPages = (pdf: PDFDocumentProxy) =>
    Array.from({ length: pdf.numPages }, (_, i) => i + 1).map((pageNum) => (
        <PdfCanvas key={pageNum} pdf={pdf} pageNumber={pageNum} />
    ));

export const PdfViewer: React.FC<PdfViewerProps> = ({ file }) => {
    const pdf = usePdfDocument(file);

    useEffect(() => {
        if (pdf) scrollToAnchorIfExists(pdf);
    }, [pdf]);

    return pdf ? (
        <div className={styles["pdf-viewer"]}>{renderPages(pdf)}</div>
    ) : (
        <div
            className={cn(styles["pdf-viewer"], styles["pdf-viewer--loading"])}
        >
            Loading...
        </div>
    );
};
