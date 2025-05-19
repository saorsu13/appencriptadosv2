export function determineType(simNumber: string): 'tottoli' | 'telco-vision' | null {
    if (!simNumber) return null;
    return simNumber.length === 19 ? 'telco-vision' : simNumber.length === 6 ? 'tottoli' : null;
  }

export function determineSimType(iccid: string): 'physical' | 'electronic' | 'sim-tim' | 'sg' | 'unknown' {
  if (/^89\d{17}$/.test(iccid)) {
    return 'sim-tim';
  } else if (/^(26|27|28|29|30|31|32)\d{4,}$/.test(iccid)) {
    return 'physical';
  } else if (/^(78|79|80)\d{4,}$/.test(iccid)) {
    return 'electronic';
  } else {
    return 'unknown';
  }
}