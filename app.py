import random

def generate_random_number(start, end):
    """Generate a random number between start and end."""
    return random.randint(start, end)

# Game setup
start = 1
end = 100
random_number = generate_random_number(start, end)
attempts = 0

print(f"Guess the number between {start} and {end}!")

while True:
    try:
        user_guess = int(input("Enter your guess: "))
        attempts += 1

        difference = abs(random_number - user_guess)

        if user_guess < random_number:
            if difference > 10:
                print("The number is higher!")
            else:
                print("The number is high!")
        elif user_guess > random_number:
            if difference > 10:
                print("The number is lower!")
            else:
                print("The number is low!")
        else:
            print(f"Congratulations! You guessed the number {random_number} in {attempts} attempts.")
            break
    except ValueError:
        print("Please enter a valid number.")