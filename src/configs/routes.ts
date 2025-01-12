export const PAGE_ROUTES = {
  HOME: "/",
  SIGNUP: "/auth/signup",
  LOGIN: "/auth/login",
  MY_REQUESTS: `/my-requests`,
  PENDING_REQUESTS: `/pending-requests`,
  VIEW_ASSISTANCE_OFFER: (id: number) => `/my-requests/${id}`,
};
