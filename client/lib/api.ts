const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

type GetToken = () => Promise<string | null>;

async function authenticatedRequest(
  endpoint: string,
  getToken: GetToken,
  options: RequestInit = {},
) {
  const token = await getToken();

  if (!token) {
    throw new Error("No Clerk session token found. Please sign in.");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return {
    status: response.status,
    data,
  };
}

export function testProtectedApi(getToken: GetToken) {
  return authenticatedRequest("/api/protected", getToken);
}

export function syncUser(getToken: GetToken) {
  return authenticatedRequest("/api/users/sync", getToken, {
    method: "POST",
  });
}

type HelperApplicationPayload = {
  fullName: string;
  phone: string;
  city: string;
  area: string;
  services: string[];
  experience: string;
  availability: string;
  experienceDetails: string;
};

export function submitHelperApplication(
  getToken: GetToken,
  payload: HelperApplicationPayload,
  firebaseIdToken: string,
  ) {
    return authenticatedRequest("/api/helper-applications", getToken, {
    method: "POST",
    headers: {
      "X-Firebase-ID-Token": firebaseIdToken,
    },
    body: JSON.stringify(payload),
    });
  }

type UploadVerificationDocumentPayload = {
  applicationId: string;
  verificationId: string;
  documentType: string;
  file: File;
};

export async function uploadVerificationDocument(
  getToken: GetToken,
  payload: UploadVerificationDocumentPayload,
) {
  const token = await getToken();

  if (!token) {
    throw new Error("Please sign in before uploading a document.");
  }

  const formData = new FormData();
  formData.append("document", payload.file);
  formData.append("documentType", payload.documentType);

  const response = await fetch(
    `${API_URL}/api/helper-applications/${encodeURIComponent(payload.applicationId)}/verifications/${encodeURIComponent(payload.verificationId)}/documents`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  const data = await response.json();

  return {
    status: response.status,
    data,
  };
}
  
export function finalizeHelperApplication(
  getToken: GetToken,
  applicationId: string,
  ) {
    return authenticatedRequest(
      `/api/helper-applications/${encodeURIComponent(applicationId)}/submit`,
      getToken,
      {
        method: "POST",
      },
    );
  }

