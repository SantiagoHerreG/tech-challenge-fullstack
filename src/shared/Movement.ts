import { Entity, Fields, remult } from "remult";

@Entity("movements", {
  allowApiCrud: true,
  allowApiDelete: false,
})
export class Movement {
  @Fields.autoIncrement()
  id = 0;

  @Fields.number({
    validate: (movement) => {
      if (Number.isNaN(movement.userId) || movement.userId <= 0) {
        throw new Error("User is not valid");
      }
    },
  })
  userId = 0;

  @Fields.number({
    validate: (movement) => {
      if (Number.isNaN(movement.accountId) || movement.accountId <= 0) {
        throw new Error("Account is not valid");
      }
    },
  })
  accountId = 0;

  @Fields.createdAt()
  createdAt = new Date();

  @Fields.date({
    allowNull: true,
  })
  deletedAt = null;
}
