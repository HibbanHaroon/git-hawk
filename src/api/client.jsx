import { GITHUB_TOKEN, NINJA_API_KEY } from '../config/env'

/**
 * HTTP client wrapper around fetch API.
 * Provides centralized configuration for headers, error handling, and API-specific settings.
 */

/**
 * Default headers for GitHub API requests
 * @type {HeadersInit}
 */
const getGitHubHeaders = () => ({
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: 'application/vnd.github+json',
})

/**
 * Default headers for Ninja API requests
 * @type {HeadersInit}
 */
const getNinjaHeaders = () => ({
  'X-Api-Key': NINJA_API_KEY || '',
  'Content-Type': 'application/json',
})

/**
 * Makes an HTTP request using fetch with centralized error handling.
 *
 * @param {string} url - The URL to fetch
 * @param {RequestInit} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<Response>} The fetch response
 * @throws {Error} If the request fails or response is not ok
 */
async function request(url, options = {}) {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response
  } catch (error) {
    console.error('Request failed:', error)
    throw error
  }
}

/**
 * Makes a GitHub API request with proper authentication headers.
 *
 * @param {string} url - The GitHub API endpoint URL
 * @param {RequestInit} options - Additional fetch options
 * @returns {Promise<Response>} The fetch response
 */
export async function githubRequest(url, options = {}) {
  return request(url, {
    ...options,
    headers: {
      ...getGitHubHeaders(),
      ...options.headers,
    },
  })
}

/**
 * Makes a Ninja API request with proper API key headers.
 *
 * @param {string} url - The Ninja API endpoint URL
 * @param {RequestInit} options - Additional fetch options
 * @returns {Promise<Response>} The fetch response
 */
export async function ninjaRequest(url, options = {}) {
  return request(url, {
    ...options,
    headers: {
      ...getNinjaHeaders(),
      ...options.headers,
    },
  })
}

/**
 * Makes a generic HTTP request (for external APIs without special headers).
 *
 * @param {string} url - The URL to fetch
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<Response>} The fetch response
 */
export async function genericRequest(url, options = {}) {
  return request(url, options)
}

/**
 * Parses JSON response and handles errors.
 *
 * @param {Response} response - The fetch response
 * @returns {Promise<any>} The parsed JSON data
 */
export async function parseJSON(response) {
  try {
    return await response.json()
  } catch (error) {
    console.error('Failed to parse JSON:', error)
    throw error
  }
}
