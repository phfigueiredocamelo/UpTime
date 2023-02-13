The project main objective is to create a app based on test rules:
 
## Business Rules
* In order to allow our professionals to manage their availability we need a system that manages slots of time
* Professionals need to set which days of the week they are going to be available and interval of time for each day
* Each slot has a duration of 1 hour and contains two availability periods of 30 minutes, Example: a professional that is going to be available Mondays from 8am to 11am will have all this slots:

	8:00am | 8:30am | 9:00am | 9:30am | 10:00am

* When a customer books a session we need to block slots in order to not have conflicts with other customers trying to book sessions at the same time. Looking at the example above if a client books a session starting 8:30am, professional will not be available at 8:30am and 9:00am since every session has a 1 hour duration

# Get Started

## Install following dependencies
* Docker
* Docker Compose
* NPM

## Testing
* Run `npm i` and then `npm run test`

## Running
Execute in order the following commands under root directory:
`npm i` (if don't yet) , `docker-compose build` and `docker-compose up`
Once averything is up go to play!

## Play
The main object here is to provide a way to date a Dungeon for two entities (Curandeira e Guerreiro). Once you have created a Curandeira you can call for available time slots. After that you can create a Guerreiro and than call endpoint Agendamentos to finally date a Dungeon given entities "id's", date and time slot option.

All endpoint calls is described below in order as CURL for convenience:

> Don't forget `apelidoGuerreiro`, `apelidoCurandeira` and an available option (a period) to give those for to create a Doungeon

### Create Curandeira
`onlineEntre`: describes a period witch Curandeira will be online every day. This example is 8:30 until 12:30.
```
curl --location --request POST 'localhost:3000/curandeiras' \
--header 'Content-Type: application/json' \
--data-raw '{
	"nome": "Adelaide",
	"sobrenome": "Hozz",
	"onlineEntre": {
		"inicio": {  "hora": 8,  "minuto": 30  },
		"fim": {  "hora": 12,  "minuto": 30  }
	}
}'
```
### List available options from Curandeira
```
curl --location --request GET 'localhost:3000/curandeiras/{apelidoCurandeira}/disponibilidades?data=2023-02-13'
```
### Create Guerreiro
```
curl --location --request POST 'localhost:3000/guerreiros' \
--header 'Content-Type: application/json' \
--data-raw '{
	"nome": "teste",
	"sobrenome": "teste"
}'
```
### Date a Dungeon
```
curl --location --request POST 'localhost:3000/agendamentos' \
--header 'Content-Type: application/json' \
--data-raw '{
	"apelidoGuerreiro": "GUR_ea10e2f6-ce85-4dfb-8c8a-f1eef83b20be",
	"apelidoCurandeira": "CUR_ceb5c10d-c785-489f-acb8-32ed7404311f",
	"data": "2023-02-13",
	"inicio": {  "hora": 8,  "minuto": 30  },
	"fim": {  "hora": 9,  "minuto": 30  }
}'
```
