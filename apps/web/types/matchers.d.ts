// biome-ignore lint/correctness/noUnusedImports: <explanation>
import { AsymmetricMatchers, Matchers } from 'bun:test';
// biome-ignore lint/style/useImportType: <explanation>
import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'bun:test' {
  interface Matchers<T>
    extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  interface AsymmetricMatchers extends TestingLibraryMatchers {}
}
