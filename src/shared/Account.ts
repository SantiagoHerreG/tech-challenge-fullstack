import { Entity, Fields, Validators } from "remult";
import { validateEmail } from "./utils";

@Entity("accounts", {
  allowApiCrud: true,
})
export class Account {
  @Fields.autoIncrement()
  id = 0;

  @Fields.string({
    validate: Validators.required,
  })
  name = "";

  @Fields.createdAt()
  createdAt = new Date();

  @Fields.updatedAt()
  updatedAt = new Date();
}
