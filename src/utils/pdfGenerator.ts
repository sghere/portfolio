import { resumeData } from "./resumeData";

export function downloadResumePDF() {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${resumeData.personal.fullName} - Resume</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #111827;
          line-height: 1.5;
          margin: 0;
          padding: 40px;
          background: #ffffff;
        }
        .header {
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 20px;
          margin-bottom: 24px;
        }
        .name {
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          letter-spacing: -0.02em;
        }
        .title {
          font-size: 16px;
          font-weight: 600;
          color: #4f46e5;
          margin-top: 4px;
        }
        .contact {
          font-size: 13px;
          color: #4b5563;
          margin-top: 8px;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .contact a {
          color: #4f46e5;
          text-decoration: none;
        }
        .section-title {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 4px;
          margin-top: 24px;
          margin-bottom: 12px;
        }
        .summary {
          font-size: 13.5px;
          color: #374151;
          line-height: 1.6;
        }
        .job {
          margin-bottom: 18px;
        }
        .job-header {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          font-weight: 600;
          color: #111827;
        }
        .job-sub {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 6px;
        }
        .bullets {
          margin: 0;
          padding-left: 18px;
          font-size: 13px;
          color: #374151;
        }
        .bullets li {
          margin-bottom: 4px;
        }
        .tech-tag {
          display: inline-block;
          background: #f3f4f6;
          color: #374151;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 4px;
          margin-right: 4px;
          margin-top: 4px;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          font-size: 13px;
        }
        .skills-group strong {
          color: #111827;
        }
        @media print {
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="name">${resumeData.personal.fullName}</div>
        <div class="title">${resumeData.personal.title} — ${resumeData.personal.headline}</div>
        <div class="contact">
          <span>📍 ${resumeData.personal.location.city}, ${resumeData.personal.location.country}</span>
          <span>📧 ${resumeData.personal.contact.email}</span>
          <span>📞 ${resumeData.personal.contact.phone}</span>
          <span>🔗 <a href="${resumeData.personal.contact.linkedin}">${resumeData.personal.contact.linkedin}</a></span>
        </div>
      </div>

      <div class="section-title">Professional Summary</div>
      <div class="summary">${resumeData.summary}</div>

      <div class="section-title">Key Impact & Metrics</div>
      <ul class="bullets">
        ${resumeData.achievements.map((a) => `<li><strong>${a.metric}:</strong> ${a.value}</li>`).join("")}
      </ul>

      <div class="section-title">Technical Skills</div>

      ${Object.entries(resumeData.skills)
        .map(
          ([category, skills]) => `
            <div style="margin-bottom:10px;font-size:13px;">
              <strong style="color:#111827;" >
                ${category.charAt(0).toUpperCase() + category.slice(1)}:
              </strong>
              
            
             <div>
              ${skills.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
              </div>

            </div>
          `,
        )
        .join("")}

      <div class="section-title">Work Experience</div>
      ${resumeData.experience
        .map(
          (job) => `
        <div class="job">
          <div class="job-header">
            <span>${job.designation} — ${job.company}</span>
            <span>${job.startDate} to ${job.endDate}</span>
          </div>
          <div class="job-sub">${job.location} | ${job.employmentType}</div>
          <ul class="bullets">
            ${job.responsibilities.map((r) => `<li>${r}</li>`).join("")}
          </ul>
          <div>
            ${job.technologies.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
          </div>
        </div>
      `,
        )
        .join("")}

      <div class="section-title">Key Projects</div>
      ${resumeData.projects
        .map(
          (proj) => `
        <div class="job">
          <div class="job-header">
            <span>${proj.name}</span>
            <span>${proj.type}</span>
          </div>
          <div class="job-sub">${proj.description}</div>
          <ul class="bullets">
            ${proj.highlights.map((h) => `<li>${h}</li>`).join("")}
          </ul>
        </div>
      `,
        )
        .join("")}

      <div class="section-title">Education & Publications</div>
      ${resumeData.education
        .map(
          (edu) => `
        <div style="margin-bottom: 8px; font-size: 13px;">
          <strong>${edu.degree}</strong> — ${edu.institution} (${edu.startDate} - ${edu.endDate})
        </div>
      `,
        )
        .join("")}
      ${resumeData.publications
        .map(
          (pub) => `
        <div style="margin-top: 8px; font-size: 13px;">
          <strong>IEEE Publication:</strong> ${pub.title} (${pub.publisher}, ${pub.publishedDate})
        </div>
      `,
        )
        .join("")}

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
