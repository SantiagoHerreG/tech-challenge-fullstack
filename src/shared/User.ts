import { Allow, Entity, Fields, IdEntity, Validators, remult } from "remult";
import { validateEmail } from "./utils";

@Entity("users", {
  allowApiCrud: true,
})
export class User extends IdEntity {
  @Fields.string({
    validate: Validators.required,
  })
  name = "";

  @Fields.string({
    validate: (user) => {
      if (!validateEmail(user.email)) {
        throw new Error("Invalid email");
      }
    },
    // TODO: handle with auth
    // allowApiUpdate: ["admin"]
  })
  email = "";

  @Fields.string({
    validate: Validators.required,
  })
  password = "";

  @Fields.string()
  englishLevel = "";

  @Fields.string()
  cvLink = "";

  @Fields.string()
  knowledge = "";

  @Fields.createdAt()
  createdAt = new Date();

  @Fields.updatedAt()
  updatedAt = new Date();

  @Fields.string({
    validate: (user) => {
      if (!user.role || !["superadmin", "admin", "user"].includes(user.role)) {
        throw new Error("Role is not valid");
      }
    },
    // TODO add auth
    // allowApiUpdate: ["admin"]
  })
  role = "user";
}

export async function seed() {
  const userRepo = remult.repo(User);
  if ((await userRepo.count()) === 0) {
    await userRepo.insert([
      {
        name: "Jhon Doe",
        email: "jdoe@arkus.com",
        password: "1234",
        role: "superadmin",
      },
    ]);
  }
}
