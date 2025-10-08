import type { EmailParameters, AnalysisResult } from '../types/analysis';

export function analyzeEmail(content: string): AnalysisResult {
  const urls = extractUrls(content);
  const domains = extractDomains(urls);
  
  const parameters: EmailParameters = {
    Have_IP: analyzeIPAddresses(urls),
    Have_At: analyzeAtSymbols(urls),
    URL_Length: calculateAverageUrlLength(urls),
    URL_Depth: calculateAverageUrlDepth(urls),
    Redirection: analyzeRedirections(urls),
    https_Domain: analyzeHttpsUsage(urls),
    TinyURL: analyzeTinyUrls(urls),
    'Prefix/Suffix': analyzePrefixSuffix(domains),
    DNS_Record: analyzeDnsRecords(domains),
    Web_Traffic: analyzeWebTraffic(domains),
    Domain_Age: analyzeDomainAge(domains),
    Domain_End: analyzeDomainExpiration(domains),
    iFrame: analyzeIframes(content),
    Mouse_Over: analyzeMouseOverEvents(content),
    Right_Click: analyzeRightClickEvents(content),
    Web_Forwards: analyzeWebForwards(content)
  };

  return {
    parameters,
    metadata: {
      urlsFound: urls.length,
      domainsAnalyzed: domains.length,
      contentLength: content.length
    }
  };
}

function extractUrls(content: string): string[] {
  const urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/gi;
  return content.match(urlRegex) || [];
}

function extractDomains(urls: string[]): string[] {
  const domains = new Set<string>();
  
  urls.forEach(url => {
    try {
      const domain = new URL(url).hostname;
      domains.add(domain);
    } catch (error) {
      // Invalid URL, skip
    }
  });
  
  return Array.from(domains);
}

function analyzeIPAddresses(urls: string[]): number {
  const ipRegex = /^https?:\/\/(?:\d{1,3}\.){3}\d{1,3}/;
  return urls.some(url => ipRegex.test(url)) ? 1 : 0;
}

function analyzeAtSymbols(urls: string[]): number {
  return urls.some(url => url.includes('@')) ? 1 : 0;
}

function calculateAverageUrlLength(urls: string[]): number {
  if (urls.length === 0) return 0;
  const totalLength = urls.reduce((sum, url) => sum + url.length, 0);
  return Math.round(totalLength / urls.length);
}

function calculateAverageUrlDepth(urls: string[]): number {
  if (urls.length === 0) return 0;
  
  const depths = urls.map(url => {
    try {
      const pathname = new URL(url).pathname;
      return pathname.split('/').filter(segment => segment.length > 0).length;
    } catch (error) {
      return 0;
    }
  });
  
  const averageDepth = depths.reduce((sum, depth) => sum + depth, 0) / depths.length;
  return Math.round(averageDepth);
}

function analyzeRedirections(urls: string[]): number {
  // Check for common redirection indicators
  const redirectionIndicators = ['redirect', 'redir', 'goto', 'link', 'url=', 'target='];
  return urls.some(url => 
    redirectionIndicators.some(indicator => 
      url.toLowerCase().includes(indicator)
    )
  ) ? 1 : 0;
}

function analyzeHttpsUsage(urls: string[]): number {
  if (urls.length === 0) return 1;
  const httpsUrls = urls.filter(url => url.startsWith('https://'));
  return httpsUrls.length / urls.length >= 0.8 ? 1 : 0;
}

function analyzeTinyUrls(urls: string[]): number {
  const tinyUrlServices = [
    'bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'short.link',
    'tiny.cc', 'lnkd.in', 'buff.ly', 'ift.tt', 'is.gd', 'v.gd'
  ];
  
  return urls.some(url => 
    tinyUrlServices.some(service => url.includes(service))
  ) ? 1 : 0;
}

function analyzePrefixSuffix(domains: string[]): number {
  const suspiciousPatterns = [
    /^[a-z]+-[a-z]+\./,  // prefix-suffix pattern
    /\d+[a-z]+/,         // numbers mixed with letters
    /[a-z]+\d+[a-z]+/    // letters-numbers-letters pattern
  ];
  
  const suspiciousDomains = domains.filter(domain =>
    suspiciousPatterns.some(pattern => pattern.test(domain))
  );
  
  return suspiciousDomains.length > 0 ? 1 : -1;
}

function analyzeDnsRecords(domains: string[]): number {
  // In a real implementation, this would check actual DNS records
  // For simulation, we'll assume most legitimate domains have valid DNS
  const legitimateTlds = ['.com', '.org', '.net', '.edu', '.gov', '.mil'];
  const validDomains = domains.filter(domain =>
    legitimateTlds.some(tld => domain.endsWith(tld))
  );
  
  return validDomains.length === domains.length ? 1 : 0;
}

function analyzeWebTraffic(domains: string[]): number {
  // Simulate web traffic ranking (lower is better, like Alexa ranking)
  // Popular domains would have lower numbers
  const popularDomains = ['google.com', 'microsoft.com', 'apple.com', 'amazon.com'];
  const hasPopularDomain = domains.some(domain =>
    popularDomains.some(popular => domain.includes(popular))
  );
  
  return hasPopularDomain ? 100 : Math.floor(Math.random() * 1000000) + 1000;
}

function analyzeDomainAge(domains: string[]): number {
  // Simulate domain age in months
  // Legitimate domains tend to be older
  const knownOldDomains = ['google.com', 'microsoft.com', 'apple.com', 'amazon.com'];
  const hasKnownDomain = domains.some(domain =>
    knownOldDomains.some(known => domain.includes(known))
  );
  
  return hasKnownDomain ? Math.floor(Math.random() * 240) + 120 : Math.floor(Math.random() * 24) + 1;
}

function analyzeDomainExpiration(domains: string[]): number {
  // Simulate domain expiration in years
  // Legitimate domains tend to be registered for longer periods
  return Math.floor(Math.random() * 5) + 1;
}

function analyzeIframes(content: string): number {
  const iframeRegex = /<iframe[^>]*>/gi;
  const matches = content.match(iframeRegex);
  return matches ? matches.length : 0;
}

function analyzeMouseOverEvents(content: string): number {
  const mouseOverRegex = /onmouseover|onmouseenter|onhover/gi;
  const matches = content.match(mouseOverRegex);
  return matches && matches.length > 0 ? 1 : 0;
}

function analyzeRightClickEvents(content: string): number {
  const rightClickRegex = /oncontextmenu|onrightclick/gi;
  const matches = content.match(rightClickRegex);
  return matches && matches.length > 0 ? 1 : 0;
}

function analyzeWebForwards(content: string): number {
  // Check for forwarding indicators
  const forwardingPatterns = [
    /window\.location/gi,
    /location\.href/gi,
    /location\.replace/gi,
    /meta.*refresh/gi
  ];
  
  return forwardingPatterns.some(pattern => pattern.test(content)) ? 1 : 0;
}