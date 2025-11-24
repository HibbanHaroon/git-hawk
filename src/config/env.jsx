/**
 * Centralized environment variables configuration.
 * All environment variable access should go through this file.
 * This provides a single source of truth and makes it easy to validate
 * and manage environment variables.
 */

/**
 * GitHub API token for authentication
 * @type {string | undefined}
 */
export const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

/**
 * Ninja API key for external APIs (quotes, jokes, historical events)
 * Note: Previously incorrectly named VITE_NINJA_API_URL, should be VITE_NINJA_API_KEY
 * @type {string | undefined}
 */
export const NINJA_API_KEY = import.meta.env.VITE_NINJA_API_KEY

/**
 * Validates that required environment variables are present.
 * Logs warnings in development if variables are missing.
 *
 * @returns {boolean} True if all required variables are present
 */
export function validateEnvVars() {
  const missing = []

  if (!GITHUB_TOKEN) {
    missing.push('VITE_GITHUB_TOKEN')
  }

  if (!NINJA_API_KEY) {
    missing.push('VITE_NINJA_API_KEY')
  }

  if (missing.length > 0 && import.meta.env.DEV) {
    console.warn(
      `Missing environment variables: ${missing.join(', ')}. ` +
        'Some features may not work correctly.'
    )
  }

  return missing.length === 0
}

// Validate on module load (development only)
if (import.meta.env.DEV) {
  validateEnvVars()
}
