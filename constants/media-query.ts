export const CHECK_QUERY_TRIES = 2;
export const MEDIA_QUERY_INITIAL_STATE = {
  isScreenLargeDesktop: undefined,
  isScreenDesktop: undefined,
  isScreenTablet: undefined,
  isScreenFrom550: undefined,
  isDeviceMobile: undefined,
  isHover: undefined,
  isBruteCheck: false,
} as {
  isScreenLargeDesktop: boolean | undefined;
  isScreenDesktop: boolean | undefined;
  isScreenTablet: boolean | undefined;
  isScreenFrom550: boolean | undefined;
  isDeviceMobile: boolean | undefined;
  isHover: boolean | undefined;
  isBruteCheck: boolean;
};
