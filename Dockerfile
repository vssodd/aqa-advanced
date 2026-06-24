FROM cypress/included:12.17.4

WORKDIR /e2e

COPY package*.json ./
RUN npm ci || npm install

COPY . .

ENTRYPOINT ["cypress", "run", "--browser", "firefox"]
