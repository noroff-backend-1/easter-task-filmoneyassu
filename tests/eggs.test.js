const request = require("supertest");
const app = require("../app");
const { generateToken } = require("../middlewares/auth");

const userToken = generateToken({ id: 2, username: "user", role: "user" });
const adminToken = generateToken({ id: 1, username: "admin", role: "admin" });

describe("Eggs API", () => {
  let eggId;

test("GET /eggs - should return list of eggs and status 200", async () => {
  const res = await request(app).get("/eggs");

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("Success");
  expect(Array.isArray(res.body.eggs)).toBe(true);
});

  test("GET /eggs - with valid token should succeed", async () => {
    const res = await request(app)
      .get("/eggs")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.eggs).toBeDefined();
  });

  test("POST /eggs - create egg", async () => {
    const res = await request(app)
      .post("/eggs")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ color: "red", weight: 2.5 });

    expect(res.statusCode).toBe(201);
    expect(res.body.color).toBe("red");

    eggId = res.body.id;
  });

  test("GET /eggs/:id - should return egg", async () => {
    const res = await request(app)
      .get(`/eggs/${eggId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(eggId);
  });

  test("PUT /eggs/:id - update egg", async () => {
    const res = await request(app)
      .put(`/eggs/${eggId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ color: "blue", weight: 3.0 });

    expect(res.statusCode).toBe(200);
    expect(res.body.color).toBe("blue");
  });

  test("DELETE /eggs/:id - delete egg", async () => {
    const res = await request(app)
      .delete(`/eggs/${eggId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("DELETED");
  });

  test("DELETE /eggs/:id again - should return 404", async () => {
    const res = await request(app)
      .delete(`/eggs/${eggId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(404);
  });
});