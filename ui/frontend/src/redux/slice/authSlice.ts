import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  userType: string | null;
  isAuthenticated: boolean;
}

const getStoredItem = (key: string) => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  try {
    return JSON.parse(item);
  } catch {
    return item;
  }
};

const initialState: AuthState = {
  token: getStoredItem('token'),
  userType: getStoredItem('userType'),
  isAuthenticated: !!getStoredItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; userType: string }>) => {
      state.token = action.payload.token;
      state.userType = action.payload.userType;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userType', action.payload.userType);
    },
    clearAuth: (state) => {
      state.token = null;
      state.userType = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;