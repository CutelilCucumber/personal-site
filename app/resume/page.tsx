export const metadata = { title: 'Resume — Your Name' };

export default function ResumePage() {
  return (
    <section>
      <h1>Resume</h1>
      {/* TODO: decide - embedded PDF viewer, download link, or an HTML version? */}
      <p>
        <a href="/resume.pdf">Download PDF</a>
      </p>
    </section>
  );
}
