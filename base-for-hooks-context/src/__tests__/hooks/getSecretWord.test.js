import getSecretWord from "../../hooks/getSecretWord";
import moxios from "moxios";

describe("get word with moxios", () => {
  // Mocks
  const secretWordMock = "party";

  // Setup
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("get secret word correctly", (done) => {
    // Mocks
    moxios.wait(() => {
      const res = moxios.requests.mostRecent();
      res.respondWith({
        status: 200,
        response: secretWordMock,
      });
    });

    const setSecretWordMock = jest.fn();

    // expect
    getSecretWord(setSecretWordMock)
      .then(() => {
        expect(setSecretWordMock).toHaveBeenCalledWith(secretWordMock);
      })
      .finally(() => {
        done();
      });
  });
});
