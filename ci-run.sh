#!/bin/sh

docker-compose exec -T e2e-tests yarn cypress run --headless --browser electron