import React, { useEffect } from "react";
import { usePdfDocument } from "../hooks/usePdfDocument";
import { PdfCanvas } from "./PdfCanvas";
import styles from "./PdfViewer.module.scss";
import { cn } from "../utils/cn";

interface PdfViewerProps {
    file: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ file }) => {
    const pdf = usePdfDocument(file);

    useEffect(() => {
        if (!pdf) return;
        const anchorId = window.location.hash.replace("#", "");
        if (anchorId) {
            const element = document.getElementById(anchorId);
            element?.scrollIntoView({ behavior: "smooth" });
        }
    }, [pdf]);

    if (!pdf) {
        return (
            <div
                className={cn(
                    styles["pdf-viewer"],
                    styles["pdf-viewer--loading"]
                )}
            >
                Loading...
            </div>
        );
    }

    const pages = Array.from({ length: pdf.numPages }, (_, i) => i + 1);

    return (
        <div className={styles["pdf-viewer"]}>
            {pages.map((pageNum) => (
                <PdfCanvas key={pageNum} pdf={pdf} pageNumber={pageNum} />
            ))}
        </div>
    );
};
