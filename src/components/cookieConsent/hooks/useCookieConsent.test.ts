/* eslint-disable no-underscore-dangle */
import { renderHook } from '@testing-library/react-hooks';
import { useTranslation } from 'react-i18next';
import useCookieConsent from './useCookieConsent';
import { Language } from '../../../common';
import { Mock } from 'vitest';
import { act } from '@testing-library/react';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}));

describe('useCookieConsent', () => {
  const setLanguageMock = vi.fn();
  const tMock = vi.fn().mockReturnValue('Test Site');

  beforeEach(() => {
    (useTranslation as Mock).mockReturnValue({ t: tMock });
    setLanguageMock.mockClear();
  });

  it('should initialize with default language FI', () => {
    const { result } = renderHook(() =>
      useCookieConsent({ language: undefined, setLanguage: undefined })
    );

    expect(result.current.config.currentLanguage).toBe(Language.FI);
    expect(result.current.config.siteName).toBe('Test Site');
  });

  it('should update language when language prop changes', () => {
    const { result, rerender } = renderHook(
      ({ language }) =>
        useCookieConsent({ language, setLanguage: setLanguageMock }),
      {
        initialProps: { language: Language.FI }
      }
    );

    expect(result.current.config.currentLanguage).toBe(Language.FI);

    rerender({ language: Language.SV });

    expect(result.current.config.currentLanguage).toBe(Language.SV);
  });

  it('should call setLanguage when onLanguageChange is called', () => {
    const { result } = renderHook(() =>
      useCookieConsent({ language: Language.FI, setLanguage: setLanguageMock })
    );

    act(() => {
      if (result.current.config.language?.onLanguageChange) {
        result.current.config.language.onLanguageChange('sv');
      }
    });

    expect(setLanguageMock).toHaveBeenCalledWith(Language.SV);
    expect(result.current.config.currentLanguage).toBe(Language.SV);
  });

  it('should handle consents correctly', () => {
    const { result } = renderHook(() =>
      useCookieConsent({ language: Language.FI, setLanguage: setLanguageMock })
    );

    window._paq = [];

    act(() => {
      if (result.current.config.onAllConsentsGiven) {
        result.current.config.onAllConsentsGiven({ matomo: true });
      }
    });

    expect(window._paq).toEqual([
      ['setConsentGiven'],
      ['setCookieConsentGiven']
    ]);

    window._paq = [];

    act(() => {
      if (result.current.config.onConsentsParsed) {
        result.current.config.onConsentsParsed({ matomo: false }, false);
      }
    });

    expect(window._paq).toEqual([['forgetConsentGiven']]);
  });

  it('should set focusTargetSelector based on isModal prop', () => {
    const { result: resultWithModal } = renderHook(() =>
      useCookieConsent({
        language: Language.FI,
        setLanguage: setLanguageMock,
        isModal: true
      })
    );

    expect(resultWithModal.current.config.focusTargetSelector).toBe('#content');

    const { result: resultWithoutModal } = renderHook(() =>
      useCookieConsent({
        language: Language.FI,
        setLanguage: setLanguageMock,
        isModal: false
      })
    );

    expect(
      resultWithoutModal.current.config.focusTargetSelector
    ).toBeUndefined();
  });
});
