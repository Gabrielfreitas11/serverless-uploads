USER=root
red=`tput setaf 1`
green=`tput setaf 2`
white=`tput setaf 7`
blue=`tput setaf 4`

build:
	docker-compose build

up:
	docker-compose up

down:
	docker-compose down

start:
	docker-compose start

stop:
	docker-compose stop

sh:
	docker-compose exec --user=${USER} serverless sh

sh\:db:
	docker-compose exec database bash

help:
	@ echo "$(green) make build	$(white) Build or rebuild services"
	@ echo "$(green) make up	$(white) Run application containers"
	@ echo "$(green) make down	$(white) Stops containers and $(red)REMOVES $(white)containers and networks created by $(green)make up"
	@ echo "$(green) make start	$(white) Starts existing containers after $(green)make stop"
	@ echo "$(green) make stop	$(white) Stops running containers without removing them. They can be started again with $(green)make start"
	@ echo "$(green) make sh	$(white) Connects to the serverless container by sh"
