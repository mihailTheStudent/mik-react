import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { loginApi, logoutApi, registerApi } from '../auth.service';
import { removeTokenData, setTokenData } from '../token.service';
import { getUserApi, patchUserApi } from '../user.service';

import type { TPatchUserRequest } from '../user.service';
import type {
  TLoginRequest,
  TLogoutRequest,
  TRegisterRequest,
} from '@/utils/auth.types';
import type { WritableDraft } from '@reduxjs/toolkit';

type TUserStore = {
  isLoading: boolean;
  isError: boolean;
  user: {
    email: string;
    name: string;
  } | null;
};

const initialState: TUserStore = {
  isLoading: false,
  isError: false,
  user: null,
};

export const login = createAsyncThunk('user/login', (data: TLoginRequest) =>
  loginApi(data)
);

export const logout = createAsyncThunk('user/logout', (data: TLogoutRequest) =>
  logoutApi(data)
);

export const register = createAsyncThunk('user/register', (data: TRegisterRequest) =>
  registerApi(data)
);

export const getUser = createAsyncThunk('user/get-user', () => getUserApi());

export const editUser = createAsyncThunk('user/edit-user', (data: TPatchUserRequest) =>
  patchUserApi(data)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    isLoading: (store) => store.isLoading,
    isError: (store) => store.isError,
    user: (store) => store.user,
    isAuthorized: (store) => !!store.user,
  },
  reducers: {
    clean: () => initialState,
  },
  extraReducers: (builder) => {
    const pending = (state: WritableDraft<TUserStore>): void => {
      state.isError = false;
      state.isLoading = true;
    };
    const rejected = (state: WritableDraft<TUserStore>): void => {
      state.isError = true;
      state.isLoading = false;
    };

    builder
      .addCase(login.pending, pending)
      .addCase(login.rejected, rejected)
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, refreshToken, user } = action.payload;
        setTokenData(accessToken, refreshToken);
        state.user = user;
        state.isLoading = false;
      });

    builder
      .addCase(logout.pending, pending)
      .addCase(logout.rejected, () => {
        removeTokenData();
        return initialState;
      })
      .addCase(logout.fulfilled, () => {
        removeTokenData();
        return initialState;
      });

    builder
      .addCase(register.pending, pending)
      .addCase(register.rejected, rejected)
      .addCase(register.fulfilled, (state, action) => {
        const { accessToken, refreshToken, user } = action.payload;
        setTokenData(accessToken, refreshToken);
        state.user = user;
        state.isLoading = false;
      });

    builder
      .addCase(getUser.pending, pending)
      .addCase(getUser.rejected, () => {
        removeTokenData();
        return initialState;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.user = user;
        state.isLoading = false;
      });

    builder
      .addCase(editUser.pending, pending)
      .addCase(editUser.rejected, rejected)
      .addCase(editUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.user = user;
        state.isLoading = false;
      });
  },
});

export const { isLoading, isError, user, isAuthorized } = userSlice.selectors;
export const { clean } = userSlice.actions;
