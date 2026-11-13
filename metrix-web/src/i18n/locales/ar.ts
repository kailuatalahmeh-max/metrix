import type { Translation } from "./en";

const ar: Translation = {
  nav: {
    label: "القائمة الرئيسية",
    dashboard: "لوحة التحكم",
    workshops: "الورش",
    addWorkshop: "إضافة ورشة",
    switchLanguage: "English",
    switchLanguageLabel: "تغيير اللغة إلى الإنجليزية",
  },

  common: {
    meterUnit: "م",
  },

  dashboard: {
    title: "لوحة التحكم",
    loading: "جارٍ التحميل…",
    sinceLastPayment: (date: string) => `منذ آخر دفعة بتاريخ ${date}`,
    noPayments: "لا توجد دفعات بعد. يتم عرض كل عملك.",
    addWorkshop: "+ إضافة ورشة",
    metersSincePayment: "الأمتار منذ آخر دفعة",
    workshopsSincePayment: "الورش منذ آخر دفعة",
    lastPayment: "آخر دفعة",
    never: "لا يوجد",
    recordPaymentHint: "استخدم «تسجيل دفعة» عندما تستلم أجرك",
    recentWorkshops: "آخر الورش",
    viewAll: "عرض الكل ←",
    noWorkshops: "لا توجد ورش بعد.",
    addFirst: "أضف أول ورشة",
    recordPayment: "تسجيل دفعة",
    recordPaymentText:
      "عندما يدفع لك المحاسب، سجّل الدفعة هنا. ستبدأ العدّادات في الأعلى من الصفر من جديد.",
    amountLabel: "المبلغ (اختياري)",
    amountPlaceholder: "مثال: 150",
    saving: "جارٍ الحفظ…",
    invalidAmount: "الرجاء إدخال رقم موجب للمبلغ.",
    confirmPayment: "هل تريد تسجيل دفعة؟ سيبدأ عدّاد الأمتار من الصفر.",
  },

  workshops: {
    title: "كل الورش",
    addWorkshop: "+ إضافة ورشة",
    customer: "الزبون",
    product: "المنتج",
    region: "المنطقة",
    meters: "الأمتار",
    date: "التاريخ",
    actions: "إجراءات",
    empty: "لا توجد ورش بعد.",
    delete: "حذف",
    deleteLabel: (customerName: string) => `حذف ورشة ${customerName}`,
  },

  addWorkshop: {
    title: "صفحة إدخال البيانات",
    formTitle: "نموذج الورشة",
    customerName: "اسم الزبون",
    customerNamePlaceholder: "أدخل اسم الزبون",
    productName: "اسم المنتج",
    productNamePlaceholder: "أدخل اسم المنتج",
    region: "المنطقة",
    regionPlaceholder: "أدخل المنطقة",
    meters: "الأمتار",
    metersPlaceholder: "أدخل عدد الأمتار",
    submit: "إرسال البيانات",
  },

  notFound: {
    title: "الصفحة غير موجودة",
    back: "العودة إلى لوحة التحكم",
  },

  messages: {
    invalidMeters: "الرجاء إدخال رقم صحيح للأمتار.",
    workshopCreated: "تمت إضافة الورشة بنجاح!",
    workshopDeleted: "تم حذف الورشة بنجاح!",
    paymentRecorded: "تم تسجيل الدفعة!",
    error: "حدث خطأ.",
    unexpectedError: "حدث خطأ غير متوقع.",
  },
};

export default ar;
