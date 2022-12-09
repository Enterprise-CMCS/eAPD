export NODE_ENV=test

docker-compose -f ../docker-compose.endpoint-tests.yml -p api up -d
sleep 775;

echo "waiting for api-for-testing..."

is_healthy() {
    service="$1"
    container_id="$(docker-compose -f ../docker-compose.endpoint-tests.yml -p api ps -q "$service")"
    health_status="$(docker inspect -f "{{.State.Health.Status}}" "$container_id")"

    if [ "$health_status" = "healthy" ]; then
        return 0
    else
        return 1
    fi
}

while ! is_healthy api-for-testing; do sleep 60; done

echo "api-for-testing is running"

docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec db sh -c 'PGPASSWORD=cms psql -U postgres -tc "DROP DATABASE IF EXISTS hitech_apd_test;"'
docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec db sh -c 'PGPASSWORD=cms psql -U postgres -tc "CREATE DATABASE hitech_apd_test;"'

docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec -e LOG_LEVEL=verbose api-for-testing yarn run migrate
docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec -e LOG_LEVEL=verbose api-for-testing yarn run seed
