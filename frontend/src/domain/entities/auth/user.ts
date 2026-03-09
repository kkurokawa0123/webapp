import { Uid } from "../../value_objects/auth/uid";
import { Provider } from "../../value_objects/auth/provider";
import { Password } from "../../value_objects/auth/password";
import { Email } from "../../value_objects/auth/email";
import { UserName } from "../../value_objects/auth/username";
import { NickName } from "../../value_objects/auth/nickname";
import { Image } from "../../value_objects/auth/image";
import { CreatedDate } from "../../value_objects/auth/createddate";
import { UpdatedDate } from "../../value_objects/auth/updateddate";

export class User {
  private _uid: Uid;
  private _provider: Provider;
  private _password: Password;

  private _userName: UserName;
  private _email: Email;
  private _nickName: NickName;
  private _image: Image;
  private _createdDate: CreatedDate;
  private _updatedDate: UpdatedDate;

  private constructor(
    uid: Uid,
    provider: Provider,
    userName: UserName,
    email: Email,
    password: Password,
    nickName: NickName,
    image: Image,
    createdDate: CreatedDate,
    updatedDate: UpdatedDate,
  ) {
    this._uid = uid;
    this._provider = provider;
    this._userName = userName;
    this._email = email;
    this._password = password;
    this._nickName = nickName;
    this._image = image;
    this._createdDate = createdDate;
    this._updatedDate = updatedDate;
  }

  // 新規エンティティの生成
  static create(
    uid: Uid,
    provider: Provider,
    userName: UserName,
    email: Email,
    password: Password,
    nickName: NickName,
    image: Image,
    createdDate: CreatedDate,
    updatedDate: UpdatedDate,
  ) {
    return new User(
      uid,
      provider,
      userName,
      email,
      password,
      nickName,
      image,
      createdDate,
      updatedDate,
    );
  }

  public delete() {
    // 削除時のロジックがあれば書く
  }

  get userName(): UserName {
    return this._userName;
  }

  get email(): Email {
    return this._email;
  }

  get password(): Password {
    return this._password;
  }

  get uid(): Uid {
    return this._uid;
  }
  get provider(): Provider {
    return this._provider;
  }
  get nickName(): NickName {
    return this._nickName;
  }
  get image(): Image {
    return this._image;
  }
  get createdDate(): CreatedDate {
    return this._createdDate;
  }
  get updatedDate(): UpdatedDate {
    return this._updatedDate;
  }
}
