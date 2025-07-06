import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
   setActiveSong: (state, action) => {
    state.activeSong = action.payload.song;
    state.currentSongs = action.payload.data;
    state.currentIndex = action.payload.i;
  },
    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },
    nextSong: (state, action) => {
      state.currentIndex += 1;
      state.activeSong = state.currentSongs[state.currentIndex];
    },
    prevSong: (state, action) => {
      state.currentIndex -= 1;
      state.activeSong = state.currentSongs[state.currentIndex];
    },
  },
});

export const { setActiveSong, playPause, nextSong, prevSong } = playerSlice.actions;
export default playerSlice.reducer;
