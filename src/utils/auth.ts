/**
 * Authentication utilities for API endpoints
 */

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;

export interface AuthResult {
  authenticated: boolean;
  error?: string;
}

/**
 * Validates HTTP Basic Authentication
 * @param request - The incoming request with Authorization header
 * @returns AuthResult indicating if authentication was successful
 */
export function validateBasicAuth(request: Request): AuthResult {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return {
      authenticated: false,
      error: 'Missing Authorization header',
    };
  }

  if (!authHeader.startsWith('Basic ')) {
    return {
      authenticated: false,
      error: 'Invalid Authorization header format',
    };
  }

  try {
    // Extract and decode credentials
    const base64Credentials = authHeader.slice(6); // Remove 'Basic '
    const credentials = atob(base64Credentials);
    const [username, password] = credentials.split(':');

    // Validate credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return {
        authenticated: false,
        error: 'Invalid credentials',
      };
    }

    return {
      authenticated: true,
    };
  } catch (error) {
    return {
      authenticated: false,
      error: 'Failed to decode credentials',
    };
  }
}

/**
 * Creates a 401 Unauthorized response
 * @param message - Optional error message
 * @returns Response with 401 status and WWW-Authenticate header
 */
export function createUnauthorizedResponse(message = 'Unauthorized'): Response {
  return new Response(
    JSON.stringify({
      error: message,
    }),
    {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
        'WWW-Authenticate': 'Basic realm="Admin API"',
      },
    }
  );
}

/**
 * Middleware to protect API endpoints with Basic Auth
 * @param request - The incoming request
 * @param handler - The handler function to execute if authenticated
 * @returns Response from handler or 401 Unauthorized
 */
export async function requireAuth(
  request: Request,
  handler: () => Promise<Response> | Response
): Promise<Response> {
  const authResult = validateBasicAuth(request);

  if (!authResult.authenticated) {
    return createUnauthorizedResponse(authResult.error);
  }

  return await handler();
}
