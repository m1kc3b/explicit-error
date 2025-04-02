// Import the Result class and ResultKind enum
const { Result, ResultKind } = require('./path-to-your-file');

describe('Result Class', () => {
  describe('isOk', () => {
    it('should return true for Ok result', () => {
      const result = Result.Ok(10);
      expect(result.isOk()).toBe(true);
    });

    it('should return false for Err result', () => {
      const result = Result.Err('Error');
      expect(result.isOk()).toBe(false);
    });
  });

  describe('isOkAnd', () => {
    it('should return true for Ok result with matching value', () => {
      const result = Result.Ok(10);
      expect(result.isOkAnd(10)).toBe(true);
    });

    it('should return false for Ok result with non-matching value', () => {
      const result = Result.Ok(10);
      expect(result.isOkAnd(20)).toBe(false);
    });

    it('should return false for Err result', () => {
      const result = Result.Err('Error');
      expect(result.isOkAnd(10)).toBe(false);
    });
  });

  describe('isErr', () => {
    it('should return false for Ok result', () => {
      const result = Result.Ok(10);
      expect(result.isErr()).toBe(false);
    });

    it('should return true for Err result', () => {
      const result = Result.Err('Error');
      expect(result.isErr()).toBe(true);
    });
  });

  describe('isErrAnd', () => {
    it('should return false for Ok result', () => {
      const result = Result.Ok(10);
      expect(result.isErrAnd('Error')).toBe(false);
    });

    it('should return true for Err result with matching error', () => {
      const result = Result.Err('Error');
      expect(result.isErrAnd('Error')).toBe(true);
    });

    it('should return false for Err result with non-matching error', () => {
      const result = Result.Err('Error');
      expect(result.isErrAnd('Different Error')).toBe(false);
    });
  });

  describe('map', () => {
    it('should apply function to Ok value', () => {
      const result = Result.Ok(10);
      const mappedResult = result.map(value => value * 2);
      expect(mappedResult.isOk()).toBe(true);
      expect(mappedResult.unwrap()).toBe(20);
    });

    it('should return Err result unchanged', () => {
      const result = Result.Err('Error');
      const mappedResult = result.map(value => value * 2);
      expect(mappedResult.isErr()).toBe(true);
      expect(() => mappedResult.unwrap()).toThrow('Tried to unwrap Err: Error');
    });
  });

  describe('map_or', () => {
    it('should apply function to Ok value', () => {
      const result = Result.Ok(10);
      const mappedResult = result.map_or(value => value * 2, 0);
      expect(mappedResult).toBe(20);
    });

    it('should return default value for Err result', () => {
      const result = Result.Err('Error');
      const mappedResult = result.map_or(value => value * 2, 0);
      expect(mappedResult).toBe(0);
    });
  });

  describe('mapErr', () => {
    it('should return Ok result unchanged', () => {
      const result = Result.Ok(10);
      const mappedResult = result.mapErr(error => `${error}!`);
      expect(mappedResult.isOk()).toBe(true);
      expect(mappedResult.unwrap()).toBe(10);
    });

    it('should apply function to Err error', () => {
      const result = Result.Err('Error');
      const mappedResult = result.mapErr(error => `${error}!`);
      expect(mappedResult.isErr()).toBe(true);
      expect(() => mappedResult.unwrap()).toThrow('Tried to unwrap Err: Error!');
    });
  });

  describe('unwrap', () => {
    it('should return the value for Ok result', () => {
      const result = Result.Ok(10);
      expect(result.unwrap()).toBe(10);
    });

    it('should throw an error for Err result', () => {
      const result = Result.Err('Error');
      expect(() => result.unwrap()).toThrow('Tried to unwrap Err: Error');
    });
  });

  describe('unwrapOrDefault', () => {
    it('should return the value for Ok result', () => {
      const result = Result.Ok(10);
      expect(result.unwrapOrDefault(0)).toBe(10);
    });

    it('should return the default value for Err result', () => {
      const result = Result.Err('Error');
      expect(result.unwrapOrDefault(0)).toBe(0);
    });
  });
});
