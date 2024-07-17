# Block-18-Workshop-Writing-Test-Specifications
Functional test specifications can be worded slightly more naturally:

When a user [does something with some parameters], [some thing should happen]
Example: For the prompt was "A login and signup page that allows Single Sign-On with Google", your tests might include:
When a user clicks "Log In" without filling in any information, they should be shown an error and prompted to sign up if they have not yet.
When a user clicks "Log In" but has filled out an incorrect login or password, they should be shown an error and prompted to sign up if they have not yet.
When a user clicks "Log In" and has filled in their login and password correctly, they should be taken to their dashboard.
When a user clicks "Create Account" without filling in any information, they should be shown an error.
When a user clicks "Create Account" with an invalid email address or password, they should be shown an error.
When a user clicks the "Sign Up with Google" button, they should be taken through the Google authentication process.
When a user clicks "Log In with Google", they should be logged in through Google, or taken through the Google authentication process if they do not already have an account.
Prompts: 
For each prompt below: 

Read the prompt.
Identify the expectations.
Write specifications in pseudocode/plain English for all the tests that would be useful for that prompt.
Try to take any "edge cases," or unexpected circumstances, into account, and write test specs for them.
Try not to write extraneous tests!
Unit Tests:
A function called "multiplication" that returns the product of the two input numbers.

A function called "concatOdds" takes two arrays of integers as arguments. It should return a single array that only contains the odd numbers, in ascending order, from both of the arrays.
Example: concatOdds([3, 2, 1], [9, 1, 1, 1, 4, 15, -1])
...should result in [-1, 1, 3, 9, 15]
Think about the following; you may need to make assumptions or decisions about the prompt and how the code should behave:
What should happen with unexpected inputs?
What kinds of unexpected inputs should we worry about?
What should happen when there are multiples of the same odd number in the arrays? (Hint: We gave you the answer to this one in the example above.)
Functional Tests:
A shopping cart checkout feature that allows a user to check out as a guest (without an account), or as a logged-in user. They should be allowed to do either, but should be asked if they want to create an account or log in if they check out as a guest.
Think about the following; you may need to make assumptions or decisions about the prompt and how the feature should behave:
What should happen if the cart is empty?
What needs to be shown to the user at each step of check out?
What behaviors of this feature does the prompt miss or gloss over?
Hint: Observe the shopping cart and checkout features of some popular websites to get some ideas!
