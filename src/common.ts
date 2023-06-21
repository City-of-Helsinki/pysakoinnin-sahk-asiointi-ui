import i18n from './utils/i18n';

export type AnyObject = Record<string, unknown>;
// eslint-disable-next-line @typescript-eslint/ban-types
export type AnyNonNullishValue = {};
export type AnyValue = AnyNonNullishValue | undefined | null;
export type AnyFunction = (props?: unknown) => unknown;

export type UserAddress = {
  id: string;
  address: string;
  addressType: string;
  city: string;
  countryCode: string;
  postalCode: string;
  primary: boolean;
};

export type UserProfile = {
  addresses: Record<string, { edges: { node: { address: string } } }[]>;
  emails: Record<string, { edges: { node: { email: string } } }[]>;
  firstName: string;
  id: string;
  language: string;
  lastName: string;
  nickname: string;
  phones: Record<string, { edges: { node: { phone: string } } }[]>;
  primaryAddress: UserAddress;
  primaryEmail: Record<string, { email: string }>;
  primaryPhone: Record<string, { phone: string }>;
  verifiedPersonalInformation: {
    firstName: string;
    givenName: string;
    lastName: string;
    municipalityOfResidence: string;
    municipalityOfResidenceNumber: string;
    nationalIdentificationNumber: string;
    permanentAddress: {
      postOffice: string;
      postalCode: string;
      streetAddress: string;
    };
    permanentForeignAddress: string | null;
    temporaryAddress: string | null;
  };
};

export enum Language {
  FI = 'fi',
  SV = 'sv',
  EN = 'en'
}

export enum HelsinkiProfileLanguages {
  FINNISH = 'FINNISH',
  SWEDISH = 'SWEDISH',
  ENGLISH = 'ENGLISH'
}

export const HelsinkiProfileLangConverion = (
  lang: HelsinkiProfileLanguages
) => {
  switch (lang) {
    case HelsinkiProfileLanguages.FINNISH:
      return Language.FI;
    case HelsinkiProfileLanguages.SWEDISH:
      return Language.SV;
    case HelsinkiProfileLanguages.ENGLISH:
      return Language.EN;
    default:
      return null;
  }
};

export const changeLanguage = (lang: Language) => {
  i18n.changeLanguage(lang);
  localStorage.setItem('lang', lang);
  window.location.reload();
};
