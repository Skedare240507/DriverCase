import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const SESSION_KEY = "velocity_atlas_session";

export const getSessionId = () => {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID
      ? crypto.randomUUID()
      : `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
};

export const api = {
  submitInquiry: (payload) =>
    axios.post(`${API}/inquiries`, payload).then((r) => r.data),
  addFavorite: (carSlug, brandSlug) =>
    axios
      .post(`${API}/favorites`, {
        session_id: getSessionId(),
        car_slug: carSlug,
        brand_slug: brandSlug,
      })
      .then((r) => r.data),
  removeFavorite: (carSlug) =>
    axios
      .delete(`${API}/favorites/${getSessionId()}/${carSlug}`)
      .then((r) => r.data),
  listFavorites: () =>
    axios.get(`${API}/favorites/${getSessionId()}`).then((r) => r.data),
};
