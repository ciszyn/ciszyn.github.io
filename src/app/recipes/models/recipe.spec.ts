import { Recipe } from './recipe';

describe('Recipe', () => {
  it('should create an instance', () => {
    expect(new Recipe("title", "text")).toBeTruthy();
  });
});
