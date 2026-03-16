---
title: Installing and using Caddy webserver on ubuntu 18.04
---

## Step 1: Install latest go

```shell
 sudo add-apt-repository ppa:longsleep/golang-backports
 sudo apt-get update
 sudo apt-get install golang-go
```

## Step 2: Build Caddy 1.x from source with plugins

### Method 1:

```shell
cd $GOPATH/src
go get github.com/caddyserver/caddy/caddy
cd github.com/mholt/certmagic/
# checkout 0.8 of cermagic
git checkout 32e52d625259ceb3254d291a3d0ba78ff1a7ac9b
go get github.com/caddyserver/caddy/caddy
```

### Method 2:

```shell
cd $GOPATH/src
mkdir caddy
```

Create main.go as follows:

```go
package main

import (
	"github.com/caddyserver/caddy/caddy/caddymain"
	
	// plug in plugins here, for example:
	// _ "import/path/here"
)

func main() {
	// optional: disable telemetry
	caddymain.EnableTelemetry = false
	caddymain.Run()
}
```

```
    go mod init caddy
    go get github.com/caddyserver/caddy
    go install
```

## Step 3: Test Caddy build

```
cd $GOPATH/bin
./caddy -version
./caddy -plugins
./caddy -env
```

## Step 4: Set file descriptor limit

## Step 5: Disable existing Apache

## Step 6: Caddy as a system service

## Step 7: Caddyfile (for Wordpress sites)

## Step 8: 5 seconds TLS with Caddy

## Resources

https://github.com/golang/go/wiki/Ubuntu
https://github.com/caddyserver/caddy