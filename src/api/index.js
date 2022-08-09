const BASE_URL = "http://localhost";
export async function fetchInvoices() {
  const response = await fetch(BASE_URL);
  return await response.json();
}

export async function fetUserInvoices() {
  const response = await fetch(BASE_URL);
  return await response.json();
}

export async function createNewInvoice(invoiceData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    body: invoiceData,
  });

  return await response.json();
}
