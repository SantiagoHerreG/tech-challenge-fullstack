import { Entity, Fields, IdEntity, Validators, ValueFilter } from "remult";
import { Movement } from "./Movement";
import { User } from "./User";

@Entity("accounts", {
  allowApiCrud: true,
})
export class Account extends IdEntity {
  @Fields.string({
    validate: Validators.required,
  })
  name = "";

  @Fields.string({
    validate: Validators.required,
  })
  clientName = "";

  @Fields.object<Account>((options, remult) => {
    options.serverExpression = async (acc) => {
      const movementsFiltered = await remult.repo(Movement).find({
        where: { accountId: acc.id },
      });

      const usersInAcc: User[] = [];
      for (let movement of movementsFiltered) {
        if (movement.deletedAt) {
          continue;
        }
        const user = await remult.repo(User).findFirst({
          id: movement.userId,
        });

        if (user && !usersInAcc.find((elem) => elem.id === user.id)) {
          usersInAcc.push(user);
        }
      }
      return usersInAcc;
    };
  })
  users: User[] = [];

  @Fields.createdAt()
  createdAt = new Date();

  @Fields.updatedAt()
  updatedAt = new Date();
}
