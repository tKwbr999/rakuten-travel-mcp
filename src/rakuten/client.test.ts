import { simpleHotelSearch, client } from "../../src/rakuten/client";
import axios from "axios";

// axios自体をモックする
jest.mock("axios", () => {
  return {
    create: jest.fn(() => ({
      get: jest.fn(),
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
    })),
  };
});

describe("rakuten/client", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call SimpleHotelSearch API with correct parameters", async () => {
    // clientのgetメソッドをモック
    const mockResponse = { data: { pagingInfo: { recordCount: 10 } } };
    client.get = jest.fn().mockResolvedValue(mockResponse);

    // 関数の実行
    const result = await simpleHotelSearch({
      largeClassCode: "japan",
      middleClassCode: "okinawa",
      smallClassCode: `Miyako`,
    });

    console.log(result);

    // アサーション
    expect(client.get).toHaveBeenCalledTimes(1);
    expect(client.get).toHaveBeenCalledWith("SimpleHotelSearch/20170426", {
      params: expect.objectContaining({
        largeClassCode: "japan",
        middleClassCode: "okinawa",
        smallClassCode: "Miyako",
      }),
    });
    expect(result).toEqual(mockResponse.data);
  });
});
