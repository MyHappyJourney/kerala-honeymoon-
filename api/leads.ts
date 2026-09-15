// Vercel Serverless Function & Shared Server Handler for POST /api/leads
// Secure server-side proxy connecting to iTours CRM

export interface CrmLeadInput {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  destination?: string;
  from_date?: string;
  duration?: string;
  adults?: number | string;
  children?: number | string;
  budget?: string;
  [key: string]: any;
}

export interface CrmLeadResponse {
  statusCode: number;
  data: {
    success: boolean;
    crmStatus?: 'saved';
    error?: 'validation_failed' | 'unauthorized' | 'server_error' | 'timeout' | 'configuration_error' | 'crm_error' | 'network_error';
    message: string;
  };
}

/**
 * Core handler to process and submit lead to iTours CRM
 */
export async function handleCrmLeadSubmission(body: CrmLeadInput): Promise<CrmLeadResponse> {
  const { name, email, phone, city, destination, from_date, duration, adults, children, budget } = body || {};

  // 1. Strict validation of all required iTours CRM fields
  if (!name || typeof name !== 'string' || !name.trim() || name.trim().length < 2) {
    return {
      statusCode: 400,
      data: {
        success: false,
        error: 'validation_failed',
        message: 'Full name is required (at least 2 characters)'
      }
    };
  }

  const cleanPhone = (phone || '').toString().replace(/\D/g, '');
  if (!cleanPhone || cleanPhone.length < 10) {
    return {
      statusCode: 400,
      data: {
        success: false,
        error: 'validation_failed',
        message: 'Valid 10-digit mobile number is required'
      }
    };
  }

  const cleanEmail = (email || '').toString().trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    return {
      statusCode: 400,
      data: {
        success: false,
        error: 'validation_failed',
        message: 'Valid email address is required'
      }
    };
  }

  const cleanCity = (city || '').toString().trim();
  if (!cleanCity || cleanCity.length < 2) {
    return {
      statusCode: 400,
      data: {
        success: false,
        error: 'validation_failed',
        message: 'Departure city is required'
      }
    };
  }

  const cleanName = name.trim();
  const cleanDestination = (destination || 'Kerala').toString().trim();

  // Normalize additional fields
  const cleanFromDate = (from_date || '').toString().trim();
  const cleanDuration = (duration || '').toString().trim();
  const parsedAdults = typeof adults === 'number' ? adults : parseInt((adults || '2').toString(), 10);
  const cleanAdults = isNaN(parsedAdults) ? 2 : Math.max(1, parsedAdults);

  const parsedChildren = typeof children === 'number' ? children : parseInt((children || '0').toString(), 10);
  const cleanChildren = isNaN(parsedChildren) ? 0 : Math.max(0, parsedChildren);

  const cleanBudget = (budget || '').toString().trim();

  // 2. Fetch server-side CRM configuration
  const crmUrl =
    process.env.ITOURS_API_URL ||
    'https://www.myhappyjourney.co.in/controller/external_website_lead/external_lead_receiver.php';
  const apiKey = process.env.ITOURS_API_KEY;

  if (!apiKey) {
    console.error(
      '[iTours CRM] Error: ITOURS_API_KEY environment variable is not configured on the server.'
    );
    return {
      statusCode: 500,
      data: {
        success: false,
        error: 'configuration_error',
        message: 'CRM service is not configured on the server'
      }
    };
  }

  // 3. Prepare payload for iTours CRM API
  const crmPayload = {
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    city: cleanCity,
    destination: cleanDestination,
    from_date: cleanFromDate,
    duration: cleanDuration,
    adults: cleanAdults,
    children: cleanChildren,
    budget: cleanBudget
  };

  // 4. Dispatch to iTours CRM with 8-second timeout
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const crmResponse = await fetch(crmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
      },
      body: JSON.stringify(crmPayload),
      signal: controller.signal
    });

    clearTimeout(timeout);

    const status = crmResponse.status;
    let crmData: any = null;
    try {
      crmData = await crmResponse.json();
    } catch {
      crmData = null;
    }

    // 5. Strict success evaluation: ONLY when HTTP 200 AND crmData.ok === true
    if (status === 200 && crmData && crmData.ok === true) {
      console.log(
        `[iTours CRM] Lead successfully recorded in CRM for ${cleanName} (Phone: ${cleanPhone.slice(0, 3)}***)`
      );
      return {
        statusCode: 200,
        data: {
          success: true,
          crmStatus: 'saved',
          message: 'Lead successfully saved in CRM'
        }
      };
    }

    // If HTTP 200 was returned but ok is NOT true
    if (status === 200) {
      console.error(
        `[iTours CRM] Error: CRM returned HTTP 200 but ok was not true for ${cleanName}. Response status:`,
        crmData
      );
      return {
        statusCode: 422,
        data: {
          success: false,
          error: 'crm_error',
          message: 'CRM rejected the lead submission'
        }
      };
    }

    // HTTP 422: Validation Failed on CRM side
    if (status === 422) {
      console.error(
        `[iTours CRM] Error 422: Validation failed on CRM for ${cleanName}. Response:`,
        crmData || 'No response body'
      );
      return {
        statusCode: 422,
        data: {
          success: false,
          error: 'validation_failed',
          message: 'CRM validation failed for provided fields'
        }
      };
    }

    // HTTP 401: Unauthorized
    if (status === 401) {
      console.error(
        '[iTours CRM] Error 401: Unauthorized - Invalid or rejected X-API-Key.'
      );
      return {
        statusCode: 401,
        data: {
          success: false,
          error: 'unauthorized',
          message: 'Authentication failed with CRM service'
        }
      };
    }

    // HTTP 500 / 5xx: CRM Server Error
    if (status >= 500) {
      console.error(
        `[iTours CRM] Error ${status}: iTours CRM server error while saving lead.`
      );
      return {
        statusCode: 500,
        data: {
          success: false,
          error: 'server_error',
          message: 'CRM service temporarily unavailable'
        }
      };
    }

    // Other unexpected status codes
    console.warn(`[iTours CRM] Unexpected status ${status} received from CRM.`);
    return {
      statusCode: status,
      data: {
        success: false,
        error: 'crm_error',
        message: 'CRM service returned an unexpected status'
      }
    };
  } catch (fetchError: any) {
    clearTimeout(timeout);
    if (fetchError.name === 'AbortError') {
      console.error('[iTours CRM] Timeout: Request to iTours CRM timed out after 8 seconds.');
      return {
        statusCode: 504,
        data: {
          success: false,
          error: 'timeout',
          message: 'CRM connection timed out'
        }
      };
    }

    console.error(
      '[iTours CRM] Network error connecting to CRM:',
      fetchError.message || fetchError
    );
    return {
      statusCode: 502,
      data: {
        success: false,
        error: 'network_error',
        message: 'Unable to reach CRM server'
      }
    };
  }
}

/**
 * Standard Vercel Serverless Function Handler
 */
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: 'method_not_allowed',
      message: 'Method Not Allowed'
    });
  }

  try {
    const result = await handleCrmLeadSubmission(req.body);
    return res.status(result.statusCode).json(result.data);
  } catch (err: any) {
    console.error('[iTours CRM] Internal handler error:', err.message || err);
    return res.status(500).json({
      success: false,
      error: 'server_error',
      message: 'An internal server error occurred'
    });
  }
}
