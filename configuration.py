import os



def create_env_file():
    env_filename = ".env"

    # Check if the file already exists
    if os.path.isfile(env_filename):
        print(f"The '{env_filename}' file already exists.")
    else:
        # Create the .env file
        with open(env_filename, "w") as env_file:
            env_file.write('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dWx0aW1hdGUtbWFydGVuLTkzLmNsZXJrLmFjY291bnRzLmRldiQ \n CLERK_SECRET_KEY=sk_test_3x4w1NcdMfC9w1eaCkQ6OamaynoipzJQEsCjUIs3Bb \n NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in \n  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up \n NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard \n NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard \n NEXT_PUBLIC_APP_URL="http://localhost:3000"\n')
        print(f"'{env_filename}' file created.")


# Call the function to create or check the .env file
create_env_file()