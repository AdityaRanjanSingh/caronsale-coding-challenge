import { TransformTransmissionPipe } from './transform-transmission.pipe';

describe('TransformTransmissionPipe', () => {
  it('create an instance', () => {
    const pipe = new TransformTransmissionPipe();
    expect(pipe).toBeTruthy();
  });
  it('should identify Automatic', () => {
    const pipe = new TransformTransmissionPipe();
    let response = pipe.transform(0)
    expect(response).toBe('Automatic');
  });
  it('should identify Manual', () => {
    const pipe = new TransformTransmissionPipe();
    let response = pipe.transform(1)
    expect(response).toBe('Manual');
  });
});
