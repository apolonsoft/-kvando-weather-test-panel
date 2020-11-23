import cityTableMock from "./cityTableMock";
import MockUtils from "./mock.utils";

export default function mockCities(mock) {
  mock.onPost("api/cities").reply(({ data }) => {
    const { city } = JSON.parse(data);
    const {
      name = "",
      country = "",
      population = 0,
      color = "Black",
      status = 0,
    } = city;

    const id = generateCityId();
    const newCity = {
      id,
      name,
      country,
      population,
      color,
      status,
    };
    cityTableMock.push(newCity);
    return [200, { city: newCity }];
  });

  mock.onPost("api/cities/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filteredCities = mockUtils.baseFilter(cityTableMock, queryParams);
    return [200, filteredCities];
  });

  mock.onPost("api/cities/deleteCities").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = cityTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        cityTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/cities/updateStatusForCities").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    cityTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/cities\/\d+/).reply(config => {
    const id = config.url.match(/api\/cities\/(\d+)/)[1];
    const city = cityTableMock.find(el => el.id === +id);
    if (!city) {
      return [400];
    }

    return [200, city];
  });

  mock.onPut(/api\/cities\/\d+/).reply(config => {
    const id = config.url.match(/api\/cities\/(\d+)/)[1];
    const { city } = JSON.parse(config.data);
    const index = cityTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    cityTableMock[index] = { ...city };
    return [200];
  });

  mock.onDelete(/api\/cities\/\d+/).reply(config => {
    const id = config.url.match(/api\/cities\/(\d+)/)[1];
    const index = cityTableMock.findIndex(el => el.id === +id);
    cityTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateCityId() {
  const ids = cityTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
