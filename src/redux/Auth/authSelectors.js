export const selectIsOnline = state => state.auth.online;
export const selectUsername = state => state.auth.user.name;
export const selectIsLoading = state => state.auth.isLoading;
export const selectToken = state => state.auth.token;
