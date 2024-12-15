export const PAGE_ROUTES = {
  HOME: "/",
  SIGNUP: "/auth/signup",
  LOGIN: "/auth/login",
  MY_REQUESTS: `/my-requests`,
  VIEW_ASSISTANCE_OFFER: (id: number) => `/my-requests/${id}`,
};
