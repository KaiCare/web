# KAICare
KAICare is a compassionate haven where cutting-edge technology and empathetic care converge. Led by our AI companion, KAI the koala, we empower patients on their healing journey.

## About the team
This application has been created by 5 engineers, below you will see our names and roles. 
- Si Qiang Wu Yang [LinkedIn](https://www.linkedin.com/in/siqiangwu) []() as Computer Vision Developer & Design 
- 

## Tecnologies

- Tailwind: Design, animations and effects
- Clerk: Authentication with Google, Apple & MetaMask
- Web3: Use of authentication through MetaMask
- MongoDB:
- AWS: To store the MongoDB instance
- BKS: 
- LLM: 


## Ejecuting the project 
In order to run the program, the following steps must be performed. 

### Cloning the repository
~~~
git clone https://github.com/KaiCare/web.git 
cd web
~~~

### Install packages
The packages needed to run KAICare are going to be updated and installed using npm
~~~
npm install
~~~
If the previous command gives an error, it is probably because you do not have npm installed.

### Setup .env file
To facilitate the creation of the .env file with the necessary data to run KAICare we have created a configuration.py file that checks if the .env file is already created and if not it creates it with all the necessary information inside. 
~~~
python3 configuration.py
~~~

### Start the app
~~~
npm run dev
~~~
