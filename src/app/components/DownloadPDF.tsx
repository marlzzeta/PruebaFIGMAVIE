import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

export function DownloadPDF() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const pageEl = document.getElementById("app-root");
      if (!pageEl) return;

      // Capture full scrollable page
      const canvas = await html2canvas(pageEl, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        logging: false,
        scrollY: 0,
        windowWidth: pageEl.scrollWidth,
        windowHeight: pageEl.scrollHeight,
        width: pageEl.scrollWidth,
        height: pageEl.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
        compress: true,
      });

      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const imgW = canvas.width;
      const imgH = canvas.height;

      // Scale image to fit PDF width, split into pages
      const ratio = pdfW / imgW;
      const scaledH = imgH * ratio;
      const totalPages = Math.ceil(scaledH / pdfH);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();
        pdf.addImage(
          imgData,
          "JPEG",
          0,
          -(page * pdfH),
          pdfW,
          scaledH,
          undefined,
          "FAST"
        );
      }

      pdf.save("BCIE-Terraverde-Hub.pdf");
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
      style={{ backgroundColor: "#10B981", color: "#fff" }}
      title="Descargar diseño en PDF"
    >
      {loading ? (
        <>
          <Loader2 size={15} className="animate-spin" />
          Generando PDF…
        </>
      ) : (
        <>
          <Download size={15} />
          Descargar PDF
        </>
      )}
    </button>
  );
}
