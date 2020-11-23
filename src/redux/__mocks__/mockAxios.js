import MockAdapter from "axios-mock-adapter";
import mockAuth from "../../app/modules/Auth/__mocks__/mockAuth";
import mockCities from "../../app/modules/Weather/__mocks__/mockCity";

export default function mockAxios(axios) {
  const mock = new MockAdapter(axios, { delayResponse: 300, onNoMatch: "passthrough" });
  mockAuth(mock);
  mockCities(mock)
  return mock;
}
