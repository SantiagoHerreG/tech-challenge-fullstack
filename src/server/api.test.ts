import { remult } from "remult";
import { User } from "../shared/User";
const chai = require("chai");
const sinon = require("sinon");
import { faker } from "@faker-js/faker";
import { Account } from "../shared/Account";
const expect = chai.expect;

const UserRepository = remult.repo(User);
const AccountRepository = remult.repo(Account);

describe("UserRepository", function () {
    const stubValue = {
        id: faker.string.uuid(),
        name: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
    };
    describe("insert", function () {
        it("should add a new user to the db", async function () {
            const stub = sinon
                .stub(UserRepository, "insert")
                .returns(stubValue);
            const user = await UserRepository.insert({
                ...stubValue,
            });
            expect(stub.calledOnce).to.be.true;
            expect(user.id).to.equal(stubValue.id);
            expect(user.name).to.equal(stubValue.name);
            expect(user.email).to.equal(stubValue.email);
            expect(user.password).to.equal(stubValue.password);
            expect(user.createdAt).to.equal(stubValue.createdAt);
            expect(user.updatedAt).to.equal(stubValue.updatedAt);
        });
    });

    describe("update", function () {
        it("should edit an user in the db", async function () {
            const stub = sinon.stub(UserRepository, "save").returns(stubValue);
            const user = await UserRepository.save({
                ...stubValue,
            });
            expect(stub.calledOnce).to.be.true;
            expect(user.id).to.equal(stubValue.id);
            expect(user.name).to.equal(stubValue.name);
            expect(user.email).to.equal(stubValue.email);
            expect(user.password).to.equal(stubValue.password);
            expect(user.createdAt).to.equal(stubValue.createdAt);
            expect(user.updatedAt).to.equal(stubValue.updatedAt);
        });
    });
});

describe("AccountRepository", function () {
    const stubValue = {
        id: faker.string.uuid(),
        name: faker.internet.userName(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
    };
    describe("insert", function () {
        it("should add a new account to the db", async function () {
            const stub = sinon
                .stub(AccountRepository, "insert")
                .returns(stubValue);
            const user = await AccountRepository.insert({
                ...stubValue,
            });
            expect(stub.calledOnce).to.be.true;
            expect(user.id).to.equal(stubValue.id);
            expect(user.name).to.equal(stubValue.name);
            expect(user.createdAt).to.equal(stubValue.createdAt);
            expect(user.updatedAt).to.equal(stubValue.updatedAt);
        });
    });

    describe("update", function () {
        it("should save the edited info for Account to the db", async function () {
            const stub = sinon
                .stub(AccountRepository, "save")
                .returns(stubValue);
            const user = await AccountRepository.save({
                ...stubValue,
            });
            expect(stub.calledOnce).to.be.true;
            expect(user.id).to.equal(stubValue.id);
            expect(user.name).to.equal(stubValue.name);
            expect(user.createdAt).to.equal(stubValue.createdAt);
            expect(user.updatedAt).to.equal(stubValue.updatedAt);
        });
    });
});
