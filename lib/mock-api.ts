import type { Story, Traveller } from '@/types';
import { currentUser, savedStoryIds, stories } from './mock-data';

// temporary mock api for the profile page until auth is ready
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getCurrentUser(): Promise<Traveller> {
  await delay(200);
  return currentUser;
}

export async function getMyStories(): Promise<Story[]> {
  await delay(400);
  return stories.filter(s => s.ownerId === currentUser._id);
}

export async function getSavedStories(): Promise<Story[]> {
  await delay(400);
  return stories.filter(s => savedStoryIds.includes(s._id));
}
