type WordmarkProps = {
  variant?: 'ink' | 'light';
  className?: string;
};

/**
 * emma. wordmark — always lowercase, coral dot.
 * Uses Bricolage Grotesque (font-display class).
 */
export function Wordmark({ variant = 'ink', className = '' }: WordmarkProps) {
  const color = variant === 'light' ? 'text-emma-creme' : 'text-emma-ink';
  return (
    <span
      className={`font-display font-extrabold tracking-tight ${color} ${className}`}
      style={{ fontSize: '1.375rem', letterSpacing: '-0.04em' }}
    >
      emma<span className="text-emma-coral">.</span>
    </span>
  );
}
