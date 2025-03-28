import { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?worker";

pdfjsLib.GlobalWorkerOptions.workerPort = new pdfjsWorker();

export const usePdfDocument = (file: string) => {
    const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);

    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument(file);
        loadingTask.promise.then((loadedPdf) => {
            setPdf(loadedPdf);
        });
    }, [file]);

    return pdf;
};
