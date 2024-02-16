import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
const isRead = true;
const id = localStorage.getItem("id");
export const unreadNotification = createAsyncThunk(
  "unreadNotification",
  async () => {
    try {
      const data = await axios.get(
        `http://localhost:8080/superAdmin/notification/list/unread/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const viewParticularNotification = createAsyncThunk(
  "viewParticularNotification",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/superAdmin/notification/view/${id}`,
        isRead,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(id, "id");
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const notificationCount = createAsyncThunk(
  "notificationCount",
  async () => {
    try {
      const data = await axios.get(
        `http://localhost:8080/superAdmin/notification/count/unread/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "deleteNotification",
  async (id) => {
    try {
      const response = axios.delete(
        `http://localhost:8080/superAdmin/notification/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const readNotification = createAsyncThunk(
  "readNotification",
  async () => {
    try {
      const data = axios.get(
        `http://localhost:8080/superAdmin/notification/list/read/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
);
const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState: {
    loading: false,
    unreadNotificationCount: null,
    unreadNotificationList: null,
    viewNotification: null,
    deletedNotificationList: null,
    readNotificationList: null,
    isError: false,
  },

  extraReducers: (builder) => {
    // --------------Unread Notification -----------------
    builder.addCase(unreadNotification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(unreadNotification.fulfilled, (state, action) => {
      state.loading = false;
      state.unreadNotificationList = action.payload.data.List;
      // state.unreadNotificationCount = action.payload.data.count;
    });
    builder.addCase(unreadNotification.rejected, (state) => {
      state.isError = true;
    });
    // ------------------- View Particular Notification -----------------
    builder.addCase(viewParticularNotification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(viewParticularNotification.fulfilled, (state, action) => {
      state.loading = false;
      state.viewNotification = action.payload.data.notification;
      // state.unreadNotificationCount = action.payload.data.count;
    });
    builder.addCase(viewParticularNotification.rejected, (state) => {
      state.isError = true;
    });
    // --------------Unread Notification Count -------------
    builder.addCase(notificationCount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(notificationCount.fulfilled, (state, action) => {
      state.loading = false;
      state.unreadNotificationCount = action.payload.data.count;
    });
    builder.addCase(notificationCount.rejected, (state) => {
      state.isError = true;
    });
    // ------------Deleted Notification ----------------
    builder.addCase(deleteNotification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteNotification.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedNotificationList = action.payload;
    });
    builder.addCase(deleteNotification.rejected, (state) => {
      state.isError = true;
    });
    // ------------Read Notification ----------------
    builder.addCase(readNotification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readNotification.fulfilled, (state, action) => {
      state.loading = false;
      state.readNotificationList = action.payload.data.List;
    });
    builder.addCase(readNotification.rejected, (state) => {
      state.isError = true;
    });
  },
});

export default notificationSlice.reducer;
