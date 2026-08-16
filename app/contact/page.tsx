export const metadata = { title: 'Contact — Your Name' };

export default function ContactPage() {
  return (
    <section>
      <h1>Contact</h1>
      {/* TODO: decide - plain mailto link (simplest, no backend) vs a form (needs an API route or a service like Formspree) */}
      <p>
        <a href="mailto:you@example.com">you@example.com</a>
      </p>
    </section>
  );
}
