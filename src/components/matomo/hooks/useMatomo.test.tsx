import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-namespace
import * as MatomoTracker from '../MatomoTracker';
import { MatomoProvider } from '../matomo-context';
import useMatomo from './useMatomo';

const MOCK_URL = 'https://www.hel.fi';

describe('useMatomo', () => {
  const MockedComponent = () => {
    const { trackPageView } = useMatomo();

    useEffect(() => {
      trackPageView({ href: MOCK_URL });
    }, [trackPageView]);

    return <div>MockedComponent</div>;
  };

  it('should trackPageView', () => {
    const trackPageViewMock = vi.fn();

    vi.spyOn(MatomoTracker, 'default').mockImplementation(
      () =>
        (({
          trackPageView: trackPageViewMock
        } as unknown) as MatomoTracker.default)
    );

    // eslint-disable-next-line new-cap
    const instance = new MatomoTracker.default({
      urlBase: MOCK_URL,
      siteId: 'test123',
      srcUrl: 'test.js',
      enabled: true
    });

    const MockProvider = () => (
      <MatomoProvider value={instance}>
        <MockedComponent />
      </MatomoProvider>
    );

    expect(MatomoTracker.default).toHaveBeenCalled();

    render(<MockProvider />);

    expect(trackPageViewMock).toHaveBeenCalledWith({
      href: MOCK_URL
    });
  });
});
