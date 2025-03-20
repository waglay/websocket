docker run -d --name haproxy --net test -v $(pwd)/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg:ro -p 80:80 -p 8404:8404 haproxytech/haproxy-alpine:2.4

docker run -d --name nginx --net test -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro -p 81:80 nginx

docker run -d --name redis -p 6379:6379 --net test redis/redis-stack-server:latest
docker run -d --name redis --net test redis/redis-stack-server:latest
