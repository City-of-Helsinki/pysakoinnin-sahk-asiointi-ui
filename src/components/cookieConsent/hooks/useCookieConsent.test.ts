/* eslint-disable no-underscore-dangle */
import { act, renderHook } from '@testing-library/react';
import useCookieConsent from './useCookieConsent';
import { Language } from '../../../common';
import { beforeEach, describe, expect, it } from 'vitest';

type PaqWindow = Window & {
  _paq: unknown[];
};

const paqWindow = (window as unknown) as PaqWindow;

describe('useCookieConsent', () => {
  beforeEach(() => {
    paqWindow._paq = [];
  });

  it('should initialize with default language FI', () => {
    const { result } = renderHook(() =>
      useCookieConsent({ language: undefined })
    );

    expect(result.current.options?.language).toBe(Language.FI);
  });

  it('should update language when language prop changes', () => {
    const { result, rerender } = renderHook(
      ({ language }: { language: Language }) => useCookieConsent({ language }),
      {
        initialProps: { language: Language.FI }
      }
    );

    expect(result.current.options?.language).toBe(Language.FI);

    rerender({ language: Language.SV });

    expect(result.current.options?.language).toBe(Language.SV);
  });

  it('should set focusTargetSelector based on isModal prop', () => {
    const { result: resultWithModal } = renderHook(() =>
      useCookieConsent({ language: Language.FI, isModal: true })
    );

    expect(resultWithModal.current.options?.focusTargetSelector).toBe(
      '#content'
    );

    const { result: resultWithoutModal } = renderHook(() =>
      useCookieConsent({ language: Language.FI, isModal: false })
    );

    expect(
      resultWithoutModal.current.options?.focusTargetSelector
    ).toBeUndefined();
  });

  it('should push consent accepted commands to matomo when statistics consent is given', () => {
    const { result } = renderHook(() =>
      useCookieConsent({ language: Language.FI })
    );

    expect(result.current.onChange).toBeDefined();

    act(() => {
      result.current.onChange?.({
        acceptedGroups: ['statistics']
      } as never);
    });

    expect(paqWindow._paq).toEqual([
      ['setConsentGiven'],
      ['setCookieConsentGiven']
    ]);
  });

  it('should push consent forgotten command to matomo when statistics consent is not given', () => {
    const { result } = renderHook(() =>
      useCookieConsent({ language: Language.FI })
    );

    paqWindow._paq = [];

    expect(result.current.onChange).toBeDefined();

    act(() => {
      result.current.onChange?.({
        acceptedGroups: ['essential']
      } as never);
    });

    expect(paqWindow._paq).toEqual([['forgetConsentGiven']]);
  });
});
