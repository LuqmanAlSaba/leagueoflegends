const { getDiffColor } = require('../commands/standings');

test('returns color based on team map difference', () => {
  expect(getDiffColor(40)).toBe('#28b455');
});

test('returns color based on team map difference', () => {
  expect(getDiffColor(-6)).toBe('#cc4939');
});

test('returns color based on team map difference', () => {
  expect(getDiffColor(0)).toBe('#e2e2e2');
});
