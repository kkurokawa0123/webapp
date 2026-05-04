import { describe, it, expect } from "vitest";
import { UserName } from "@/domain/value_objects/auth/username";

describe("UserName", () => {
  it("正常系:ユーザー名称-入力値 最小1文字", () => {
    const userName = new UserName("t");
    expect(userName.value).toBe("t");
  });
  it("正常系:ユーザー名称-文字数上限 20文字", () => {
    const userName = new UserName("a".repeat(20));
    expect(userName.value).toBe("a".repeat(20));
  });

  it("異常系:ユーザー名称:空文字", () => {
    expect(() => new UserName("")).toThrow("ユーザ名は入力必須です");
  });

  it("異常系:ユーザー名称:文字数超え 20文字オーバー", () => {
    expect(() => new UserName("a".repeat(21))).toThrow(
      "ユーザ名は20字以内で入力してください",
    );
  });
});
