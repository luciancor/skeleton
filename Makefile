SHELL := /bin/bash

service:=news-$(component)

run-local:
	docker compose up \
	--detach \
	--build \
	--force-recreate
