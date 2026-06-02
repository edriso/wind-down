import { beforeEach, describe, expect, it } from 'vitest';
import { createLocalStorageRepository, type Repository } from './repository';

function memoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (k: string) => map.get(k) ?? null,
    key: (i: number) => Array.from(map.keys())[i] ?? null,
    removeItem: (k: string) => {
      map.delete(k);
    },
    setItem: (k: string, v: string) => {
      map.set(k, v);
    },
  } as Storage;
}

describe('repository', () => {
  let repo: Repository;
  let storage: Storage;
  beforeEach(() => {
    storage = memoryStorage();
    repo = createLocalStorageRepository(storage);
  });

  it('returns defaults when empty', () => {
    expect(repo.getState().settings.bedtime).toBe('22:30');
  });
  it('falls back to defaults on corrupt data', () => {
    storage.setItem('winddown-v1', 'nope');
    expect(repo.getState().settings.accent).toBe('#8a8fc4');
  });
  it('round-trips settings', () => {
    repo.setSettings({ bedtime: '23:00' });
    expect(repo.getState().settings.bedtime).toBe('23:00');
  });
});
