import { Entity, Fields, Validators } from "remult";
import { validateEmail } from "./utils";

@Entity("users", {
  allowApiCrud: true,
})
export class User {
  @Fields.autoIncrement()
  id = 0;

  @Fields.string({
    validate: Validators.required,
  })
  name = "";

  @Fields.string({
    validate: (user) => {
      if (!validateEmail(user)) {
        throw new Error("Invalid email");
      }
    },
  })
  email = "";

  @Fields.string({
    validate: Validators.required,
  })
  password = "";

  @Fields.createdAt()
  createdAt = new Date();

  @Fields.updatedAt()
  updatedAt = new Date();
}
