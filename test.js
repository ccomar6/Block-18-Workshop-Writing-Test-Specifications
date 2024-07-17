// Multiplication function
function multiplication(num1, num2) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        throw new Error('Both inputs must be numbers');
    }
    return num1 * num2;
}

// ConcatOdds function
function concatOdds(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        throw new Error("Both inputs must be arrays.");
    }
    const isInteger = (num) => Number.isInteger(num);
    if (![...arr1, ...arr2].every(isInteger)) {
        throw new Error("All elements in the arrays must be integers.");
    }
    const odds = [...arr1, ...arr2].filter(num => num % 2 !== 0);
    return Array.from(new Set(odds)).sort((a, b) => a - b);
}


// ShoppingCart class
class ShoppingCart {
    constructor() {
        this.items = [];
        this.userLoggedIn = false;
    }

    addItem(item) {
        this.items.push(item);
    }

    checkOut() {
        if (this.items.length === 0) {
            return { message: "Your cart is empty", status: false };
        }
        if (!this.userLoggedIn) {
            return { message: "Checkout as guest or log in", status: false };
        }
        return { message: "Proceed to payment", status: true };
    }

    logIn() {
        this.userLoggedIn = true;
        return "Logged in";
    }

    createAccount() {
        this.userLoggedIn = true;
        return "Account created";
    }

    enterShippingInfo(info) {
        if (!info) {
            return { message: "Shipping information is incomplete", status: false };
        }
        return { message: "Shipping information accepted", status: true };
    }

    enterBillingInfo(info) {
        if (!info) {
            return { message: "Billing information is incomplete", status: false };
        }
        return { message: "Billing information accepted", status: true };
    }

    enterPaymentInfo(info) {
        if (!info || info === "invalid") {
            return { message: "Invalid payment details", status: false };
        }
        return { message: "Payment processed", status: true };
    }

    confirmOrder() {
        return { message: "Order confirmed", status: true };
    }
}

// Tests using Jest framework
describe('multiplication function', () => {
    it('returns the product of two input numbers', () => {
        expect(multiplication(2, 3)).toBe(6);
        expect(multiplication(0, 100)).toBe(0);
        expect(multiplication(-2, 5)).toBe(-10);
        expect(multiplication(2, 0.5)).toBe(1);
    });

    it('only accepts numeric inputs', () => {
        expect(() => multiplication(3)).toThrow('Both inputs must be numbers');
        expect(() => multiplication()).toThrow('Both inputs must be numbers');
        expect(() => multiplication("2", 3)).toThrow('Both inputs must be numbers');
        expect(() => multiplication(2, "3")).toThrow('Both inputs must be numbers');
        expect(() => multiplication("2", "3")).toThrow('Both inputs must be numbers');
    });
});

describe('concatOdds function', () => {
    it('returns an array of odd integers, in ascending order, from both input arrays', () => {
        expect(concatOdds([3, 2, 1], [9, 1, 1, 1, 4, 15, -1])).toEqual([-1, 1, 3, 9, 15]);
        expect(concatOdds([1, 2, 3], [4, 5, 6])).toEqual([1, 3, 5]);
        expect(concatOdds([], [1, 3, 5])).toEqual([1, 3, 5]);
        expect(concatOdds([2, 4, 6], [1, 3, 5])).toEqual([1, 3, 5]);
        expect(concatOdds([], [])).toEqual([]);
        expect(concatOdds([1, 3, 5, 5], [5, 7, 9, 9])).toEqual([1, 3, 5, 7, 9]);
    });

    it('throws an error for non-integer inputs', () => {
        expect(() => concatOdds([3, "2", 1], [9, 1, "hello", 1, 4, 15, -1])).toThrow('All elements in the arrays must be integers.');
    });

    it('handles empty and non-numeric inputs', () => {
        expect(concatOdds([], [])).toEqual([]);
        expect(concatOdds([1, 2, 3], [])).toEqual([1, 3]);
        expect(concatOdds([], [4, 5, 6])).toEqual([5]);
        expect(() => concatOdds([1, "hello", 3], [4, NaN, 5])).toThrow('All elements in the arrays must be integers.');
    });

    it('handles duplicates', () => {
        expect(concatOdds([1, 3, 3], [3, 5, 5])).toEqual([1, 3, 5]);
    });
});

describe('ShoppingCart class', () => {
    let cart;

    beforeEach(() => {
        cart = new ShoppingCart();
    });

    test('empty cart checkout', () => {
        const result = cart.checkOut();
        expect(result).toEqual({ message: "Your cart is empty", status: false });
    });

    test('guest checkout', () => {
        cart.addItem("item1");
        const result = cart.checkOut();
        expect(result).toEqual({ message: "Checkout as guest or log in", status: false });
    });

    test('user login checkout', () => {
        cart.addItem("item1");
        cart.logIn();
        const result = cart.checkOut();
        expect(result).toEqual({ message: "Proceed to payment", status: true });
    });

    test('create account checkout', () => {
        cart.addItem("item1");
        cart.createAccount();
        const result = cart.checkOut();
        expect(result).toEqual({ message: "Proceed to payment", status: true });
    });

    test('incomplete shipping info', () => {
        cart.addItem("item1");
        cart.logIn();
        const result = cart.enterShippingInfo("");
        expect(result).toEqual({ message: "Shipping information is incomplete", status: false });
    });

    test('incomplete billing info', () => {
        cart.addItem("item1");
        cart.logIn();
        const result = cart.enterBillingInfo("");
        expect(result).toEqual({ message: "Billing information is incomplete", status: false });
    });

    test('invalid payment info', () => {
        cart.addItem("item1");
        cart.logIn();
        const result = cart.enterPaymentInfo("invalid");
        expect(result).toEqual({ message: "Invalid payment details", status: false });
    });

    test('successful checkout', () => {
        cart.addItem("item1");
        cart.logIn();
        cart.enterShippingInfo("valid shipping info");
        cart.enterBillingInfo("valid billing info");
        const paymentResult = cart.enterPaymentInfo("valid payment info");
        expect(paymentResult).toEqual({ message: "Payment processed", status: true });

        const orderResult = cart.confirmOrder();
        expect(orderResult).toEqual({ message: "Order confirmed", status: true });
    });
});