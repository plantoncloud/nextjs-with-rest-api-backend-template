.PHONY: deps
deps:
	yarn install

.PHONY: build
build: deps
	yarn build
	mkdir -p build
	cp -R node_modules build/
	cp -R public build/
	cp -R .next build/

.PHONY: run
run: deps
	yarn dev
