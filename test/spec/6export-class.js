import sayhi from 'test/js/6export-class';

window.describe('ES6 Class Export - Test suite', () => {
  it('first is `Monark`', () => {
    expect(sayhi.first).to.equal('Monark');
  });

  it('last is `Total`', () => {
    expect(sayhi.last).to.equal('Total');
  });

  it('toString is `Monark Total`', () => {
    expect(sayhi.toString()).to.equal('Monark Total');
  });
});
