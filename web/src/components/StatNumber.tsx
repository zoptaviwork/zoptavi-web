import CountUp from "./reactbits/CountUp";

/**
 * Renders a display value like "₹700", "6.4X", "22.19%", "₹51k", "10" with the
 * numeric part counting up. Everything before the first digit is a static prefix,
 * everything after the number is a static suffix.
 */
export default function StatNumber({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);

  if (!match) {
    return <span className={className}>{value}</span>;
  }

  const [, prefix, numRaw, suffix] = match;
  const num = parseFloat(numRaw.replace(/,/g, ""));
  const decimals = numRaw.includes(".") ? numRaw.split(".")[1].length : 0;

  return (
    <CountUp
      to={num}
      decimals={decimals}
      prefix={prefix}
      suffix={suffix}
      className={className}
    />
  );
}
