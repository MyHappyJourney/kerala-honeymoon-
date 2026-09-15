/// <reference types="vite/client" />
import { LeadFormData } from '../types';
import { PACKAGES, ENQUIRY_EMAIL } from '../data/tourData';

export interface LeadSubmissionResult {
  success: boolean;
  message: string;
  leadId?: string;
  crmStatus?: string;
  error?: string;
}

let activeSubmissionPromise: Promise<LeadSubmissionResult> | null = null;
let lastSubmittedTimestamp = 0;
let lastSubmittedFingerprint = '';

/**
 * Reusable Lead Submission Handler.
 * 1. Submits required lead fields (name, email, phone, city, destination) to /api/leads (iTours CRM).
 * 2. Strict evaluation: Treats as success ONLY if /api/leads confirms CRM status 200 + ok:true.
 * 3. Delivers backup email notification to mhjenquiry@gmail.com via FormSubmit AJAX.
 * 4. Records lead history in client localStorage.
 * 5. Deduplicates rapid double-click submissions.
 */
export async function submitLead(formData: LeadFormData): Promise<LeadSubmissionResult> {
  const cleanPhone = formData.phone.replace(/\D/g, '');
  const cleanEmail = (formData.email || '').trim();
  const cleanCity = (formData.city || '').trim();
  const fingerprint = `${cleanPhone}_${cleanEmail}_${formData.travelDate}_${formData.packagePreference}`;
  const now = Date.now();

  // Deduplication: Return active or immediately previous submission if within 3s
  if (activeSubmissionPromise) {
    return activeSubmissionPromise;
  }
  if (fingerprint === lastSubmittedFingerprint && now - lastSubmittedTimestamp < 3000) {
    return {
      success: true,
      message: `Thank you, ${formData.name}! Your enquiry has already been received. Our Kerala travel expert will contact you shortly.`,
      leadId: `MHJ-${lastSubmittedTimestamp.toString().slice(-6)}`
    };
  }

  activeSubmissionPromise = (async () => {
    try {
      const matchedPkg = PACKAGES.find(p => p.id === formData.packagePreference);
      const packageName = matchedPkg 
        ? `${matchedPkg.durationBadge} (${matchedPkg.title})`
        : (formData.packagePreference || 'Kerala Tour Package');

      const durationString = matchedPkg 
        ? `${matchedPkg.durationBadge} (${matchedPkg.nights}N / ${matchedPkg.days}D)`
        : (formData.packagePreference || '6 NIGHTS / 7 DAYS (6N / 7D)');

      const leadId = `MHJ-${Date.now().toString().slice(-6)}`;

      // 1. Dispatch to Server-Side API endpoint (/api/leads) -> iTours CRM
      // The browser waits for the actual response without premature timeouts
      let apiResponse: Response;
      let apiResult: any = null;

      try {
        apiResponse = await fetch('/api/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: cleanEmail,
            phone: cleanPhone,
            city: cleanCity,
            destination: 'Kerala',
            from_date: formData.travelDate || '',
            duration: durationString,
            adults: Number(formData.adults) || 2,
            children: Number(formData.children) || 0,
            budget: formData.budget || ''
          })
        });

        apiResult = await apiResponse.json().catch(() => null);
      } catch (networkErr: any) {
        console.error('Failed to reach /api/leads:', networkErr);
        return {
          success: false,
          error: 'network_error',
          message: 'Unable to connect to lead service. Please check your internet connection or WhatsApp us directly.'
        };
      }

      // 2. Prepare backup email notification payload for FormSubmit
      const emailPayload = {
        _subject: `🌴 New Kerala Tour Enquiry from ${formData.name} [${packageName}]`,
        _template: 'table',
        _captcha: 'false',
        _replyto: cleanEmail || undefined,
        'Lead Reference ID': leadId,
        'Customer Full Name': formData.name.trim(),
        'Phone Number': cleanPhone,
        'Departure City': cleanCity,
        'Email Address': cleanEmail,
        'Selected Package': packageName,
        'Expected Travel Date': formData.travelDate || 'Flexible / Not decided',
        'Number of Guests': `${formData.adults || 2} Adults, ${formData.children || 0} Children`,
        'Budget Preference': formData.budget || 'Not specified',
        'Special Requests / Notes': formData.notes || 'None',
        'Submission Time': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      };

      // Dispatch backup email asynchronously without blocking the user
      fetch(`https://formsubmit.co/ajax/${ENQUIRY_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      }).catch(err => {
        console.warn('FormSubmit backup email notice:', err);
      });

      // Save locally to localStorage so lead history can be verified
      try {
        const existing = JSON.parse(localStorage.getItem('mhj_leads') || '[]');
        existing.unshift({
          id: leadId,
          recipientEmail: ENQUIRY_EMAIL,
          timestamp: new Date().toISOString(),
          packageName,
          crmSaved: apiResponse.ok && apiResult?.success === true && apiResult?.crmStatus === 'saved',
          ...formData
        });
        localStorage.setItem('mhj_leads', JSON.stringify(existing));
      } catch {
        // Ignore localStorage errors
      }

      // 3. Strict verification of iTours CRM response
      if (apiResponse.ok && apiResult?.success === true && apiResult?.crmStatus === 'saved') {
        lastSubmittedTimestamp = now;
        lastSubmittedFingerprint = fingerprint;

        return {
          success: true,
          crmStatus: 'saved',
          message: `Thank you, ${formData.name}! Your enquiry has been received and registered. Our Kerala travel expert will contact you within 30 minutes with a customized itinerary.`,
          leadId
        };
      }

      // Return explicit CRM failure details to caller
      return {
        success: false,
        crmStatus: apiResult?.crmStatus,
        error: apiResult?.error || 'crm_error',
        message: apiResult?.message || 'Unable to submit enquiry to CRM. Please try again or contact us via WhatsApp.'
      };
    } catch (error: any) {
      console.error('Lead submission unhandled error:', error);
      return {
        success: false,
        error: 'client_error',
        message: 'An unexpected error occurred while submitting your enquiry. Please try again or message us on WhatsApp.'
      };
    } finally {
      activeSubmissionPromise = null;
    }
  })();

  return activeSubmissionPromise;
}

