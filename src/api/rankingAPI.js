const API_BASE_URL = import.meta.env.VITE_API_URL;
const REQUEST_TIMEOUT = 10000; // 10 seconds

/**
 * Validates API base URL is configured
 */
function validateApiConfig() {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL environment variable is not configured');
  }
}

/**
 * Validates domain input
 */
function validateDomain(domain) {
  if (!domain || typeof domain !== 'string' || domain.trim() === '') {
    throw new Error('Domain must be a non-empty string');
  }
  return domain.trim();
}

/**
 * Validates domains input (comma-separated or array)
 */
function validateDomains(domains) {
  if (!domains || (typeof domains !== 'string' && !Array.isArray(domains))) {
    throw new Error('Domains must be a non-empty string or array');
  }
  const domainsStr = Array.isArray(domains) ? domains.join(',') : domains.trim();
  if (domainsStr === '') {
    throw new Error('Domains list cannot be empty');
  }
  return domainsStr;
}

/**
 * Creates an abort controller with timeout
 */
function createAbortSignal() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  return { controller, timeoutId };
}

/**
 * Handles fetch errors and HTTP status codes
 */
async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(
      `API Error: ${response.status} ${response.statusText} - ${errorData}`
    );
  }
  
  try {
    return await response.json();
  } catch (error) {
    throw new Error(`Invalid JSON response from server: ${error.message}`);
  }
}

/**
 * Fetches ranking for a single domain
 * @param {string} domain - Domain name to query
 * @returns {Promise<Object>} Ranking data
 * @throws {Error} If validation fails or API request fails
 */
export async function fetchSingleDomain(domain) {
  try {
    validateApiConfig();
    const validatedDomain = validateDomain(domain);
    const { controller, timeoutId } = createAbortSignal();

    const response = await fetch(
      `${API_BASE_URL}/ranking/tranco?domain=${encodeURIComponent(validatedDomain)}`,
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);
    return await handleResponse(response);
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${REQUEST_TIMEOUT}ms`);
    }
    console.error('fetchSingleDomain error:', error);
    throw error;
  }
}

/**
 * Fetches ranking for multiple domains
 * @param {string|Array<string>} domains - Comma-separated domains or array of domain names
 * @returns {Promise<Object>} Ranking data for all domains
 * @throws {Error} If validation fails or API request fails
 */
export async function fetchMultipleDomains(domains) {
  try {
    validateApiConfig();
    const validatedDomains = validateDomains(domains);
    const { controller, timeoutId } = createAbortSignal();

    const response = await fetch(
      `${API_BASE_URL}/ranking/tranco/multi?domains=${encodeURIComponent(validatedDomains)}`,
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);
    return await handleResponse(response);
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${REQUEST_TIMEOUT}ms`);
    }
    console.error('fetchMultipleDomains error:', error);
    throw error;
  }
}