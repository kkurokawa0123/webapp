import { describe, it, expect } from "vitest";
import { UserName } from "@/domain/value_objects/auth/user_name";

describe("UserName", () => {
  describe("正常系", () => {
    it("ユーザー名称: 最小1文字", () => {
      const userName = new UserName("t");
      expect(userName.value).toBe("t");
    });
    it("ユーザー名称: 文字数上限 20文字", () => {
      const userName = new UserName("a".repeat(20));
      expect(userName.value).toBe("a".repeat(20));
    });
  });
  describe("異常系", () => {
    it("ユーザー名称: 空文字", () => {
      expect(() => new UserName("")).toThrow("ユーザ名は入力必須です");
    });

    it("ユーザー名称: 文字数超え 20文字オーバー", () => {
      expect(() => new UserName("a".repeat(21))).toThrow(
        "ユーザ名は20字以内で入力してください",
      );
    });
  });
});
