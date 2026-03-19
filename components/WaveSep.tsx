export default function WaveSep({
  fill = "#ffffff",
  bg = "transparent",
}: {
  fill?: string;
  bg?: string;
}) {
  return (
    <div className="wave-sep" style={{ background: bg }}>
      <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
          d="M0,40 C240,0 480,64 720,36 C960,8 1200,56 1440,24 L1440,64 L0,64 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
