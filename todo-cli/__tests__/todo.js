const todolist = require("../todo");
const {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater
} = todolist();
const formattedDate = (d) =>
{
    return d.toISOString().split("Time")[0];
};
const todaydate = new Date();
const today = formattedDate(todaydate);
const Yday = formattedDate (new Date(new Date().setDate(todaydate.getDate() - 1)),);
const tomorrow = formattedDate (new Date(new Date().setDate(todaydate.getDate() + 1)),);
describe("Todolist Test_Suite", () =>
{
    beforeAll(() =>
    {
        [
            {
                title:"Breakfast",
                completed: false,
                DueDate:Yday,
            },
            {
                title:"lunch",
                completed: false,
                DueDate:today,
            },
            {
                title:"dinner",
                completed: false,
                DueDate:tomorrow,
            },
        ].forEach(add);
    });
test("Add new todo", () =>
{
const C1 = all.length;
expect(all.length).toBe(C1);
add(
    {
        title: "Test todo",
        completed: false,
        DueDate: today,

    }
);
expect(all.length).toBe(C1 + 1);
});
test("todo as complete", () =>
{
    expect(all[1].completed).toBe(false);
markAsComplete(1);
    expect(all[1].completed).toBe(true);
});
test("overDue test",()=>
{
    expect(overdue().length).toBe(1);
});
test ("Duetoday test", ()=>
{
    expect(dueToday().length).toBe(2);
});
test("Duelater test",()=>
{
    expect(dueLater().length).toBe(1);
});
});