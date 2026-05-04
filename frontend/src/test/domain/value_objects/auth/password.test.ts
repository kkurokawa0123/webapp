import { describe, it, expect } from "vitest";
import { Password } from "@/domain/value_objects/auth/password";

// パスワードはA-Z 、 a-zをそれぞれ1文字以上使用した最大12文字以内
describe("Password", () => {
  it("正常系:Password-入力値", () => {
    const password = new Password("Password12");
    expect(password.value).toBe("Password12");
  });
  it("正常系:Password-入力値 最小8文字", () => {
    const password = new Password("Password");
    expect(password.value).toBe("Password");
  });
  it("正常系:Password-入力値 最大12文字", () => {
    const password = new Password("P" + "a".repeat(11));
    expect(password.value).toBe("P" + "a".repeat(11));
  });
  it("異常系:Password-入力値 文字数不足 文字数7", () => {
    expect(() => new Password("P" + "a".repeat(6))).toThrow(
      "パスワードは大文字（A–Z）と小文字を（a–z）を含んだ8文字以上13文字未満で設定してください",
    );
  });
  it("異常系:Password-入力値 文字数オーバー 文字数13", () => {
    expect(() => new Password("P" + "a".repeat(12))).toThrow(
      "パスワードは大文字（A–Z）と小文字を（a–z）を含んだ8文字以上13文字未満で設定してください",
    );
  });
  it("異常系:Password-入力値 すべて大文字", () => {
    expect(() => new Password("A".repeat(10))).toThrow(
      "パスワードは大文字（A–Z）と小文字を（a–z）を含んだ8文字以上13文字未満で設定してください",
    );
  });
  it("異常系:Password-入力値 すべて小文字", () => {
    expect(() => new Password("a".repeat(10))).toThrow(
      "パスワードは大文字（A–Z）と小文字を（a–z）を含んだ8文字以上13文字未満で設定してください",
    );
  });
});
