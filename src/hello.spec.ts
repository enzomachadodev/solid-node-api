import Hello from "@/hello";

it("should say hello", () => {
  const person = new Hello();

  expect(person.sayHello()).toBe("Hello World!");
});
