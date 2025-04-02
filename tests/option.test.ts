// Import the Option class and OptionKind enum
import { Option } from '../src/option';

describe('Option Class', () => {
  describe('isSome', () => {
    it('should return true for Some option', () => {
      const option = Option.Some(10);
      expect(option.isSome()).toBe(true);
    });

    it('should return false for None option', () => {
      const option = Option.None();
      expect(option.isSome()).toBe(false);
    });
  });

  describe('isSomeAnd', () => {
    it('should return true for Some option with matching value', () => {
      const option = Option.Some(10);
      expect(option.isSomeAnd(10)).toBe(true);
    });

    it('should return false for Some option with non-matching value', () => {
      const option = Option.Some(10);
      expect(() => option.isSomeAnd(20)).toThrow('Called isSomeAnd on None');
    });

    it('should throw an error for None option', () => {
      const option = Option.None();
      expect(() => option.isSomeAnd(10)).toThrow('Called isSomeAnd on None');
    });
  });

  describe('isNone', () => {
    it('should return false for Some option', () => {
      const option = Option.Some(10);
      expect(option.isNone()).toBe(false);
    });

    it('should return true for None option', () => {
      const option = Option.None();
      expect(option.isNone()).toBe(true);
    });
  });

  describe('isNoneAnd', () => {
    it('should throw an error for Some option', () => {
      const option = Option.Some(10);
      expect(() => option.isNoneAnd(undefined as any)).toThrow('Called isNoneAnd on Some');
    });

    it('should return true for None option', () => {
      const option = Option.None();
      expect(() => option.isNoneAnd(undefined as any)).toThrow('Called isNoneAnd on Some');
    });
  });

  describe('unwrap', () => {
    it('should return the value for Some option', () => {
      const option = Option.Some(10);
      expect(option.unwrap()).toBe(10);
    });

    it('should throw an error for None option', () => {
      const option = Option.None();
      expect(() => option.unwrap()).toThrow('Tried to unwrap None');
    });
  });

  describe('unwrapOrDefault', () => {
    it('should return the value for Some option', () => {
      const option = Option.Some(10);
      expect(option.unwrapOrDefault(0)).toBe(10);
    });

    it('should return the default value for None option', () => {
      const option = Option.None();
      expect(option.unwrapOrDefault(0)).toBe(0);
    });
  });
});
