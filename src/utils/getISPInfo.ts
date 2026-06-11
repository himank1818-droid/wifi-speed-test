export interface ISPInfo {
  ip: string;
  isp: string;
  city: string;
  region: string;
  country: string;
  org: string;
  asn: string;
}

/**
 * Fetches the user's actual ISP and IP information using free IP geolocation APIs
 */
export async function getISPInfo(): Promise<ISPInfo | null> {
  try {
    // Try ipapi.co first (free, no API key required for basic usage)
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch ISP info');
    }

    const data = await response.json();

    return {
      ip: data.ip || 'Unknown',
      isp: data.org || data.isp || 'Unknown ISP',
      city: data.city || 'Unknown',
      region: data.region || '',
      country: data.country_name || data.country || '',
      org: data.org || '',
      asn: data.asn || '',
    };
  } catch (error) {
    console.warn('Failed to fetch ISP info from ipapi.co, trying fallback...', error);

    // Fallback: Try ip-api.com
    try {
      const fallbackResponse = await fetch('http://ip-api.com/json/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!fallbackResponse.ok) {
        throw new Error('Fallback failed');
      }

      const data = await fallbackResponse.json();

      return {
        ip: data.query || 'Unknown',
        isp: data.isp || 'Unknown ISP',
        city: data.city || 'Unknown',
        region: data.regionName || '',
        country: data.country || '',
        org: data.org || '',
        asn: data.as || '',
      };
    } catch (fallbackError) {
      console.warn('All ISP info APIs failed', fallbackError);
      return null;
    }
  }
}

/**
 * Generates a realistic server name based on ISP
 */
export function generateServerName(isp: string): string {
  const ispUpper = isp.toUpperCase();
  
  // Common ISP mappings
  const ispMappings: Record<string, string> = {
    'ACT': 'ACT FIBERNET',
    'ACT FIBERNET': 'ACT FIBERNET',
    'EXCITEL': 'EXCITEL',
    'JIO': 'JIOFIBER',
    'RELIANCE': 'JIOFIBER',
    'AIRTEL': 'AIRTEL XSTREAM',
    'BHARTI': 'AIRTEL XSTREAM',
    'VI': 'Vodafone Idea',
    'VODAFONE': 'Vodafone Idea',
    'BSNL': 'BSNL BROADBAND',
    'MTNL': 'MTNL FIBER',
    'TATA': 'TATA PLAY FIBER',
    'DEN': 'DEN BROADBAND',
    'RAILTEL': 'RAILTEL',
    'YOU': 'YOU BROADBAND',
    'SPECTRUM': 'SPECTRUM',
    'COMCAST': 'XFINITY',
    'XFINITY': 'XFINITY',
    'VERIZON': 'VERIZON FIOS',
    'AT&T': 'AT&T FIBER',
    'COX': 'COX COMMUNICATIONS',
    'CENTURYLINK': 'CENTURYLINK',
    'FRONTIER': 'FRONTIER FIBER',
    'GOOGLE': 'GOOGLE FIBER',
  };

  // Check for matches
  for (const [key, value] of Object.entries(ispMappings)) {
    if (ispUpper.includes(key)) {
      return value;
    }
  }

  // Default: Use ISP name or generic server
  return isp.length > 20 ? isp.substring(0, 20) + '...' : isp;
}
