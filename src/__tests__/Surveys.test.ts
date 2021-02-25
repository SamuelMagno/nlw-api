
import request from "supertest"
import { app } from "../app"

import createConnection from '../database'

describe("Surveys", () =>{
  beforeAll(async() => {
    const connection = await createConnection();
    await connection.runMigrations();
  })

  it("Should be able to create a new survey", async () => {
    const response = await request(app).post("/surveys").send({
      description: "First survey test",
      title: "Default Survey"
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
  })

  it("Should be able to get all surveys", async() => {
    await request(app).post("/surveys").send({
      description: "Second survey test",
      title: "Custom Survey"
    })

    const response = await request(app).get("/surveys")

    expect(response.body.length).toBe(2)
  })

  afterAll(async() => {
    const connection = await createConnection()
    await connection.undoLastMigration()
  })

})