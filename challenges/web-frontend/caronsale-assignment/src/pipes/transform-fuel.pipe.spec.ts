import { TransformFuelPipe } from './transform-fuel.pipe';

describe('TransformFuelPipe', () => {
  it('create an instance', () => {
    const pipe = new TransformFuelPipe();
    expect(pipe).toBeTruthy();
  });
  it('should identify petrol', () => {
    const pipe = new TransformFuelPipe();
    let response = pipe.transform(0)
    expect(response).toBe('Petrol');
  });
  it('should identify Diesel', () => {
    const pipe = new TransformFuelPipe();
    let response = pipe.transform(1)
    expect(response).toBe('Diesel');
  });
  it('should identify Gas', () => {
    const pipe = new TransformFuelPipe();
    let response = pipe.transform(2)
    expect(response).toBe('Gas');
  });
});
