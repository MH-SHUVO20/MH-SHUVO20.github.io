/* ============================================================
   resume.js — Resume PDF viewer enhancement + fallback
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const pdfPath = window.PORTFOLIO_DATA?.personal?.resumePDF;
  const embed = document.querySelector('.resume-pdf-embed');
  if (!pdfPath || !embed) return;

  const openTargets = [
    document.getElementById('resumeNoticeLink'),
    document.querySelector('.resume-actions-bar .btn-view'),
  ];
  const downloadTargets = [
    document.querySelector('.resume-actions-bar .btn-dl'),
  ];

  openTargets.forEach(link => {
    if (!link) return;
    link.href = pdfPath;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  downloadTargets.forEach(link => {
    if (!link) return;
    link.href = pdfPath;
    link.setAttribute('download', '');
  });

  embed.innerHTML = `
    <div class="resume-preview-shell" id="resumePreviewShell">
      <div class="resume-fallback-icon"><i class="fas fa-file-pdf"></i></div>
      <h3>Resume preview is click-to-load</h3>
      <p>Some browsers automatically download PDFs when they are embedded on page load. Load the preview only if you want to view it here.</p>
      <div class="resume-fallback-actions">
        <button type="button" class="btn-view" id="loadResumePreviewBtn">
          <i class="fas fa-eye"></i> Load Preview
        </button>
        <a href="${pdfPath}" target="_blank" rel="noopener noreferrer" class="btn-view">
          <i class="fas fa-external-link-alt"></i> Open PDF
        </a>
        <a href="${pdfPath}" download class="btn-dl">
          <i class="fas fa-download"></i> Download PDF
        </a>
      </div>
    </div>
  `;

  const loadPreviewBtn = document.getElementById('loadResumePreviewBtn');
  if (!loadPreviewBtn) return;

  loadPreviewBtn.addEventListener('click', () => {
    embed.innerHTML = `
      <object
        id="resumePdfObject"
        data="${pdfPath}#view=FitH"
        type="application/pdf"
        class="resume-pdf-object">
        <iframe
          id="resumePdfFrame"
          src="${pdfPath}#view=FitH"
          title="Md. Mehedi Hasan Shuvo Resume"
          loading="lazy">
        </iframe>
        <div class="resume-pdf-fallback" id="resumePdfFallback">
          <div class="resume-fallback-icon"><i class="fas fa-file-pdf"></i></div>
          <h3>Inline PDF preview is unavailable</h3>
          <p>Your browser may block embedded PDFs. You can still open or download the resume directly.</p>
          <div class="resume-fallback-actions">
            <a href="${pdfPath}" target="_blank" rel="noopener noreferrer" class="btn-view">
              <i class="fas fa-external-link-alt"></i> Open PDF
            </a>
            <a href="${pdfPath}" download class="btn-dl">
              <i class="fas fa-download"></i> Download PDF
            </a>
          </div>
        </div>
      </object>
    `;
  }, { once: true });
});
