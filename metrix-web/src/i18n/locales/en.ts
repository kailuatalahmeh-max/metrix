const en = {
  nav: {
    label: "Main",
    dashboard: "Dashboard",
    workshops: "Workshops",
    addWorkshop: "Add Workshop",
    switchLanguage: "العربية",
    switchLanguageLabel: "Switch language to Arabic",
  },

  common: {
    meterUnit: "m",
  },

  dashboard: {
    title: "Dashboard",
    loading: "Loading…",
    sinceLastPayment: (date: string) => `Since your last payment on ${date}`,
    noPayments: "No payments yet. Showing all your work.",
    addWorkshop: "+ Add workshop",
    metersSincePayment: "Meters since last payment",
    workshopsSincePayment: "Workshops since last payment",
    lastPayment: "Last payment",
    never: "Never",
    recordPaymentHint: "Use “Record payment” when you get paid",
    recentWorkshops: "Recent workshops",
    viewAll: "View all →",
    noWorkshops: "No workshops yet.",
    addFirst: "Add your first one",
    recordPayment: "Record payment",
    recordPaymentText:
      "When your accountant pays you, record it here. The counters above will start again from zero.",
    amountLabel: "Amount (optional)",
    amountPlaceholder: "e.g. 150",
    saving: "Saving…",
    invalidAmount: "Please enter a positive number for the amount.",
    confirmPayment: "Record a payment? The meters counter will start from zero.",
  },

  workshops: {
    title: "All workshops",
    addWorkshop: "+ Add workshop",
    customer: "Customer",
    product: "Product",
    region: "Region",
    meters: "Meters",
    date: "Date",
    actions: "Actions",
    empty: "No workshops yet.",
    delete: "Delete",
    deleteLabel: (customerName: string) => `Delete workshop of ${customerName}`,
  },

  addWorkshop: {
    title: "Data Entry Page",
    formTitle: "workshop form",
    customerName: "customer name",
    customerNamePlaceholder: "Enter customer name",
    productName: "product name",
    productNamePlaceholder: "Enter product name",
    region: "region",
    regionPlaceholder: "Enter region",
    meters: "meters",
    metersPlaceholder: "Enter meters",
    submit: "Send data",
  },

  notFound: {
    title: "Page not found",
    back: "Back to dashboard",
  },

  messages: {
    invalidMeters: "Please enter a valid number for meters.",
    workshopCreated: "Workshop created successfully!",
    workshopDeleted: "Workshop deleted successfully!",
    paymentRecorded: "Payment recorded!",
    error: "An error occurred.",
    unexpectedError: "An unexpected error occurred.",
  },
};

export type Translation = typeof en;

export default en;
