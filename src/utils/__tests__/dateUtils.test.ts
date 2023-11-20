import {formatISO, sub, add, Duration} from 'date-fns';

import {dateUtils} from '../dateUtils';

const MOCKED_NOW = 1700488726;

function getDateISO(duration: Duration, op?: 'sub' | 'add'): string {
  op = op || 'sub';
  const time =
    op === 'sub' ? sub(Date.now(), duration) : add(Date.now(), duration);
  const timeISO = formatISO(time);

  return dateUtils.formatRelative(timeISO);
}
describe('dateUtils', () => {
  describe('formatRelative', () => {
    beforeAll(() => {
      jest.spyOn(Date, 'now').mockImplementation(() => MOCKED_NOW);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    test('should be displayed in seconds is less than 1 minute ago', () => {
      expect(getDateISO({seconds: 30})).toBe('30 s');
    });

    test('should be displayed in minutes is less than 1 hour ago', () => {
      expect(getDateISO({minutes: 30})).toBe('30 m');
    });

    test('should be displayed in hours is less than 1 day ago', () => {
      expect(getDateISO({hours: 2})).toBe('2 h');
    });

    test('should be displayed in days is less than 7 day ago', () => {
      expect(getDateISO({days: 3})).toBe('3 d');
    });

    test('should be displayed in weeks is less than 4 weeks ago', () => {
      expect(getDateISO({weeks: 2})).toBe('2 sem');
    });

    test('should be displayed in months is less than 12 months ago', () => {
      expect(getDateISO({months: 1})).toBe('1 mes');
    });

    test('should be displayed in dd/MM/yyyy is more than 12 months ago', () => {
      expect(getDateISO({months: 13})).toBe('20/12/1968');
    });

    test('should be displayed in dd/MM/yyyy is future date', () => {
      expect(getDateISO({days: 2}, 'add')).toBe('22/01/1970');
    });
  });
});
