import { Entity, Fields, IdEntity, Validators, remult } from "remult";

@Entity("movements", {
    allowApiCrud: ["superadmin", "admin"],
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

    @Fields.createdAt({
        allowApiUpdate: false,
    })
    createdAt = new Date();

    @Fields.date({
        allowNull: true,
    })
    deletedAt: Date | null = null;
}
