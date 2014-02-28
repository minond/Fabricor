describe("user models", function () {
    var user;

    beforeEach(function () {
        user = new User;
    });

    it("should be an instance of a User", function () {
        expect(user instanceof User).toBe(true);
    });

    it("should should take a name", function () {
        user = new User("Marcos");
        expect(user.name).toBe(user.name)
    });
});
