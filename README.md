# X-Forwarded-For chain order showcase in koa with nginx

Shows how ```request.ips``` look like in [koa](https://github.com/koajs/koa) when HTTP request is reverse-proxied multiple times.

There are 3 nginx reverse proxies configured and `koa` backend with the following topology:

```
     HTTP client
          |
          V
    [192.168.10.*] ---------- => External interface
  front proxy (nginx)
    [192.168.20.*] ---------
          |                 |
          |                 | => NETWORK 1
          V                 |
    [192.168.20.*] ---------
 middle proxy (nginx)
    [192.168.30.*] ---------
          |                 |
          |                 | => NETWORK 2
          V                 |
    [192.168.30.*] ---------
   back proxy (nginx)
    [192.168.40.*] ---------
          |                 |
          |                 | => NETWORK 3
          V                 |
    [192.168.40.*] ---------
         koa
```

`nginx` reverse proxy is configured to preserve XFF header:
```nginx
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```


### Prerequisites
- Linux/macOS
- docker
- docker-compose
- curl

### Usage

```./run.sh``` spins up all 4 containers, sends HTTP GET and does cleanup.

### Output example

```json
{
	"ip": "192.168.10.1",
	"ips": [
		"192.168.10.1",
		"192.168.20.3",
		"192.168.30.3"
	],
	"headers_xff_raw": "192.168.10.1, 192.168.20.3, 192.168.30.3"
}
```

As a result `request.ips` array contains IP address chain of all with the first element being actual client IP address, that's how `proxy_add_x_forwarded_for` setting is working.
