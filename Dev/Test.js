class MyClass {
    static One = false;

    constructor() {
        try {
            this.one = MyClass.One;
        } catch (e) {
            alert(`Preferences constructor failed: ${e.message}`);
        }
    }

    static MyMethod() {
        alert("Success!");
    }
}
