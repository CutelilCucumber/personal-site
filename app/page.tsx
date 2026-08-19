import SkeeBallGame from '@/components/SkeeBallGame';

export default function HomePage() {
  return (
    <div className="hero-single">
      <div>
        <h1 className="hero-name">Brian Sonderen</h1>
        <p className="hero-title">Software Engineer</p>
      </div>

      <div className="cabinet">
        <SkeeBallGame />
      </div>
    </div>
  );
}
