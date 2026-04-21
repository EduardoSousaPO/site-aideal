/** Iniciais para avatar (até 2 caracteres). */
export function getInitials(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter((p) => p.length > 0);
  if (parts.length >= 2) {
    return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase();
  }
  const w = parts[0] ?? "?";
  return w.length >= 2 ? w.slice(0, 2).toUpperCase() : `${w[0] ?? "?"}`.toUpperCase();
}

/** Rótulo relativo em português a partir de uma data ISO (yyyy-mm-dd ou completo). */
export function getRelativeDate(iso: string): string {
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return iso;
  const diffDays = Math.floor((Date.now() - then.getTime()) / 86_400_000);
  if (diffDays < 0) return "hoje";
  if (diffDays < 1) return "hoje";
  if (diffDays === 1) return "há 1 dia";
  if (diffDays < 7) return `há ${diffDays} dias`;
  const weeks = Math.floor(diffDays / 7);
  if (diffDays < 45) return weeks <= 1 ? "há 1 semana" : `há ${weeks} semanas`;
  const months = Math.floor(diffDays / 30);
  if (diffDays < 365) return months <= 1 ? "há 1 mês" : `há ${months} meses`;
  const years = Math.floor(diffDays / 365);
  return years <= 1 ? "há 1 ano" : `há ${years} anos`;
}
