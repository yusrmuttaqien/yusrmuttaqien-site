import { MEDIA_QUERY_INITIAL_STATE } from '@/constants/media-query';

export type MediaQueryInitialState = {
  isScreenLargeDesktop: boolean | undefined;
  isScreenDesktop: boolean | undefined;
  isScreenTablet: boolean | undefined;
  isScreenFrom550: boolean | undefined;
  isDeviceMobile: boolean | undefined;
  isHover: boolean | undefined;
  isValidated: boolean;
};
