import { Entity, Fields, IdEntity, Validators, remult } from "remult";

@Entity("movements", {
  allowApiCrud: true,
  allowApiDelete: false,
  allowApiUpdate: false,
})
export class Movement extends IdEntity {
  @Fields.string({
    validate: Validators.required,
  })
  userId = "";

  @Fields.string({
    validate: Validators.required,
  })
  accountId = "";

  @Fields.createdAt()
  createdAt = new Date();

  @Fields.date({
    allowNull: true,
  })
  deletedAt: Date | null = null;
}
