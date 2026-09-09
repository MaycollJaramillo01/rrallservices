export const verificationData = {
  email: {
    value: "rrallservicves@gmail.com",
    status: "requiresVerification" as const,
  },
  address: {
    value: "5030 Broadwey Suite 823, New York, USA",
    status: "requiresVerification" as const,
  },
  whatsapp: {
    value: "w.app/rrallservices",
    status: "inactiveOrRequiresVerification" as const,
  },
  legalOperator: {
    value: "KR Prestige",
    status: "relationshipRequiresVerification" as const,
  },
  phone: {
    value: "(929) 670-4101",
    status: "verified" as const,
  },
  trajectoryStats: {
    presentations: {
      value: "10,000+",
      label: "Presentaciones personalizadas",
      source: "legacyWebsite" as const,
      externallyVerified: false,
    },
    homes: {
      value: "2,040+",
      label: "Hogares transformados",
      source: "legacyWebsite" as const,
      externallyVerified: false,
    },
    investments: {
      value: "2,855+",
      label: "Inversiones en salud familiar",
      source: "legacyWebsite" as const,
      externallyVerified: false,
    },
  },
} as const;
