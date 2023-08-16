import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST /weather", () => {
  it("should return 'City is required!' if cityName is missing", async () => {
    const response = await request.post('/weather').send({
      cityName: ""
    });

    expect(response.status).toBe(400);
    expect(response.body.weatherText).toBe("City is required!");
  });
  it("should return 'City is not found!' if cityName is gibberish", async () => {
    const response = await request.post('/weather').send({
      cityName: "skdhfjkhdh"
    });

    expect(response.status).toBe(404);
    expect(response.body.weatherText).toBe("City is not found!");
  });
  it("should return temperature for a valid city name", async () => {
    const response = await request.post('/weather').send({
      cityName: "Den Haag"
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("cityName", "Den Haag");
    expect(response.body).toHaveProperty("temperature");
  });

});

