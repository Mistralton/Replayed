import { writable } from 'svelte/store';

export const signedStatus = writable(false);

export const game = writable("");