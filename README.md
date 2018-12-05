#### curl命令发请求
```
curl "http://localhost:7000/accounts"

curl -H "Content-Type: application/json" -X POST -d '{"balance": 1000, "name":"savings"}' "http://localhost:7000/accounts"

curl -H "Content-Type: application/json" -X PUT -d '{"name": "David"}' "http://localhost:7000/accounts/id"

curl -X DELETE "http://localhost:7000/accounts/id"
```