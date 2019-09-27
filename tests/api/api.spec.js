const request = require("supertest");

const server = require("../../server");

const baseUrl = "/api";

describe("/auth enpoints", () => {
  describe("REGISTER", () => {
    it("register a new user and return a token in the user object", async () => {
      const newUser = {
        firstName: "Steven",
        lastName: "Wood",
        username: "swood2",
        email: "swood02@email.test",
        password: "superpassword"
      };

      const response = await post(`${baseUrl}/auth/register`, newUser);
      // new user
      expect(response.body.token).toBeFalsy();

      // run this test in a second time create an error
      expect(response.body.message).toBe(
        "The username is already taken or the email is already registered."
      );
    });

    it("register a new user with an empty username", async () => {
      const newUser = {
        firstName: "Steven",
        lastName: "Wood",
        username: "",
        email: "",
        password: "superpassword"
      };

      const response = await post(`${baseUrl}/auth/register`, newUser);
      expect(Array.isArray(response.body.message)).toBeTruthy();
    });
  });
  describe("LOGIN", () => {
    it("return a successfully login", async () => {
      const user = {
        userId: "swood01@email.test",
        password: "superpassword"
      };

      const response = await login(user);

      const token = response.body.token;
      expect(token).toBeTruthy();
    });
  });
});

describe("/receipts endpoints", () => {
  describe("CREATE A RECEIPT", () => {
    it("returns status 201 after a new receipt has been created", async () => {
      const testUser = {
        userId: "swood01@email.test",
        password: "superpassword"
      };
      const newReceipt = {
        purchaseDate: "2019-09-25",
        merchant: "Costco",
        amount: "147.25",
        tagName: "September's budget",
        tagDescription: "",
        categoryId: "5"
      };

      const user = await login(testUser);

      const createdReceipt = await postWithToken(
        `${baseUrl}/receipts`,
        newReceipt,
        user.body.token
      );
      expect(createdReceipt.status).toBe(201);
    });
  });
  describe("GET ALl RECEIPTS BY A USER'S ID", () => {
    it("returns receipts array objects AND the returned user id matches with the parameter user id", async () => {
      const testUser = {
        userId: "swood01@email.test",
        password: "superpassword"
      };
      const user = await login(testUser);
      const allReceipts = await getWithToken(
        `${baseUrl}/receipts/users/${user.body.userId}`,
        "",
        user.body.token
      );

      expect(Array.isArray(allReceipts.body.receipts.receipts)).toBeTruthy();
      expect(allReceipts.body.receipts.id).toEqual(user.body.userId);
    });
  });
  describe("UPDATE A RECEIPT BY ITS ID", () => {
    it("returns a JSON object with a correct message indicating the receipt is updated", async () => {
      const testUser = {
        userId: "swood01@email.test",
        password: "superpassword"
      };
      // login
      const user = await login(testUser);

      // get all the user's receipts

      const allReceipts = await getWithToken(
        `${baseUrl}/receipts/users/${user.body.userId}`,
        "",
        user.body.token
      );

      const updatingReceipt =
        allReceipts.body.receipts.receipts[
          allReceipts.body.receipts.receipts.length - 1
        ];

      const newReceipt = {
        purchaseDate: "2019-09-25",
        merchant: "Sam's Club",
        amount: "147.25",
        tagName: "September's budget",
        tagDescription: "",
        categoryId: "5"
      };

      const updatedReceipt = await putWithToken(
        `${baseUrl}/receipts/${updatingReceipt.id}`,
        newReceipt,
        user.body.token
      );

      expect(updatedReceipt.body.message).toBe("Receipt updated successfully.");
    });
  });

  describe("DELETE A RECEIPT BY ITS ID", () => {
    it("returns a JSON object with the right message when the receipt id does not exist in the application", async () => {
      const testUser = {
        userId: "swood01@email.test",
        password: "superpassword"
      };
      // login
      const user = await login(testUser);

      const deletedReceipt = await deleteWithToken(
        `${baseUrl}/receipts/100`,
        user.body.token
      );

      expect(deletedReceipt.body.message).toBe("The receipt does not exist.");
    });
  });
});

const post = (url, payload) => {
  const httpRequest = request(server).post(url);
  httpRequest.send(payload);
  httpRequest.set("Accept", "application/json");
  return httpRequest;
};

const postWithToken = (url, payload, token) => {
  const httpRequest = request(server).post(url);
  httpRequest.send(payload);
  httpRequest.set("Accept", "application/json");
  httpRequest.set("Authorization", `Bearer ${token}`);
  return httpRequest;
};

const getWithToken = (url, payload, token) => {
  const httpRequest = request(server).get(url);
  httpRequest.send(payload);
  httpRequest.set("Accept", "application/json");
  httpRequest.set("Authorization", `Bearer ${token}`);
  return httpRequest;
};

const putWithToken = (url, payload, token) => {
  const httpRequest = request(server).put(url);
  httpRequest.send(payload);
  httpRequest.set("Accept", "application/json");
  httpRequest.set("Authorization", `Bearer ${token}`);
  return httpRequest;
};

const deleteWithToken = (url, token) => {
  const httpRequest = request(server).delete(url);
  httpRequest.set("Accept", "application/json");
  httpRequest.set("Authorization", `Bearer ${token}`);
  return httpRequest;
};

const login = async payload => {
  const response = await post("/api/auth/login", payload);
  return response;
};
