export default () => {
  return {
    PAVILION_TYPE,
    RESERVABLE,
    TIER,
  } as const;
};

const PAVILION_TYPE = {
  INTERNATIONAL: {
    EN: "International",
    JP: "海外",
  },
  SIGNATURE: {
    EN: "Signature",
    JP: "シグネチャー",
  },
  GOVANDMUNICIPAL: {
    EN: "GovAndMunicipal",
    JP: "自治体/日本政府",
  },
  PRIVATESECTORS: {
    EN: "PrivateSectors",
    JP: "企業",
  },
  OTHERS: {
    EN: "Others",
    JP: "その他",
  },
} as const;

const RESERVABLE = {
  CAN: "可能",
  CANNNOT: "不可",
} as const;

const TIER = {
  S_TIER: {
    JP: "S ティア",
    EN: "s-tier",
  },
  A_TIER: {
    JP: "A ティア",
    EN: "a-tier",
  },
  B_TIER: {
    JP: "B ティア",
    EN: "b-tier",
  },
  C_TIER: {
    JP: "C ティア",
    EN: "c-tier",
  },
  D_TIER: {
    JP: "D ティア",
    EN: "d-tier",
  },
  E_TIER: {
    JP: "E ティア",
    EN: "e-tier",
  },
  UNCHOOSED: {
    JP: "未選択",
    EN: "unchoosed",
  },
} as const;
